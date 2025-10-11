import { NextRequest, NextResponse } from 'next/server'
import { googleMapsService } from '@/lib/google-maps-complete'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// GET /api/google-places - Search places using Google Places API ONLY
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const country = searchParams.get('country') || 'in'

    if (!query || query.length < 2) {
      return NextResponse.json({
        success: false,
        error: 'Query must be at least 2 characters long'
      }, { status: 400 })
    }

    console.log(`Searching for: "${query}" in country: ${country}`)

    // ONLY use Google Places API - No fallback, no static data
    console.log('Fetching from Google Places Autocomplete API...')
    const predictions = await googleMapsService.searchPlaces(query, country)
    
    if (predictions.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
        message: 'No locations found. Try a different search term.'
      })
    }
    
    // Get details for all predictions (up to 20 for better coverage)
    const detailedResults = await Promise.all(
      predictions.slice(0, 20).map(async (prediction) => {
        try {
          const details = await googleMapsService.getPlaceDetails(prediction.place_id)
          if (details) {
            const parsed = googleMapsService.parseAddressComponents(details.address_components)
            return {
              id: details.place_id,
              place_id: details.place_id,
              name: prediction.structured_formatting.main_text,
              formatted_address: details.formatted_address,
              lat: details.geometry.location.lat,
              lng: details.geometry.location.lng,
              state: parsed.state,
              district: parsed.district,
              city: parsed.city,
              locality: parsed.locality,
              country: parsed.country,
              postal_code: parsed.postalCode
            }
          }
          return null
        } catch (error) {
          console.error('Error fetching place details:', error)
          return null
        }
      })
    )
    
    const results = detailedResults.filter(r => r !== null)
    console.log(`Google Places API returned ${results.length} detailed results`)

    // Return results directly from Google API (already properly formatted)
    return NextResponse.json({
      success: true,
      data: results,
      message: `Found ${results.length} locations from Google Places API`
    })

  } catch (error) {
    console.error('Google Places API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to search places',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}