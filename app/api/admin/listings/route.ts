import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { adminActionSchema } from '@/lib/validations'
import { NotificationService } from '@/lib/notifications'

// GET /api/admin/listings - Get all listings for admin review
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'PENDING'
    const page = Number(searchParams.get('page')) || 1
    const limit = Number(searchParams.get('limit')) || 12

    const skip = (page - 1) * limit

    const [listings, total] = await Promise.all([
      prisma.listing.findMany({
        where: { status },
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
          },
          adminActions: {
            include: {
              admin: {
                select: {
                  id: true,
                  name: true,
                }
              }
            },
            orderBy: {
              createdAt: 'desc'
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit,
      }),
      prisma.listing.count({ where: { status } })
    ])

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      success: true,
      data: listings,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      }
    })

  } catch (error) {
    console.error('Get admin listings error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch listings' },
      { status: 500 }
    )
  }
}

// POST /api/admin/listings - Admin action on listing
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = adminActionSchema.parse(body)

    // Check if listing exists
    const listing = await prisma.listing.findUnique({
      where: { id: validatedData.listingId }
    })

    if (!listing) {
      return NextResponse.json(
        { success: false, error: 'Listing not found' },
        { status: 404 }
      )
    }

    // Determine new status based on action
    let newStatus: string
    switch (validatedData.actionType) {
      case 'APPROVE':
        newStatus = 'APPROVED'
        break
      case 'REJECT':
        newStatus = 'REJECTED'
        break
      case 'SUSPEND':
        newStatus = 'REJECTED' // Treat suspend as reject for now
        break
      case 'DELETE':
        // Delete the listing
        await prisma.listing.delete({
          where: { id: validatedData.listingId }
        })
        
        return NextResponse.json({
          success: true,
          message: 'Listing deleted successfully'
        })
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action type' },
          { status: 400 }
        )
    }

    // Update listing status
    await prisma.listing.update({
      where: { id: validatedData.listingId },
      data: { status: newStatus }
    })

    // Record admin action
    await prisma.adminAction.create({
      data: {
        adminId: session.user.id,
        listingId: validatedData.listingId,
        actionType: validatedData.actionType,
        reason: validatedData.reason,
      }
    })

    // Send notification to listing owner
    try {
      if (validatedData.actionType === 'APPROVE') {
        await NotificationService.createListingApprovedNotification(validatedData.listingId, listing.ownerId)
      } else if (validatedData.actionType === 'REJECT') {
        await NotificationService.createListingRejectedNotification(validatedData.listingId, listing.ownerId, validatedData.reason)
      }
    } catch (notificationError) {
      console.error('Error sending notification:', notificationError)
      // Don't fail the request if notification fails
    }

    return NextResponse.json({
      success: true,
      message: `Listing ${validatedData.actionType.toLowerCase()}d successfully`
    })

  } catch (error) {
    console.error('Admin action error:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Invalid input data' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to process admin action' },
      { status: 500 }
    )
  }
}
