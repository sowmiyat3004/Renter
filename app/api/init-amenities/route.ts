import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// GET /api/init-amenities - Initialize amenities in database
export async function GET() {
  try {
    console.log('Initializing amenities...')

    // Check if amenities already exist
    const existingAmenities = await prisma.amenity.findMany()
    console.log(`Found ${existingAmenities.length} existing amenities`)

    if (existingAmenities.length > 0) {
      return NextResponse.json({
        success: true,
        message: `Amenities already exist (${existingAmenities.length} found)`,
        data: existingAmenities
      })
    }

    // Create amenities
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

    console.log(`Creating ${amenities.length} amenities...`)
    
    for (const amenityName of amenities) {
      try {
        await prisma.amenity.create({
          data: { name: amenityName }
        })
        console.log(`Created amenity: ${amenityName}`)
      } catch (error) {
        console.log(`Amenity ${amenityName} might already exist:`, error)
      }
    }

    // Fetch all amenities
    const allAmenities = await prisma.amenity.findMany({
      orderBy: { name: 'asc' }
    })

    console.log(`Successfully created ${allAmenities.length} amenities`)

    return NextResponse.json({
      success: true,
      message: `Successfully initialized ${allAmenities.length} amenities`,
      data: allAmenities
    })

  } catch (error) {
    console.error('Init amenities error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to initialize amenities',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
