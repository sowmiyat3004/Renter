// lib/locations/api-integration.ts

interface PlaceResult {
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

interface LocationData {
  id: string
  name: string
  formatted_address: string
  lat: number
  lng: number
  state: string
  district: string
  city: string
  locality: string
  type: 'locality' | 'city' | 'district' | 'state'
}

export class LocationAPIService {
  private static instance: LocationAPIService
  private cache: Map<string, LocationData[]> = new Map()
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours

  static getInstance(): LocationAPIService {
    if (!LocationAPIService.instance) {
      LocationAPIService.instance = new LocationAPIService()
    }
    return LocationAPIService.instance
  }

  // Google Places API integration
  async searchPlaces(query: string, country: string = 'IN'): Promise<LocationData[]> {
    const cacheKey = `places_${query}_${country}`
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!
    }

    try {
      // Check if Google Places API is enabled
      const enableGooglePlaces = process.env.ENABLE_GOOGLE_PLACES === 'true'
      
      if (enableGooglePlaces) {
        // Use Google Places API
        const response = await fetch(`/api/places/search?query=${encodeURIComponent(query)}&country=${country}`)
        const data = await response.json()
        
        if (data.success && data.results.length > 0) {
          const locations = this.formatPlaceResults(data.results)
          this.cache.set(cacheKey, locations)
          return locations
        }
      }
    } catch (error) {
      console.error('Error fetching places:', error)
    }

    // Fallback to static data
    return this.getStaticLocations(query)
  }

  // Format Google Places API results
  private formatPlaceResults(places: PlaceResult[]): LocationData[] {
    return places.map(place => {
      const components = place.address_components
      const state = this.getComponent(components, 'administrative_area_level_1')
      const district = this.getComponent(components, 'administrative_area_level_2')
      const city = this.getComponent(components, 'locality') || this.getComponent(components, 'administrative_area_level_2')
      const locality = this.getComponent(components, 'sublocality') || this.getComponent(components, 'sublocality_level_1')

      return {
        id: place.place_id,
        name: place.name,
        formatted_address: place.formatted_address,
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
        state: state || '',
        district: district || '',
        city: city || '',
        locality: locality || place.name,
        type: this.determineLocationType(components)
      }
    })
  }

  private getComponent(components: any[], type: string): string {
    const component = components.find(comp => comp.types.includes(type))
    return component ? component.long_name : ''
  }

  private determineLocationType(components: any[]): 'locality' | 'city' | 'district' | 'state' {
    if (components.some(comp => comp.types.includes('sublocality'))) return 'locality'
    if (components.some(comp => comp.types.includes('locality'))) return 'city'
    if (components.some(comp => comp.types.includes('administrative_area_level_2'))) return 'district'
    return 'state'
  }

