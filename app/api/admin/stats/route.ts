import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get current date ranges
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

    // Get all stats in parallel
    const [
      totalUsers,
      totalListings,
      approvedListings,
      pendingListings,
      rejectedListings,
      newUsersToday,
      newUsersThisWeek,
      newUsersThisMonth,
      listingViews,
      listingInquiries
    ] = await Promise.all([
      // User counts
      prisma.user.count(),
      prisma.listing.count(),
      prisma.listing.count({ where: { status: 'APPROVED' } }),
      prisma.listing.count({ where: { status: 'PENDING' } }),
      prisma.listing.count({ where: { status: 'REJECTED' } }),
      
      // New user counts
      prisma.user.count({
        where: {
          createdAt: {
            gte: today
          }
        }
      }),
      prisma.user.count({
        where: {
          createdAt: {
            gte: weekAgo
          }
        }
      }),
      prisma.user.count({
        where: {
          createdAt: {
            gte: monthAgo
          }
        }
      }),
      
      // Engagement metrics
      prisma.listing.aggregate({
        _sum: {
          viewCount: true
        }
      }),
      prisma.listing.aggregate({
        _sum: {
          inquiryCount: true
        }
      })
    ])

    const stats = {
      totalUsers,
      totalListings,
      approvedListings,
      pendingListings,
      rejectedListings,
      totalViews: listingViews._sum.viewCount || 0,
      totalInquiries: listingInquiries._sum.inquiryCount || 0,
      newUsersToday,
      newUsersThisWeek,
      newUsersThisMonth
    }

    return NextResponse.json({
      success: true,
      data: stats
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}