import { NextRequest, NextResponse } from 'next/server'
import { 
  getStates, 
  getDistricts,
  getDistrictsByState,
  getCitiesByState, 
  getCitiesByDistrict,
  getLocationByCity, 
  searchCities, 
  searchDistricts,
  getComprehensiveLocationData,
  getNearbyCities,
  getLocalities,
  searchLocalities,
  indianCities 
} from '@/lib/locations/india'

// GET /api/locations - Get location data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const query = searchParams.get('q')
    const state = searchParams.get('state')
    const district = searchParams.get('district')
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')
    const radius = searchParams.get('radius')
    const limit = parseInt(searchParams.get('limit') || '10')

    let data: any = null

    switch (type) {
      case 'states':
        data = getStates()
        break

      case 'districts':
        if (state) {
          data = getDistrictsByState(state)
        } else {
          data = getDistricts()
        }
        break

      case 'cities':
        if (state && district) {
          data = getCitiesByDistrict(state, district)
        } else if (state) {
          data = getCitiesByState(state)
        } else {
          data = indianCities.map(city => ({
            city: city.city,
            state: city.state,
            district: city.district,
            lat: city.lat,
            lng: city.lng
          }))
        }
        break

      case 'search':
        if (!query) {
          return NextResponse.json(
            { success: false, error: 'Query parameter is required for search' },
            { status: 400 }
          )
        }
        data = searchCities(query, limit)
        break

      case 'search-districts':
        if (!query) {
          return NextResponse.json(
            { success: false, error: 'Query parameter is required for district search' },
            { status: 400 }
          )
        }
        data = searchDistricts(query, limit)
        break

      case 'search-localities':
        if (!query) {
          return NextResponse.json(
            { success: false, error: 'Query parameter is required for locality search' },
            { status: 400 }
          )
        }
        data = searchLocalities(query, limit)
        break

      case 'comprehensive':
        if (!query) {
          return NextResponse.json(
            { success: false, error: 'Query parameter is required for comprehensive search' },
            { status: 400 }
          )
        }
        data = getComprehensiveLocationData(query, limit)
        break

      case 'nearby':
        if (!lat || !lng) {
          return NextResponse.json(
            { success: false, error: 'Latitude and longitude are required for nearby search' },
            { status: 400 }
          )
        }
        const radiusKm = parseInt(radius || '50')
        data = getNearbyCities(parseFloat(lat), parseFloat(lng), radiusKm)
        break

      case 'city':
        if (!query) {
          return NextResponse.json(
            { success: false, error: 'City name is required' },
            { status: 400 }
          )
        }
        data = getLocationByCity(query)
        break

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid type parameter. Use: states, districts, cities, search, search-districts, search-localities, comprehensive, nearby, or city' },
          { status: 400 }
        )
    }

    return NextResponse.json({
      success: true,
      data,
      count: Array.isArray(data) ? data.length : (data ? 1 : 0)
    })

  } catch (error) {
    console.error('Location API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch location data' },
      { status: 500 }
    )
  }
}
