import { NextRequest, NextResponse } from 'next/server'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query')
    const country = searchParams.get('country') || 'IN'

    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Query parameter is required' },
        { status: 400 }
      )
    }

    // Google Places API integration
    const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY
    
    if (!GOOGLE_PLACES_API_KEY) {
      // Fallback to static data if no API key
      return NextResponse.json({
        success: true,
        results: [],
        message: 'Google Places API key not configured. Using static data.'
      })
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&components=country:${country}&key=${GOOGLE_PLACES_API_KEY}&types=(cities)`
      )

      if (!response.ok) {
        throw new Error(`Google Places API error: ${response.status}`)
      }

      const data = await response.json()

      if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
        throw new Error(`Google Places API error: ${data.status}`)
      }

      // Get detailed information for each place
      const detailedResults = await Promise.all(
        data.predictions.slice(0, 10).map(async (prediction: any) => {
          try {
            const detailsResponse = await fetch(
              `https://maps.googleapis.com/maps/api/place/details/json?place_id=${prediction.place_id}&fields=place_id,formatted_address,name,geometry,address_components&key=${GOOGLE_PLACES_API_KEY}`
            )
            
            if (detailsResponse.ok) {
              const detailsData = await detailsResponse.json()
              return detailsData.result
            }
          } catch (error) {
            console.error('Error fetching place details:', error)
          }
          return null
        })
      )

      const validResults = detailedResults.filter(result => result !== null)

      return NextResponse.json({
        success: true,
        results: validResults,
        total: validResults.length
      })

    } catch (error) {
      console.error('Google Places API error:', error)
      
      // Fallback to static data on API error
      return NextResponse.json({
        success: true,
        results: [],
        message: 'Google Places API unavailable. Using static data.'
      })
    }

  } catch (error) {
    console.error('Places search error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
