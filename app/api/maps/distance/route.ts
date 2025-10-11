import { NextRequest, NextResponse } from 'next/server'
import { googleMapsService } from '@/lib/google-maps-complete'

export const dynamic = 'force-dynamic'

// GET /api/maps/distance?from_lat=12.9352&from_lng=77.6245&to_lat=12.9716&to_lng=77.5946
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const fromLat = searchParams.get('from_lat')
    const fromLng = searchParams.get('from_lng')
    const toLat = searchParams.get('to_lat')
    const toLng = searchParams.get('to_lng')

    if (!fromLat || !fromLng || !toLat || !toLng) {
      return NextResponse.json({
        success: false,
        error: 'All coordinate parameters are required (from_lat, from_lng, to_lat, to_lng)'
      }, { status: 400 })
    }

    const origin = {
      lat: parseFloat(fromLat),
      lng: parseFloat(fromLng)
    }

    const destination = {
      lat: parseFloat(toLat),
      lng: parseFloat(toLng)
    }

    if (isNaN(origin.lat) || isNaN(origin.lng) || isNaN(destination.lat) || isNaN(destination.lng)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid coordinates'
      }, { status: 400 })
    }

    // Calculate using Haversine formula (free, no API call)
    const distanceKm = googleMapsService.calculateDistanceInKm(origin, destination)

    // Optionally use Distance Matrix API for more accurate road distance
    let roadDistance = null
    if (process.env.ENABLE_DISTANCE_MATRIX_API === 'true') {
      roadDistance = await googleMapsService.calculateDistance(origin, destination)
    }

    return NextResponse.json({
      success: true,
      data: {
        straight_line_distance_km: parseFloat(distanceKm.toFixed(2)),
        straight_line_distance_text: `${distanceKm.toFixed(1)} km`,
        road_distance: roadDistance ? {
          distance_km: (roadDistance.distance.value / 1000).toFixed(2),
          distance_text: roadDistance.distance.text,
          duration_minutes: Math.round(roadDistance.duration.value / 60),
          duration_text: roadDistance.duration.text
        } : null
      }
    })
  } catch (error) {
    console.error('Distance calculation error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to calculate distance'
    }, { status: 500 })
  }
}

