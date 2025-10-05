import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// GET /api/amenities - Get all amenities
export async function GET() {
  try {
    const amenities = await prisma.amenity.findMany({
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json({
      success: true,
      data: amenities
    })

  } catch (error) {
    console.error('Get amenities error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch amenities' },
      { status: 500 }
    )
  }
}
