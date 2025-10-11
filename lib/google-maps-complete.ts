// Complete Google Maps API Integration
// Includes: Places Autocomplete, Geocoding, Reverse Geocoding, Distance Matrix

interface Location {
  lat: number
  lng: number
}

interface AddressComponent {
  long_name: string
  short_name: string
  types: string[]
}

interface PlaceAutocompleteResult {
  place_id: string
  description: string
  structured_formatting: {
    main_text: string
    secondary_text: string
  }
}

interface GeocodingResult {
  formatted_address: string
  geometry: {
    location: Location
  }
  address_components: AddressComponent[]
  place_id: string
}

interface DistanceMatrixResult {
  distance: {
    text: string
    value: number // in meters
  }
  duration: {
    text: string
    value: number // in seconds
  }
  status: string
}

class GoogleMapsService {
  private apiKey: string
  private baseUrl = 'https://maps.googleapis.com/maps/api'

  constructor() {
    this.apiKey = process.env.GOOGLE_PLACES_API_KEY || ''
  }

  // 1. PLACES AUTOCOMPLETE - Search location suggestions
  async searchPlaces(input: string, country: string = 'in'): Promise<PlaceAutocompleteResult[]> {
    if (!this.apiKey) {
      throw new Error('Google Maps API key not configured')
    }

    try {
      // Search for all types of places in India (cities, localities, landmarks, areas)
      const url = `${this.baseUrl}/place/autocomplete/json?input=${encodeURIComponent(input)}&components=country:${country}&key=${this.apiKey}&language=en`
      
      const response = await fetch(url)
      const data = await response.json()

      if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
        console.error('Places Autocomplete error:', data.status, data.error_message)
        throw new Error(`Places API error: ${data.status}`)
      }

      return data.predictions || []
    } catch (error) {
      console.error('Places Autocomplete error:', error)
      throw error
    }
  }

  // 2. GEOCODING - Convert address to coordinates
  async geocodeAddress(address: string): Promise<GeocodingResult | null> {
    if (!this.apiKey) {
      throw new Error('Google Maps API key not configured')
    }

    try {
      const url = `${this.baseUrl}/geocode/json?address=${encodeURIComponent(address)}&key=${this.apiKey}`
      
      const response = await fetch(url)
      const data = await response.json()

      if (data.status !== 'OK') {
        console.error('Geocoding error:', data.status, data.error_message)
        return null
      }

      return data.results[0] || null
    } catch (error) {
      console.error('Geocoding error:', error)
      return null
    }
  }

  // 3. REVERSE GEOCODING - Convert coordinates to address
  async reverseGeocode(lat: number, lng: number): Promise<GeocodingResult | null> {
    if (!this.apiKey) {
      throw new Error('Google Maps API key not configured')
    }

    try {
      const url = `${this.baseUrl}/geocode/json?latlng=${lat},${lng}&key=${this.apiKey}`
      
      const response = await fetch(url)
      const data = await response.json()

      if (data.status !== 'OK') {
        console.error('Reverse Geocoding error:', data.status, data.error_message)
        return null
      }

      return data.results[0] || null
    } catch (error) {
      console.error('Reverse Geocoding error:', error)
      return null
    }
  }

  // 4. PLACE DETAILS - Get detailed info about a place
  async getPlaceDetails(placeId: string): Promise<GeocodingResult | null> {
    if (!this.apiKey) {
      throw new Error('Google Maps API key not configured')
    }

    try {
      const url = `${this.baseUrl}/place/details/json?place_id=${placeId}&fields=formatted_address,geometry,address_components,place_id&key=${this.apiKey}`
      
      const response = await fetch(url)
      const data = await response.json()

      if (data.status !== 'OK') {
        console.error('Place Details error:', data.status, data.error_message)
        return null
      }

      return data.result || null
    } catch (error) {
      console.error('Place Details error:', error)
      return null
    }
  }

  // 5. DISTANCE MATRIX - Calculate distance between two points
  async calculateDistance(
    origin: Location | string,
    destination: Location | string
  ): Promise<DistanceMatrixResult | null> {
    if (!this.apiKey) {
      throw new Error('Google Maps API key not configured')
    }

    try {
      const originParam = typeof origin === 'string' 
        ? encodeURIComponent(origin)
        : `${origin.lat},${origin.lng}`
      
      const destinationParam = typeof destination === 'string'
        ? encodeURIComponent(destination)
        : `${destination.lat},${destination.lng}`

      const url = `${this.baseUrl}/distancematrix/json?origins=${originParam}&destinations=${destinationParam}&key=${this.apiKey}`
      
      const response = await fetch(url)
      const data = await response.json()

      if (data.status !== 'OK') {
        console.error('Distance Matrix error:', data.status, data.error_message)
        return null
      }

      return data.rows[0]?.elements[0] || null
    } catch (error) {
      console.error('Distance Matrix error:', error)
      return null
    }
  }

  // 6. BROWSER GEOLOCATION - Get user's current location (client-side only)
  async getUserLocation(): Promise<Location | null> {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      return null
    }

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.error('Geolocation error:', error)
          resolve(null)
        },
        { timeout: 10000, enableHighAccuracy: true }
      )
    })
  }

  // 7. FIND NEARBY - Find properties within radius
  calculateDistanceInKm(
    point1: Location,
    point2: Location
  ): number {
    const R = 6371 // Earth's radius in km
    const dLat = this.toRadians(point2.lat - point1.lat)
    const dLng = this.toRadians(point2.lng - point1.lng)

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(point1.lat)) *
      Math.cos(this.toRadians(point2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180)
  }

  // 8. PARSE ADDRESS COMPONENTS
  parseAddressComponents(components: AddressComponent[]): {
    street: string
    locality: string
    city: string
    district: string
    state: string
    country: string
    postalCode: string
  } {
    const findComponent = (types: string[]): string => {
      const component = components.find(comp =>
        comp.types.some(type => types.includes(type))
      )
      return component?.long_name || ''
    }

    return {
      street: findComponent(['route', 'street_address']),
      locality: findComponent(['sublocality', 'sublocality_level_1', 'sublocality_level_2', 'neighborhood']),
      city: findComponent(['locality', 'administrative_area_level_3']),
      district: findComponent(['administrative_area_level_2']),
      state: findComponent(['administrative_area_level_1']),
      country: findComponent(['country']),
      postalCode: findComponent(['postal_code'])
    }
  }

  // 9. BATCH GEOCODING - Multiple addresses at once
  async batchGeocode(addresses: string[]): Promise<(GeocodingResult | null)[]> {
    const results = await Promise.all(
      addresses.map(address => this.geocodeAddress(address))
    )
    return results
  }

  // 10. FIND PROPERTIES WITHIN RADIUS
  filterPropertiesByDistance(
    userLocation: Location,
    properties: Array<{ lat: number; lng: number; [key: string]: any }>,
    radiusKm: number
  ): Array<{ distance: number; [key: string]: any }> {
    return properties
      .map(property => ({
        ...property,
        distance: this.calculateDistanceInKm(userLocation, {
          lat: property.lat,
          lng: property.lng
        })
      }))
      .filter(property => property.distance <= radiusKm)
      .sort((a, b) => a.distance - b.distance)
  }
}

export const googleMapsService = new GoogleMapsService()
export default googleMapsService

