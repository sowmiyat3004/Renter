import { NextRequest, NextResponse } from 'next/server'
import { googleMapsService } from '@/lib/google-maps-complete'

export const dynamic = 'force-dynamic'

// GET /api/maps/geocode?address=Koramangala,Bangalore
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const address = searchParams.get('address')

    if (!address) {
      return NextResponse.json({
        success: false,
        error: 'Address parameter is required'
      }, { status: 400 })
    }

    const result = await googleMapsService.geocodeAddress(address)

    if (!result) {
      return NextResponse.json({
        success: false,
        error: 'Location not found'
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
    console.error('Geocoding error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to geocode address'
    }, { status: 500 })
  }
}

