import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NotificationService } from '@/lib/notifications'

// GET /api/user/dashboard - Get user dashboard stats
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id

    // Get listing counts by status
    const [
      totalListings,
      approvedListings,
      pendingListings,
      rejectedListings,
      unreadNotifications
    ] = await Promise.all([
      prisma.listing.count({
        where: { ownerId: userId }
      }),
      prisma.listing.count({
        where: { 
          ownerId: userId,
          status: 'APPROVED'
        }
      }),
      prisma.listing.count({
        where: { 
          ownerId: userId,
          status: 'PENDING'
        }
      }),
      prisma.listing.count({
        where: { 
          ownerId: userId,
          status: 'REJECTED'
        }
      }),
      NotificationService.getUnreadCount(userId)
    ])

    const stats = {
      totalListings,
      approvedListings,
      pendingListings,
      rejectedListings,
      totalViews: 0, // TODO: Implement view tracking
      unreadNotifications
    }

    return NextResponse.json({
      success: true,
      data: stats
    })

  } catch (error) {
    console.error('Get user dashboard error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}
