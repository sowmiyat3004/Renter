import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// POST /api/seed-amenities - Seed amenities in the database
export async function POST() {
  try {
    console.log('Starting amenities seeding...')

    // Create default amenities
    const amenities = [
      'WiFi',
      'Air Conditioning',
      'Car Parking',
      'Bike Parking',
      'Heating',
      'Washing Machine',
      'Dishwasher',
      'Balcony',
      'Garden',
      'Pet Friendly',
      'Furnished',
      'Gym',
      'Pool',
      'Security',
      'Elevator',
      'Furnished Kitchen',
      'Cable TV',
      'Internet',
      'Laundry',
      'Storage',
      'Terrace'
    ]

    console.log('Creating amenities...')
    const createdAmenities = []
    
    for (const amenityName of amenities) {
      const amenity = await prisma.amenity.upsert({
        where: { name: amenityName },
        update: {},
        create: { name: amenityName },
      })
      createdAmenities.push(amenity)
    }

    console.log(`Successfully created ${createdAmenities.length} amenities`)

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${createdAmenities.length} amenities`,
      data: createdAmenities
    })

  } catch (error) {
    console.error('Seed amenities error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to seed amenities', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// GET /api/seed-amenities - Check if amenities exist
export async function GET() {
  try {
    const amenities = await prisma.amenity.findMany({
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json({
      success: true,
      count: amenities.length,
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
