import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createListingSchema, searchFiltersSchema } from '@/lib/validations'
import { NotificationService } from '@/lib/notifications'

// GET /api/listings - Search and filter listings
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filters = {
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
      bedrooms: searchParams.get('bedrooms') ? Number(searchParams.get('bedrooms')) : undefined,
      bathrooms: searchParams.get('bathrooms') ? Number(searchParams.get('bathrooms')) : undefined,
      amenities: searchParams.get('amenities')?.split(',').filter(Boolean),
      lat: searchParams.get('lat') ? Number(searchParams.get('lat')) : undefined,
      lng: searchParams.get('lng') ? Number(searchParams.get('lng')) : undefined,
      radius: searchParams.get('radius') ? Number(searchParams.get('radius')) : undefined,
      page: Number(searchParams.get('page')) || 1,
      limit: Number(searchParams.get('limit')) || 12,
    }

    const validatedFilters = searchFiltersSchema.parse(filters)

    const where: any = {
      status: 'APPROVED',
    }

    // Price filters
    if (validatedFilters.minPrice !== undefined) {
      where.priceAmount = { ...where.priceAmount, gte: validatedFilters.minPrice }
    }
    if (validatedFilters.maxPrice !== undefined) {
      where.priceAmount = { ...where.priceAmount, lte: validatedFilters.maxPrice }
    }

    // Property filters
    if (validatedFilters.bedrooms !== undefined) {
      where.bedrooms = validatedFilters.bedrooms
    }
    if (validatedFilters.bathrooms !== undefined) {
      where.bathrooms = validatedFilters.bathrooms
    }

    // Amenities filter
    if (validatedFilters.amenities && validatedFilters.amenities.length > 0) {
      where.amenities = {
        some: {
          amenity: {
            name: {
              in: validatedFilters.amenities
            }
          }
        }
      }
    }

    // Location filter (within radius) - Haversine formula approximation
    if (validatedFilters.lat && validatedFilters.lng && validatedFilters.radius) {
      // This is a simplified approach. For production, consider using PostGIS
      const latRange = validatedFilters.radius / 111 // Rough conversion: 1 degree ≈ 111 km
      const lngRange = validatedFilters.radius / (111 * Math.cos(validatedFilters.lat * Math.PI / 180))
      
      where.lat = {
        gte: validatedFilters.lat - latRange,
        lte: validatedFilters.lat + latRange,
      }
      where.lng = {
        gte: validatedFilters.lng - lngRange,
        lte: validatedFilters.lng + lngRange,
      }
    }

    const skip = (validatedFilters.page - 1) * validatedFilters.limit

    const [listings, total] = await Promise.all([
      prisma.listing.findMany({
        where,
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              email: true,
            }
          },
          images: true,
          amenities: {
            include: {
              amenity: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: validatedFilters.limit,
      }),
      prisma.listing.count({ where })
    ])

    const totalPages = Math.ceil(total / validatedFilters.limit)

    return NextResponse.json({
      success: true,
      data: listings,
      pagination: {
        page: validatedFilters.page,
        limit: validatedFilters.limit,
        total,
        totalPages,
      }
    })

  } catch (error) {
    console.error('Get listings error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch listings' },
      { status: 500 }
    )
  }
}

// POST /api/listings - Create new listing
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = createListingSchema.parse(body)

    const listing = await prisma.listing.create({
      data: {
        ownerId: session.user.id,
        title: validatedData.title,
        description: validatedData.description,
        priceAmount: validatedData.priceAmount,
        bedrooms: validatedData.bedrooms,
        bathrooms: validatedData.bathrooms,
        state: validatedData.state,
        district: validatedData.district,
        city: validatedData.city,
        locality: validatedData.locality,
        address: validatedData.address,
        lat: validatedData.lat,
        lng: validatedData.lng,
        status: 'PENDING',
        amenities: {
          create: validatedData.amenities?.map(amenityId => ({
            amenityId
          })) || []
        }
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        images: true,
        amenities: {
          include: {
            amenity: true
          }
        }
      }
    })

    // Send notification to user
    try {
      await NotificationService.createListingCreatedNotification(listing.id, session.user.id)
    } catch (notificationError) {
      console.error('Error sending notification:', notificationError)
      // Don't fail the request if notification fails
    }

    return NextResponse.json({
      success: true,
      data: listing,
      message: 'Listing created successfully and is pending approval'
    })

  } catch (error) {
    console.error('Create listing error:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Invalid input data' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create listing' },
      { status: 500 }
    )
  }
}
