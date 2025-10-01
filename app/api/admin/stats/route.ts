import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/admin/stats - Get admin dashboard statistics
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get current date for "this month" calculations
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const [
      totalListings,
      pendingListings,
      approvedListings,
      rejectedListings,
      totalUsers,
      newUsersThisMonth
    ] = await Promise.all([
      prisma.listing.count(),
      prisma.listing.count({
        where: { status: 'PENDING' }
      }),
      prisma.listing.count({
        where: { status: 'APPROVED' }
      }),
      prisma.listing.count({
        where: { status: 'REJECTED' }
      }),
      prisma.user.count(),
      prisma.user.count({
        where: {
          createdAt: {
            gte: startOfMonth
          }
        }
      })
    ])

    const stats = {
      totalListings,
      pendingListings,
      approvedListings,
      rejectedListings,
      totalUsers,
      newUsersThisMonth
    }

    return NextResponse.json({
      success: true,
      data: stats
    })

  } catch (error) {
    console.error('Get admin stats error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch admin statistics' },
      { status: 500 }
    )
  }
}