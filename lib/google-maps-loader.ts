// Google Maps API Loader
// This utility ensures Google Maps API is loaded only once

// Declare google as a global variable for TypeScript
declare global {
  interface Window {
    google: any
    initGoogleMaps: () => void
  }
}

let isLoading = false
let isLoaded = false
let loadPromise: Promise<void> | null = null

export function loadGoogleMapsAPI(): Promise<void> {
  // Return existing promise if already loading
  if (loadPromise) {
    return loadPromise
  }

  // Return resolved promise if already loaded
  if (isLoaded) {
    return Promise.resolve()
  }

  // Start loading
  isLoading = true

  loadPromise = new Promise((resolve, reject) => {
    // Check if API key is available
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

    if (!apiKey) {
      console.error('Google Maps API key not found. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your environment variables.')
      reject(new Error('Google Maps API key not configured'))
      return
    }

    // Check if script already exists
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]')
    if (existingScript) {
      isLoaded = true
      isLoading = false
      resolve()
      return
    }

    // Create script element
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMaps`
    script.async = true
    script.defer = true

    // Define callback function
    window.initGoogleMaps = () => {
      isLoaded = true
      isLoading = false
      console.log('Google Maps API loaded successfully')
      resolve()
    }

    script.onerror = () => {
      isLoading = false
      loadPromise = null
      console.error('Failed to load Google Maps API')
      reject(new Error('Failed to load Google Maps API'))
    }

    document.head.appendChild(script)
  })

  return loadPromise
}

export function isGoogleMapsLoaded(): boolean {
  if (typeof window === 'undefined') return false
  return isLoaded && typeof window.google !== 'undefined' && typeof window.google.maps !== 'undefined'
}

export function getGoogleMapsAPI() {
  if (!isGoogleMapsLoaded()) {
    throw new Error('Google Maps API is not loaded yet. Call loadGoogleMapsAPI() first.')
  }
  return window.google.maps
}

