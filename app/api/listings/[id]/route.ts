import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { updateListingSchema } from '@/lib/validations'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// GET /api/listings/[id] - Get single listing
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const listing = await prisma.listing.findUnique({
      where: { id: params.id },
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

    if (!listing) {
      return NextResponse.json(
        { success: false, error: 'Listing not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: listing
    })

  } catch (error) {
    console.error('Get listing error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch listing' },
      { status: 500 }
    )
  }
}

// PUT /api/listings/[id] - Update listing
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    console.log('Received update data:', body)
    console.log('Listing ID:', params.id)
    
    const validatedData = updateListingSchema.parse({ ...body, id: params.id })
    console.log('Validated data:', validatedData)

    // Check if listing exists and user owns it
    const existingListing = await prisma.listing.findUnique({
      where: { id: params.id }
    })

    if (!existingListing) {
      return NextResponse.json(
        { success: false, error: 'Listing not found' },
        { status: 404 }
      )
    }

    if (existingListing.ownerId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized to update this listing' },
        { status: 403 }
      )
    }

    // Update listing
    const updatedListing = await prisma.listing.update({
      where: { id: params.id },
      data: {
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
        // Reset status to pending if significant changes were made
        status: 'PENDING'
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

    // Update amenities if provided
    if (validatedData.amenities !== undefined) {
      // Delete existing amenities
      await prisma.listingAmenity.deleteMany({
        where: { listingId: params.id }
      })

      // Add new amenities if any
      if (validatedData.amenities.length > 0) {
        await prisma.listingAmenity.createMany({
          data: validatedData.amenities.map(amenityId => ({
            listingId: params.id,
            amenityId
          }))
        })
      }
    }

    return NextResponse.json({
      success: true,
      data: updatedListing,
      message: 'Listing updated successfully'
    })

  } catch (error) {
    console.error('Update listing error:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      console.error('Validation error details:', error.message)
      return NextResponse.json(
        { success: false, error: 'Invalid input data', details: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update listing', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// DELETE /api/listings/[id] - Delete listing
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if listing exists and user owns it
    const existingListing = await prisma.listing.findUnique({
      where: { id: params.id }
    })

    if (!existingListing) {
      return NextResponse.json(
        { success: false, error: 'Listing not found' },
        { status: 404 }
      )
    }

    if (existingListing.ownerId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized to delete this listing' },
        { status: 403 }
      )
    }

    await prisma.listing.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      success: true,
      message: 'Listing deleted successfully'
    })

  } catch (error) {
    console.error('Delete listing error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete listing' },
      { status: 500 }
    )
  }
}