  // Fallback to static data
  private getStaticLocations(query: string): LocationData[] {
    const lowercaseQuery = query.toLowerCase()
    
    // Enhanced static data with Kerala localities
    const staticLocations: LocationData[] = [
      // Kerala - Palakkad District
      {
        id: 'palakkad-city',
        name: 'Palakkad',
        formatted_address: 'Palakkad, Kerala, India',
        lat: 10.7867,
        lng: 76.6548,
        state: 'Kerala',
        district: 'Palakkad',
        city: 'Palakkad',
        locality: 'Palakkad',
        type: 'city'
      },
      {
        id: 'kuthampully',
        name: 'Kuthampully',
        formatted_address: 'Kuthampully, Palakkad, Kerala, India',
        lat: 10.7500,
        lng: 76.6000,
        state: 'Kerala',
        district: 'Palakkad',
        city: 'Palakkad',
        locality: 'Kuthampully',
        type: 'locality'
      },
      {
        id: 'chittur',
        name: 'Chittur',
        formatted_address: 'Chittur, Palakkad, Kerala, India',
        lat: 10.7000,
        lng: 76.6500,
        state: 'Kerala',
        district: 'Palakkad',
        city: 'Palakkad',
        locality: 'Chittur',
        type: 'locality'
      },
      {
        id: 'ottapalam',
        name: 'Ottapalam',
        formatted_address: 'Ottapalam, Palakkad, Kerala, India',
        lat: 10.7667,
        lng: 76.3833,
        state: 'Kerala',
        district: 'Palakkad',
        city: 'Ottapalam',
        locality: 'Ottapalam',
        type: 'city'
      },
      {
        id: 'shoranur',
        name: 'Shoranur',
        formatted_address: 'Shoranur, Palakkad, Kerala, India',
        lat: 10.7667,
        lng: 76.2667,
        state: 'Kerala',
        district: 'Palakkad',
        city: 'Shoranur',
        locality: 'Shoranur',
        type: 'city'
      },
      {
        id: 'pattambi',
        name: 'Pattambi',
        formatted_address: 'Pattambi, Palakkad, Kerala, India',
        lat: 10.8167,
        lng: 76.2000,
        state: 'Kerala',
        district: 'Palakkad',
        city: 'Pattambi',
        locality: 'Pattambi',
        type: 'city'
      },
      {
        id: 'mannarkkad',
        name: 'Mannarkkad',
        formatted_address: 'Mannarkkad, Palakkad, Kerala, India',
        lat: 10.9833,
        lng: 76.4500,
        state: 'Kerala',
        district: 'Palakkad',
        city: 'Mannarkkad',
        locality: 'Mannarkkad',
        type: 'city'
      },
      {
        id: 'alathur',
        name: 'Alathur',
        formatted_address: 'Alathur, Palakkad, Kerala, India',
        lat: 10.6500,
        lng: 76.5500,
        state: 'Kerala',
        district: 'Palakkad',
        city: 'Alathur',
        locality: 'Alathur',
        type: 'city'
      },
      {
        id: 'perinthalmanna',
        name: 'Perinthalmanna',
        formatted_address: 'Perinthalmanna, Malappuram, Kerala, India',
        lat: 10.9833,
        lng: 76.2167,
        state: 'Kerala',
        district: 'Malappuram',
        city: 'Perinthalmanna',
        locality: 'Perinthalmanna',
        type: 'city'
      },
      {
        id: 'tirur',
        name: 'Tirur',
        formatted_address: 'Tirur, Malappuram, Kerala, India',
        lat: 10.9000,
        lng: 75.9167,
        state: 'Kerala',
        district: 'Malappuram',
        city: 'Tirur',
        locality: 'Tirur',
        type: 'city'
      },
      {
        id: 'ponnani',
        name: 'Ponnani',
        formatted_address: 'Ponnani, Malappuram, Kerala, India',
        lat: 10.7667,
        lng: 75.9167,
        state: 'Kerala',
        district: 'Malappuram',
        city: 'Ponnani',
        locality: 'Ponnani',
        type: 'city'
      },
      {
        id: 'kottakkal',
        name: 'Kottakkal',
        formatted_address: 'Kottakkal, Malappuram, Kerala, India',
        lat: 10.9833,
        lng: 76.0000,
        state: 'Kerala',
        district: 'Malappuram',
        city: 'Kottakkal',
        locality: 'Kottakkal',
        type: 'city'
      },
      {
        id: 'manjeri',
        name: 'Manjeri',
        formatted_address: 'Manjeri, Malappuram, Kerala, India',
        lat: 11.1167,
        lng: 76.1167,
        state: 'Kerala',
        district: 'Malappuram',
        city: 'Manjeri',
        locality: 'Manjeri',
        type: 'city'
      },
      {
        id: 'nilambur',
        name: 'Nilambur',
        formatted_address: 'Nilambur, Malappuram, Kerala, India',
        lat: 11.2667,
        lng: 76.2500,
        state: 'Kerala',
        district: 'Malappuram',
        city: 'Nilambur',
        locality: 'Nilambur',
        type: 'city'
      },
      {
        id: 'tirurangadi',
        name: 'Tirurangadi',
        formatted_address: 'Tirurangadi, Malappuram, Kerala, India',
        lat: 11.0000,
        lng: 75.9167,
        state: 'Kerala',
        district: 'Malappuram',
        city: 'Tirurangadi',
        locality: 'Tirurangadi',
        type: 'city'
      },
      {
        id: 'tanur',
        name: 'Tanur',
        formatted_address: 'Tanur, Malappuram, Kerala, India',
        lat: 10.9667,
        lng: 75.8667,
        state: 'Kerala',
        district: 'Malappuram',
        city: 'Tanur',
        locality: 'Tanur',
        type: 'city'
      },
      {
        id: 'valanchery',
        name: 'Valanchery',
        formatted_address: 'Valanchery, Malappuram, Kerala, India',
        lat: 10.8833,
        lng: 76.0167,
        state: 'Kerala',
        district: 'Malappuram',
        city: 'Valanchery',
        locality: 'Valanchery',
        type: 'city'
      },
      {
        id: 'kondotty',
        name: 'Kondotty',
        formatted_address: 'Kondotty, Malappuram, Kerala, India',
        lat: 11.0833,
        lng: 76.0667,
        state: 'Kerala',
        district: 'Malappuram',
        city: 'Kondotty',
        locality: 'Kondotty',
        type: 'city'
      },
      {
        id: 'wandoor',
        name: 'Wandoor',
        formatted_address: 'Wandoor, Malappuram, Kerala, India',
        lat: 11.2000,
        lng: 76.2000,
        state: 'Kerala',
        district: 'Malappuram',
        city: 'Wandoor',
        locality: 'Wandoor',
        type: 'city'
      },
      {
        id: 'kalikavu',
        name: 'Kalikavu',
        formatted_address: 'Kalikavu, Malappuram, Kerala, India',
        lat: 11.1500,
        lng: 76.1500,
        state: 'Kerala',
        district: 'Malappuram',
        city: 'Kalikavu',
        locality: 'Kalikavu',
        type: 'city'
      }
    ]

    return staticLocations.filter(location => 
      location.name.toLowerCase().includes(lowercaseQuery) ||
      location.locality.toLowerCase().includes(lowercaseQuery) ||
      location.city.toLowerCase().includes(lowercaseQuery) ||
      location.district.toLowerCase().includes(lowercaseQuery) ||
      location.state.toLowerCase().includes(lowercaseQuery)
    )
  }

  // Clear cache
  clearCache(): void {
    this.cache.clear()
  }

  // Get cache size
  getCacheSize(): number {
    return this.cache.size
  }
}

export const locationAPIService = LocationAPIService.getInstance()
