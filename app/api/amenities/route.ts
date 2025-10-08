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

    // If no amenities exist, seed them
    if (amenities.length === 0) {
      console.log('No amenities found, seeding...')
      await seedAmenities()
      
      // Fetch again after seeding
      const seededAmenities = await prisma.amenity.findMany({
        orderBy: {
          name: 'asc'
        }
      })
      
      return NextResponse.json({
        success: true,
        data: seededAmenities,
        message: 'Amenities seeded successfully'
      })
    }

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

// POST /api/amenities - Seed amenities
export async function POST() {
  try {
    console.log('Seeding amenities...')
    await seedAmenities()
    
    const amenities = await prisma.amenity.findMany({
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${amenities.length} amenities`,
      data: amenities
    })

  } catch (error) {
    console.error('Seed amenities error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to seed amenities' },
      { status: 500 }
    )
  }
}

async function seedAmenities() {
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

  for (const amenityName of amenities) {
    await prisma.amenity.upsert({
      where: { name: amenityName },
      update: {},
      create: { name: amenityName },
    })
  }
}
