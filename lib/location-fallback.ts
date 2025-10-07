import { indianCities, getComprehensiveLocationData } from './locations/india'

export interface LocationData {
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

class LocationFallbackService {
  async searchPlaces(query: string, countryCode: string = 'IN'): Promise<LocationData[]> {
    try {
      // Use our comprehensive location data
      const results = getComprehensiveLocationData(query, 20)
      
      const locations: LocationData[] = []
      
      // Add cities
      results.cities.forEach(city => {
        locations.push({
          id: `city_${city.city}_${city.state}`,
          name: city.city,
          formatted_address: `${city.city}, ${city.state}, India`,
          lat: city.lat,
          lng: city.lng,
          state: city.state,
          district: city.district || '',
          city: city.city,
          locality: '',
          country: 'India',
          postal_code: ''
        })
      })
      
      // Add districts (districts don't have lat/lng, so we'll skip them for now)
      // We'll focus on cities and localities which have coordinates
      
      // Add localities
      results.localities.forEach(locality => {
        locations.push({
          id: `locality_${locality.locality}_${locality.city}`,
          name: locality.locality,
          formatted_address: `${locality.locality}, ${locality.city}, ${locality.state}, India`,
          lat: locality.lat,
          lng: locality.lng,
          state: locality.state,
          district: locality.district || '',
          city: locality.city,
          locality: locality.locality,
          country: 'India',
          postal_code: ''
        })
      })
      
      // Add states (states don't have lat/lng, so we'll skip them for now)
      // We'll focus on cities and localities which have coordinates
      
      return locations.slice(0, 10) // Limit to 10 results
    } catch (error) {
      console.error('Error in location fallback service:', error)
      return []
    }
  }

  async getPlaceDetails(placeId: string): Promise<LocationData | null> {
    // For fallback, we'll return a basic location based on the ID
    // This is a simplified implementation
    const parts = placeId.split('_')
    if (parts.length < 2) return null
    
    const type = parts[0]
    const name = parts.slice(1).join('_')
    
    // Find matching location in our static data
    const allLocations = indianCities
    
    const match = allLocations.find(loc => {
      if (type === 'city') return loc.city.toLowerCase().includes(name.toLowerCase())
      if (type === 'locality') return loc.locality?.toLowerCase().includes(name.toLowerCase())
      return false
    })
    
    if (!match) return null
    
    return {
      id: placeId,
      name: match.city,
      formatted_address: `${match.city}, ${match.state}, India`,
      lat: match.lat,
      lng: match.lng,
      state: match.state,
      district: match.district || '',
      city: match.city,
      locality: '',
      country: 'India',
      postal_code: ''
    }
  }
}

export const locationFallbackService = new LocationFallbackService()
export default locationFallbackService
