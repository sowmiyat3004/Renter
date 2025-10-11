import { NextRequest, NextResponse } from 'next/server'
import { googleMapsService } from '@/lib/google-maps-complete'
import { locationFallbackService } from '@/lib/location-fallback'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// GET /api/google-places - Search places using Google Places API with fallback
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

    let results: any[] = []

    try {
      // Try Google Places API first
      console.log('Trying Google Places Autocomplete API...')
      const predictions = await googleMapsService.searchPlaces(query, country)
      
      // Get details for more predictions (up to 20 for better coverage)
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
      
      results = detailedResults.filter(r => r !== null)
      console.log(`Google Places API returned ${results.length} detailed results`)
    } catch (googleError) {
      console.log('Google Places API failed, trying fallback...', googleError)
      
      // Fallback to static location service
      try {
        results = await locationFallbackService.searchPlaces(query, country)
        console.log(`Fallback service returned ${results.length} results`)
      } catch (fallbackError) {
        console.error('Fallback service also failed:', fallbackError)
        results = []
      }
    }

    // Transform results to match expected format
    const transformedResults = results.map((place: any, index: number) => ({
      id: place.place_id || `fallback_${index}`,
      name: place.name || place.formatted_address,
      formatted_address: place.formatted_address || place.name,
      lat: place.geometry?.location?.lat || place.lat,
      lng: place.geometry?.location?.lng || place.lng,
      state: place.address_components?.find((comp: any) => 
        comp.types.includes('administrative_area_level_1')
      )?.long_name || place.state || '',
      district: place.address_components?.find((comp: any) => 
        comp.types.includes('administrative_area_level_2')
      )?.long_name || place.district || '',
      city: place.address_components?.find((comp: any) => 
        comp.types.includes('locality') || comp.types.includes('administrative_area_level_3')
      )?.long_name || place.city || '',
      locality: place.address_components?.find((comp: any) => 
        comp.types.includes('sublocality') || comp.types.includes('sublocality_level_1')
      )?.long_name || place.locality || '',
      country: place.address_components?.find((comp: any) => 
        comp.types.includes('country')
      )?.long_name || 'India',
      postal_code: place.address_components?.find((comp: any) => 
        comp.types.includes('postal_code')
      )?.long_name || ''
    }))

    return NextResponse.json({
      success: true,
      data: transformedResults,
      message: `Found ${transformedResults.length} locations`
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