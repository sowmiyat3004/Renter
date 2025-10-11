import { NextRequest, NextResponse } from 'next/server'
import { googleMapsService } from '@/lib/google-maps-complete'

export const dynamic = 'force-dynamic'

// GET /api/maps/reverse-geocode?lat=12.9352&lng=77.6245
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')

    if (!lat || !lng) {
      return NextResponse.json({
        success: false,
        error: 'Latitude and longitude parameters are required'
      }, { status: 400 })
    }

    const latitude = parseFloat(lat)
    const longitude = parseFloat(lng)

    if (isNaN(latitude) || isNaN(longitude)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid latitude or longitude'
      }, { status: 400 })
    }

    const result = await googleMapsService.reverseGeocode(latitude, longitude)

    if (!result) {
      return NextResponse.json({
        success: false,
        error: 'Address not found for coordinates'
      }, { status: 404 })
    }

    const parsed = googleMapsService.parseAddressComponents(result.address_components)

    return NextResponse.json({
      success: true,
      data: {
        formatted_address: result.formatted_address,
        location: result.geometry.location,
        components: parsed,
        place_id: result.place_id
      }
    })
  } catch (error) {
    console.error('Reverse geocoding error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to reverse geocode'
    }, { status: 500 })
  }
}

