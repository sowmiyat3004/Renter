import { NextRequest, NextResponse } from 'next/server'
import { googlePlacesService } from '@/lib/google-places'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const countryCode = searchParams.get('country') || 'IN'

    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Query parameter is required' },
        { status: 400 }
      )
    }

    const results = await googlePlacesService.searchPlaces(query, countryCode)

    return NextResponse.json({
      success: true,
      data: results
    })

  } catch (error) {
    console.error('Google Places API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch places' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { placeId } = body

    if (!placeId) {
      return NextResponse.json(
        { success: false, error: 'Place ID is required' },
        { status: 400 }
      )
    }

    const result = await googlePlacesService.getPlaceDetails(placeId)

    if (!result) {
      return NextResponse.json(
        { success: false, error: 'Place not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result
    })

  } catch (error) {
    console.error('Google Places API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch place details' },
      { status: 500 }
    )
  }
}
