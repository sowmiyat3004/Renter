'use client'

import { useEffect, useRef, useState } from 'react'
import { MapPinIcon } from '@heroicons/react/24/outline'
import {
  loadGoogleMaps,
  createAutocomplete,
  parseAddressComponents,
  getCurrentLocation,
  reverseGeocode
} from '@/lib/google-maps-browser'

interface LocationData {
  formatted_address: string
  lat: number
  lng: number
  place_id: string
  name: string
  street: string
  locality: string
  city: string
  district: string
  state: string
  country: string
  postalCode: string
}

interface GoogleMapsAutocompleteProps {
  label?: string
  value?: LocationData | null
  onChange: (location: LocationData | null) => void
  placeholder?: string
  error?: string
  required?: boolean
  showDetectLocation?: boolean
}

export function GoogleMapsAutocomplete({
  label,
  value,
  onChange,
  placeholder = 'Search for a location...',
  error,
  required = false,
  showDetectLocation = true
}: GoogleMapsAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [mapsLoaded, setMapsLoaded] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [isDetecting, setIsDetecting] = useState(false)

  // Load Google Maps on mount
  useEffect(() => {
    loadGoogleMaps()
      .then(() => {
        setMapsLoaded(true)
        initAutocomplete()
      })
      .catch((err) => {
        console.error('Failed to load Google Maps:', err)
        setLoadError('Failed to load location services. Please refresh the page.')
      })
  }, [])

  // Initialize autocomplete
  const initAutocomplete = () => {
    if (!inputRef.current) return

    try {
      autocompleteRef.current = createAutocomplete(inputRef.current, {
        country: 'in',
        types: ['geocode', 'establishment'],
        onPlaceChanged: handlePlaceSelect
      })

      console.log('✅ Autocomplete initialized')
    } catch (error) {
      console.error('Failed to initialize autocomplete:', error)
    }
  }

  // Handle place selection
  const handlePlaceSelect = (place: any) => {
    if (!place || !place.geometry) {
      console.error('No place data received')
      return
    }

    const parsed = parseAddressComponents(place.address_components || [])

    const locationData: LocationData = {
      formatted_address: place.formatted_address || '',
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      place_id: place.place_id || '',
      name: place.name || parsed.locality || parsed.city,
      street: parsed.street,
      locality: parsed.locality,
      city: parsed.city,
      district: parsed.district,
      state: parsed.state,
      country: parsed.country,
      postalCode: parsed.postalCode
    }

    console.log('📍 Location selected:', locationData)
    onChange(locationData)
  }

  // Detect user's current location
  const handleDetectLocation = async () => {
    setIsDetecting(true)
    try {
      // Get current coordinates
      const coords = await getCurrentLocation()
      console.log('📍 User location:', coords)

      // Reverse geocode to get address
      const result = await reverseGeocode(coords.lat, coords.lng)
      
      const parsed = parseAddressComponents(result.address_components || [])

      const locationData: LocationData = {
        formatted_address: result.formatted_address || '',
        lat: coords.lat,
        lng: coords.lng,
        place_id: result.place_id || '',
        name: parsed.locality || parsed.city,
        street: parsed.street,
        locality: parsed.locality,
        city: parsed.city,
        district: parsed.district,
        state: parsed.state,
        country: parsed.country,
        postalCode: parsed.postalCode
      }

      if (inputRef.current) {
        inputRef.current.value = locationData.formatted_address
      }

      onChange(locationData)
    } catch (error) {
      console.error('Failed to detect location:', error)
      alert('Could not detect your location. Please ensure location permissions are enabled.')
    } finally {
      setIsDetecting(false)
    }
  }

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="space-y-2">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPinIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            ref={inputRef}
            type="text"
            className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
              error ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder={placeholder}
            disabled={!mapsLoaded}
          />
        </div>

        {/* Detect Location Button */}
        {showDetectLocation && mapsLoaded && (
          <button
            type="button"
            onClick={handleDetectLocation}
            disabled={isDetecting}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isDetecting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Detecting...
              </>
            ) : (
              <>
                <MapPinIcon className="h-4 w-4 mr-2" />
                Detect My Location
              </>
            )}
          </button>
        )}
      </div>

      {/* Status Messages */}
      {!mapsLoaded && !loadError && (
        <p className="text-xs text-gray-500">Loading location services...</p>
      )}

      {loadError && (
        <p className="text-xs text-red-600">{loadError}</p>
      )}

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {/* Selected Location Display */}
      {value && (
        <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-sm">
            <div className="font-medium text-blue-900">{value.name}</div>
            <div className="text-blue-700 text-xs mt-1">{value.formatted_address}</div>
            <div className="text-blue-600 text-xs mt-1">
              {value.city && `${value.city}, `}
              {value.state}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GoogleMapsAutocomplete

