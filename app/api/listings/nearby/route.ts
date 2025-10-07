import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lat = parseFloat(searchParams.get('lat') || '0')
    const lng = parseFloat(searchParams.get('lng') || '0')
    const radius = parseFloat(searchParams.get('radius') || '10') // Default 10km
    const limit = parseInt(searchParams.get('limit') || '20')

    if (!lat || !lng) {
      return NextResponse.json(
        { success: false, error: 'Latitude and longitude are required' },
        { status: 400 }
      )
    }

    // Calculate bounding box for initial filtering (more efficient than calculating distance for all records)
    const earthRadius = 6371 // Earth's radius in kilometers
    const latDelta = (radius / earthRadius) * (180 / Math.PI)
    const lngDelta = (radius / earthRadius) * (180 / Math.PI) / Math.cos(lat * Math.PI / 180)

    const minLat = lat - latDelta
    const maxLat = lat + latDelta
    const minLng = lng - lngDelta
    const maxLng = lng + lngDelta

    // Get listings within bounding box
    const listings = await prisma.listing.findMany({
      where: {
        status: 'APPROVED',
        lat: {
          gte: minLat,
          lte: maxLat
        },
        lng: {
          gte: minLng,
          lte: maxLng
        }
      },
      include: {
        images: true,
        amenities: {
          include: {
            amenity: true
          }
        },
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          }
        }
      },
      take: limit * 2 // Get more than needed to filter by actual distance
    })

    // Calculate actual distance using Haversine formula and filter
    const nearbyListings = listings
      .map(listing => {
        const distance = calculateDistance(lat, lng, listing.lat, listing.lng)
        return { ...listing, distance }
      })
      .filter(listing => listing.distance <= radius)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, limit)

    return NextResponse.json({
      success: true,
      data: nearbyListings,
      meta: {
        center: { lat, lng },
        radius,
        count: nearbyListings.length
      }
    })

  } catch (error) {
    console.error('Error fetching nearby listings:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch nearby listings' },
      { status: 500 }
    )
  }
}

// Haversine formula to calculate distance between two points
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1)
  const dLng = toRadians(lng2 - lng1)
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2)
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}
