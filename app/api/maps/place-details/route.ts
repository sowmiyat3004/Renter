import { NextRequest, NextResponse } from 'next/server'
import { googleMapsService } from '@/lib/google-maps-complete'

export const dynamic = 'force-dynamic'

// GET /api/maps/place-details?place_id=ChIJbU60yXAWrjsR4E9-UejD3_g
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const placeId = searchParams.get('place_id')

    if (!placeId) {
      return NextResponse.json({
        success: false,
        error: 'place_id parameter is required'
      }, { status: 400 })
    }

    const result = await googleMapsService.getPlaceDetails(placeId)

    if (!result) {
      return NextResponse.json({
        success: false,
        error: 'Place not found'
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
    console.error('Place details error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get place details'
    }, { status: 500 })
  }
}

