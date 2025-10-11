'use client'

import { useState, useEffect, useRef } from 'react'
import { MapPinIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { loadGoogleMapsAPI, isGoogleMapsLoaded } from '@/lib/google-maps-loader'

// Declare google as a global variable for TypeScript
declare global {
  interface Window {
    google: any
  }
}

// Access google from window
const getGoogle = () => (typeof window !== 'undefined' ? window.google : undefined)

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
  country: string
  postal_code: string
}

interface GoogleMapsLocationSelectorProps {
  label?: string
  value: LocationData | null
  onChange: (location: LocationData | null) => void
  onAddressChange?: (address: string) => void
  error?: string
  placeholder?: string
  required?: boolean
}

export function GoogleMapsLocationSelector({
  label,
  value,
  onChange,
  onAddressChange,
  error,
  placeholder = "Search for a location in India...",
  required = false
}: GoogleMapsLocationSelectorProps) {
  const [query, setQuery] = useState('')
  const [predictions, setPredictions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [mapsLoaded, setMapsLoaded] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteService = useRef<any>(null)
  const placesService = useRef<any>(null)
  const sessionToken = useRef<any>(null)

  // Load Google Maps API on mount
  useEffect(() => {
    loadGoogleMapsAPI()
      .then(() => {
        setMapsLoaded(true)
        // Initialize services
        const google = getGoogle()
        if (isGoogleMapsLoaded() && google) {
          autocompleteService.current = new google.maps.places.AutocompleteService()
          placesService.current = new google.maps.places.PlacesService(document.createElement('div'))
          sessionToken.current = new google.maps.places.AutocompleteSessionToken()
          console.log('Google Maps Places API initialized successfully')
        }
      })
      .catch((err) => {
        console.error('Failed to load Google Maps API:', err)
        setLoadError('Failed to load Google Maps. Using fallback location search.')
      })
  }, [])

  // Search for places when query changes
  useEffect(() => {
    if (query.length >= 3 && mapsLoaded && autocompleteService.current) {
      searchPlaces()
    } else if (query.length < 3) {
      setPredictions([])
    } else if (query.length >= 3 && !mapsLoaded) {
      // Fallback to API endpoint
      searchPlacesFallback()
    }
  }, [query, mapsLoaded])

  const searchPlaces = () => {
    if (!autocompleteService.current) return

    setIsLoading(true)

    const request = {
      input: query,
      componentRestrictions: { country: 'in' }, // Restrict to India
      sessionToken: sessionToken.current,
      types: ['geocode', 'establishment'] // Search for addresses and places
    }

    autocompleteService.current.getPlacePredictions(
      request,
      (predictions: any[], status: string) => {
        setIsLoading(false)
        const google = getGoogle()
        
        if (google && status === google.maps.places.PlacesServiceStatus.OK && predictions) {
          setPredictions(predictions)
          setIsOpen(true)
        } else if (google && status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
          setPredictions([])
          setIsOpen(false)
        } else {
          console.error('Places API error:', status)
          // Fallback to API endpoint
          searchPlacesFallback()
        }
      }
    )
  }

  const searchPlacesFallback = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/google-places?q=${encodeURIComponent(query)}&country=IN`)
      const data = await response.json()
      
      if (data.success && data.data) {
        // Convert API response to predictions format
        const fallbackPredictions = data.data.map((place: any) => ({
          place_id: place.id,
          description: place.formatted_address,
          structured_formatting: {
            main_text: place.name,
            secondary_text: place.formatted_address
          }
        }))
        setPredictions(fallbackPredictions)
        setIsOpen(true)
      } else {
        setPredictions([])
      }
    } catch (error) {
      console.error('Fallback search error:', error)
      setPredictions([])
    } finally {
      setIsLoading(false)
    }
  }

  const getPlaceDetails = (placeId: string, prediction: any) => {
    if (!placesService.current) {
      // Fallback: use prediction data
      handleFallbackSelection(prediction)
      return
    }

    const request = {
      placeId: placeId,
      fields: ['place_id', 'formatted_address', 'name', 'geometry', 'address_components'],
      sessionToken: sessionToken.current
    }

    placesService.current.getDetails(request, (place: any, status: string) => {
      const google = getGoogle()
      if (google && status === google.maps.places.PlacesServiceStatus.OK && place) {
        const locationData = parseGooglePlace(place)
        onChange(locationData)
        setQuery(locationData.formatted_address)
        setIsOpen(false)
        
        if (onAddressChange) {
          onAddressChange(locationData.formatted_address)
        }

        // Create new session token for next search
        sessionToken.current = new google.maps.places.AutocompleteSessionToken()
      } else {
        console.error('Place details error:', status)
        handleFallbackSelection(prediction)
      }
    })
  }

  const handleFallbackSelection = async (prediction: any) => {
    // Try to fetch details from our API
    try {
      const response = await fetch(`/api/google-places?q=${encodeURIComponent(prediction.description)}&country=IN`)
      const data = await response.json()
      
      if (data.success && data.data && data.data.length > 0) {
        const place = data.data[0]
        const locationData: LocationData = {
          id: place.id || prediction.place_id,
          name: place.name,
          formatted_address: place.formatted_address,
          lat: place.lat || 0,
          lng: place.lng || 0,
          state: place.state || '',
          district: place.district || '',
          city: place.city || '',
          locality: place.locality || '',
          country: place.country || 'India',
          postal_code: place.postal_code || ''
        }
        
        onChange(locationData)
        setQuery(locationData.formatted_address)
        setIsOpen(false)
        
        if (onAddressChange) {
          onAddressChange(locationData.formatted_address)
        }
      }
    } catch (error) {
      console.error('Fallback selection error:', error)
    }
  }

  const parseGooglePlace = (place: any): LocationData => {
    const addressComponents = place.address_components || []
    
    const getComponent = (types: string[]) => {
      const component = addressComponents.find((comp: any) =>
        comp.types.some((type: string) => types.includes(type))
      )
      return component ? component.long_name : ''
    }

    return {
      id: place.place_id,
      name: place.name || '',
      formatted_address: place.formatted_address || '',
      lat: place.geometry?.location?.lat() || 0,
      lng: place.geometry?.location?.lng() || 0,
      state: getComponent(['administrative_area_level_1']),
      district: getComponent(['administrative_area_level_2']),
      city: getComponent(['locality', 'administrative_area_level_3']),
      locality: getComponent(['sublocality', 'sublocality_level_1', 'sublocality_level_2', 'neighborhood']),
      country: getComponent(['country']),
      postal_code: getComponent(['postal_code'])
    }
  }

  const handleInputChange = (value: string) => {
    setQuery(value)
    
    if (!value) {
      onChange(null)
      setPredictions([])
      setIsOpen(false)
      if (onAddressChange) {
        onAddressChange('')
      }
    }
  }

  const handleSelectPrediction = (prediction: any) => {
    getPlaceDetails(prediction.place_id, prediction)
  }

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPinIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            ref={inputRef}
            type="text"
            className={`block w-full pl-10 pr-10 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
              error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
            }`}
            placeholder={placeholder}
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => {
              if (predictions.length > 0) {
                setIsOpen(true)
              }
            }}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            ) : (
              <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
            )}
          </div>
        </div>

        {/* Predictions dropdown */}
        {isOpen && predictions.length > 0 && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {predictions.map((prediction) => (
              <div
                key={prediction.place_id}
                className="relative cursor-pointer select-none py-2 pl-10 pr-4 hover:bg-blue-600 hover:text-white"
                onClick={() => handleSelectPrediction(prediction)}
              >
                <span className="block truncate">
                  {prediction.structured_formatting?.main_text || prediction.description}
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  {prediction.structured_formatting?.secondary_text || ''}
                </span>
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <MapPinIcon className="h-4 w-4" />
                </span>
              </div>
            ))}
          </div>
        )}

        {/* No results message */}
        {isOpen && predictions.length === 0 && query.length >= 3 && !isLoading && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-2 px-4 text-sm text-gray-700">
            No locations found. Try a different search term.
          </div>
        )}

        {/* Loading message */}
        {isLoading && query.length >= 3 && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-2 px-4 text-sm text-gray-700">
            Searching...
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {loadError && (
        <p className="text-xs text-yellow-600">{loadError}</p>
      )}

      {!mapsLoaded && !loadError && (
        <p className="text-xs text-gray-500">Loading Google Maps...</p>
      )}
    </div>
  )
}

export default GoogleMapsLocationSelector

