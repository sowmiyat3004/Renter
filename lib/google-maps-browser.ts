// Google Maps Browser/Client-Side Integration
// For use in React components with Maps JavaScript API

declare global {
  interface Window {
    google: any
    initGoogleMaps: () => void
  }
}

let isLoaded = false
let loadPromise: Promise<void> | null = null

/**
 * Load Google Maps JavaScript API
 * Include libraries: places, geocoding
 */
export function loadGoogleMaps(): Promise<void> {
  // Return existing promise if already loading
  if (loadPromise) {
    return loadPromise
  }

  // Return resolved if already loaded
  if (isLoaded && typeof window !== 'undefined' && window.google?.maps) {
    return Promise.resolve()
  }

  loadPromise = new Promise((resolve, reject) => {
    // Check if we're in browser
    if (typeof window === 'undefined') {
      reject(new Error('Google Maps can only be loaded in browser'))
      return
    }

    // Check for API key
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    if (!apiKey) {
      console.error('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY not found')
      reject(new Error('Google Maps API key not configured'))
      return
    }

    // Check if already exists
    if (window.google?.maps) {
      isLoaded = true
      resolve()
      return
    }

    // Create callback
    window.initGoogleMaps = () => {
      isLoaded = true
      console.log('✅ Google Maps API loaded successfully')
      resolve()
    }

    // Load script
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geocoding&callback=initGoogleMaps`
    script.async = true
    script.defer = true

    script.onerror = () => {
      loadPromise = null
      reject(new Error('Failed to load Google Maps API'))
    }

    document.head.appendChild(script)
  })

  return loadPromise
}

/**
 * Check if Google Maps is loaded
 */
export function isGoogleMapsLoaded(): boolean {
  return isLoaded && typeof window !== 'undefined' && !!window.google?.maps
}

/**
 * Get Google Maps API (throws if not loaded)
 */
export function getGoogleMaps() {
  if (!isGoogleMapsLoaded()) {
    throw new Error('Google Maps not loaded. Call loadGoogleMaps() first.')
  }
  return window.google.maps
}

/**
 * Create Autocomplete for an input element
 */
export function createAutocomplete(
  input: HTMLInputElement,
  options?: {
    country?: string
    types?: string[]
    onPlaceChanged?: (place: any) => void
  }
) {
  if (!isGoogleMapsLoaded()) {
    throw new Error('Google Maps not loaded')
  }

  const autocomplete = new window.google.maps.places.Autocomplete(input, {
    componentRestrictions: { country: options?.country || 'in' },
    types: options?.types || ['geocode', 'establishment'],
    fields: ['place_id', 'formatted_address', 'geometry', 'address_components', 'name']
  })

  if (options?.onPlaceChanged) {
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      if (options.onPlaceChanged) {
        options.onPlaceChanged(place)
      }
    })
  }

  return autocomplete
}

/**
 * Create a Map
 */
export function createMap(
  element: HTMLElement,
  options?: {
    center?: { lat: number; lng: number }
    zoom?: number
  }
) {
  if (!isGoogleMapsLoaded()) {
    throw new Error('Google Maps not loaded')
  }

  return new window.google.maps.Map(element, {
    center: options?.center || { lat: 20.5937, lng: 78.9629 }, // India center
    zoom: options?.zoom || 5,
    mapTypeControl: true,
    streetViewControl: false,
    fullscreenControl: true,
    zoomControl: true
  })
}

/**
 * Create a Marker
 */
export function createMarker(options: {
  map: any
  position: { lat: number; lng: number }
  title?: string
  onClick?: () => void
}) {
  if (!isGoogleMapsLoaded()) {
    throw new Error('Google Maps not loaded')
  }

  const marker = new window.google.maps.Marker({
    map: options.map,
    position: options.position,
    title: options.title,
    animation: window.google.maps.Animation.DROP
  })

  if (options.onClick) {
    marker.addListener('click', options.onClick)
  }

  return marker
}

/**
 * Geocode an address
 */
export async function geocodeAddress(address: string): Promise<any> {
  if (!isGoogleMapsLoaded()) {
    throw new Error('Google Maps not loaded')
  }

  const geocoder = new window.google.maps.Geocoder()

  return new Promise((resolve, reject) => {
    geocoder.geocode({ address }, (results: any, status: string) => {
      if (status === 'OK' && results && results.length > 0) {
        resolve(results[0])
      } else {
        reject(new Error(`Geocoding failed: ${status}`))
      }
    })
  })
}

/**
 * Reverse geocode coordinates
 */
export async function reverseGeocode(lat: number, lng: number): Promise<any> {
  if (!isGoogleMapsLoaded()) {
    throw new Error('Google Maps not loaded')
  }

  const geocoder = new window.google.maps.Geocoder()

  return new Promise((resolve, reject) => {
    geocoder.geocode(
      { location: { lat, lng } },
      (results: any, status: string) => {
        if (status === 'OK' && results && results.length > 0) {
          resolve(results[0])
        } else {
          reject(new Error(`Reverse geocoding failed: ${status}`))
        }
      }
    )
  })
}

/**
 * Get user's current location using browser geolocation
 */
export async function getCurrentLocation(): Promise<{ lat: number; lng: number }> {
  if (typeof window === 'undefined' || !navigator.geolocation) {
    throw new Error('Geolocation not supported')
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      },
      (error) => {
        reject(error)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    )
  })
}

/**
 * Parse address components from Google result
 */
export function parseAddressComponents(components: any[]): {
  street: string
  locality: string
  city: string
  district: string
  state: string
  country: string
  postalCode: string
} {
  const find = (types: string[]) => {
    const comp = components.find((c) => c.types.some((t: string) => types.includes(t)))
    return comp?.long_name || ''
  }

  return {
    street: find(['route', 'street_address']),
    locality: find(['sublocality', 'sublocality_level_1', 'sublocality_level_2', 'neighborhood']),
    city: find(['locality', 'administrative_area_level_3']),
    district: find(['administrative_area_level_2']),
    state: find(['administrative_area_level_1']),
    country: find(['country']),
    postalCode: find(['postal_code'])
  }
}

/**
 * Calculate distance between two points (Haversine formula)
 */
export function calculateDistance(
  point1: { lat: number; lng: number },
  point2: { lat: number; lng: number }
): number {
  const R = 6371 // Earth's radius in km
  const dLat = ((point2.lat - point1.lat) * Math.PI) / 180
  const dLng = ((point2.lng - point1.lng) * Math.PI) / 180

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((point1.lat * Math.PI) / 180) *
      Math.cos((point2.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

