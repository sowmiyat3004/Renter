import { locationFallbackService } from './location-fallback'

interface GooglePlaceResult {
  place_id: string
  formatted_address: string
  name: string
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
  address_components: Array<{
    long_name: string
    short_name: string
    types: string[]
  }>
}

interface ParsedLocation {
  id: string
  name: string
  formatted_address: string
  lat: number
  lng: number
  state: string
  district: string
  city: string
  locality: string
  country: string
  postal_code: string
}

class GooglePlacesService {
  private apiKey: string
  private baseUrl = 'https://maps.googleapis.com/maps/api/place'

  constructor() {
    this.apiKey = process.env.GOOGLE_PLACES_API_KEY || ''
  }

  async searchPlaces(query: string, countryCode: string = 'IN'): Promise<ParsedLocation[]> {
    if (!this.apiKey) {
      console.warn('Google Places API key not configured, using fallback service')
      return locationFallbackService.searchPlaces(query, countryCode)
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/textsearch/json?query=${encodeURIComponent(query)}&key=${this.apiKey}&region=${countryCode}`
      )
      
      const data = await response.json()
      
      if (data.status !== 'OK') {
        console.error('Google Places API error:', data.status, data.error_message)
        return []
      }

      return data.results.map((place: GooglePlaceResult) => this.parsePlaceResult(place))
    } catch (error) {
      console.error('Error fetching from Google Places API:', error)
      console.log('Falling back to static location data')
      return locationFallbackService.searchPlaces(query, countryCode)
    }
  }

  async getPlaceDetails(placeId: string): Promise<ParsedLocation | null> {
    if (!this.apiKey) {
      console.warn('Google Places API key not configured, using fallback service')
      return locationFallbackService.getPlaceDetails(placeId)
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/details/json?place_id=${placeId}&fields=place_id,formatted_address,name,geometry,address_components&key=${this.apiKey}`
      )
      
      const data = await response.json()
      
      if (data.status !== 'OK') {
        console.error('Google Places API error:', data.status, data.error_message)
        return null
      }

      return this.parsePlaceResult(data.result)
    } catch (error) {
      console.error('Error fetching place details:', error)
      console.log('Falling back to static location data')
      return locationFallbackService.getPlaceDetails(placeId)
    }
  }

  private parsePlaceResult(place: GooglePlaceResult): ParsedLocation {
    const addressComponents = place.address_components || []
    
    // Extract location components
    const state = this.extractComponent(addressComponents, ['administrative_area_level_1'])
    const district = this.extractComponent(addressComponents, ['administrative_area_level_2'])
    const city = this.extractComponent(addressComponents, ['locality', 'administrative_area_level_3'])
    const locality = this.extractComponent(addressComponents, ['sublocality', 'sublocality_level_1', 'sublocality_level_2'])
    const country = this.extractComponent(addressComponents, ['country'])
    const postalCode = this.extractComponent(addressComponents, ['postal_code'])

    return {
      id: place.place_id,
      name: place.name,
      formatted_address: place.formatted_address,
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
      state: state || '',
      district: district || '',
      city: city || '',
      locality: locality || '',
      country: country || '',
      postal_code: postalCode || ''
    }
  }

  private extractComponent(components: any[], types: string[]): string {
    const component = components.find(comp => 
      comp.types.some((type: string) => types.includes(type))
    )
    return component ? component.long_name : ''
  }

  // Calculate distance between two points using Haversine formula
  calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371 // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1)
    const dLng = this.toRadians(lng2 - lng1)
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2)
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180)
  }
}

export const googlePlacesService = new GooglePlacesService()
export default googlePlacesService
