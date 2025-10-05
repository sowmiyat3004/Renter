'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronDownIcon, MapPinIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import clsx from 'clsx'
import { locationAPIService } from '@/lib/locations/api-integration'

interface LocationData {
  id: string
  type: 'state' | 'district' | 'city' | 'locality'
  name: string
  state?: string
  district?: string
  city?: string
  locality?: string
  lat?: number
  lng?: number
  displayName: string
}

interface EnhancedLocationSelectorProps {
  label: string
  value: LocationData | null
  onChange: (location: LocationData | null) => void
  placeholder?: string
  className?: string
  showAllTypes?: boolean
  debounceMs?: number
}

export function EnhancedLocationSelector({
  label,
  value,
  onChange,
  placeholder = "Search for location...",
  className = "",
  showAllTypes = true,
  debounceMs = 300
}: EnhancedLocationSelectorProps) {
  const [query, setQuery] = useState('')
  const [locations, setLocations] = useState<LocationData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  // Auto-fetch locations when query changes
  useEffect(() => {
    if (query.length < 2) {
      setLocations([])
      return
    }

    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set new timeout for debounced search
    timeoutRef.current = setTimeout(async () => {
      await fetchLocations(query)
    }, debounceMs)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [query, debounceMs])

  const fetchLocations = async (searchQuery: string) => {
    setIsLoading(true)
    try {
      // Use the new API service for comprehensive location search
      const apiResults = await locationAPIService.searchPlaces(searchQuery, 'IN')
      
      // Also fetch from existing API for backward compatibility
      const response = await fetch(`/api/locations?type=comprehensive&q=${encodeURIComponent(searchQuery)}&limit=20`)
      const data = await response.json()
      
      const allLocations: LocationData[] = []
      
      // Add API results first (higher priority)
      apiResults.forEach((location) => {
        allLocations.push({
          id: location.id,
          type: location.type,
          name: location.name,
          state: location.state,
          district: location.district,
          city: location.city,
          locality: location.locality,
          lat: location.lat,
          lng: location.lng,
          displayName: location.formatted_address
        })
      })
      
      // Add static data results if API didn't return enough
      if (data.success && allLocations.length < 10) {
        // Add states
        if (data.data.states) {
          data.data.states.forEach((state: any) => {
            if (!allLocations.some(loc => loc.name === state.name && loc.type === 'state')) {
              allLocations.push({
                id: `state-${state.name}`,
                type: 'state',
                name: state.name,
                displayName: state.name
              })
            }
          })
        }
        
        // Add districts
        if (data.data.districts) {
          data.data.districts.forEach((district: any) => {
            if (!allLocations.some(loc => loc.name === district.district && loc.type === 'district')) {
              allLocations.push({
                id: `district-${district.state}-${district.district}`,
                type: 'district',
                name: district.district,
                state: district.state,
                displayName: `${district.district}, ${district.state}`
              })
            }
          })
        }
        
        // Add cities
        if (data.data.cities) {
          data.data.cities.forEach((city: any) => {
            if (!allLocations.some(loc => loc.name === city.city && loc.type === 'city')) {
              allLocations.push({
                id: `city-${city.state}-${city.city}`,
                type: 'city',
                name: city.city,
                state: city.state,
                district: city.district,
                lat: city.lat,
                lng: city.lng,
                displayName: city.district 
                  ? `${city.city}, ${city.district}, ${city.state}`
                  : `${city.city}, ${city.state}`
              })
            }
          })
        }
        
        // Add localities (neighborhoods/areas)
        if (data.data.localities) {
          data.data.localities.forEach((locality: any) => {
            if (!allLocations.some(loc => loc.name === locality.locality && loc.type === 'locality')) {
              allLocations.push({
                id: `locality-${locality.state}-${locality.city}-${locality.locality}`,
                type: 'locality',
                name: locality.locality,
                state: locality.state,
                district: locality.district,
                city: locality.city,
                locality: locality.locality,
                lat: locality.lat,
                lng: locality.lng,
                displayName: locality.district 
                  ? `${locality.locality}, ${locality.city}, ${locality.district}, ${locality.state}`
                  : `${locality.locality}, ${locality.city}, ${locality.state}`
              })
            }
          })
        }
      }
      
      setLocations(allLocations.slice(0, 20)) // Limit to 20 results
    } catch (error) {
      console.error('Error fetching locations:', error)
      setLocations([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelect = (selectedLocation: LocationData | null) => {
    onChange(selectedLocation)
    if (selectedLocation) {
      setQuery(selectedLocation.displayName)
    } else {
      setQuery('')
    }
    setIsOpen(false)
  }

  const handleInputChange = (value: string) => {
    setQuery(value)
    setIsOpen(true)
    
    // Clear selection if user clears the input
    if (!value && value) {
      onChange(null)
    }
  }

  const handleInputFocus = () => {
    setIsOpen(true)
  }

  const handleInputBlur = () => {
    // Delay closing to allow for selection
    setTimeout(() => setIsOpen(false), 200)
  }

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'state':
        return '🏛️'
      case 'district':
        return '🏘️'
      case 'city':
        return '🏙️'
      case 'locality':
        return '🏠'
      default:
        return '📍'
    }
  }

  const getLocationTypeLabel = (type: string) => {
    switch (type) {
      case 'state':
        return 'State'
      case 'district':
        return 'District'
      case 'city':
        return 'City'
      case 'locality':
        return 'Locality'
      default:
        return 'Location'
    }
  }

  return (
    <div className={`relative ${className}`}>
      <Combobox as="div" value={value} onChange={handleSelect}>
        <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
          {label}
        </Combobox.Label>
        
        <div className="relative">
          <div className="relative">
            <Combobox.Input
              className="w-full rounded-md border-0 bg-white py-2 pl-10 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(event) => handleInputChange(event.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              displayValue={(location: LocationData | null) => location ? location.displayName : ''}
              placeholder={placeholder}
              ref={inputRef}
            />
            
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
              <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </Combobox.Button>
          </div>

          {isOpen && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {isLoading && (
                <div className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-500">
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600 mr-2"></div>
                    Searching locations...
                  </div>
                </div>
              )}
              
              {!isLoading && locations.length === 0 && query.length >= 2 && (
                <div className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-500">
                  No locations found.
                </div>
              )}
              
              {!isLoading && locations.length > 0 && (
                <>
                  {locations.map((location) => (
                    <Combobox.Option
                      key={location.id}
                      value={location}
                      className={({ active }) =>
                        clsx(
                          'relative cursor-default select-none py-2 pl-3 pr-9',
                          active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                        )
                      }
                    >
                      {({ active, selected }) => (
                        <>
                          <div className="flex items-center">
                            <span className="text-lg mr-2">
                              {getLocationIcon(location.type)}
                            </span>
                            <div className="flex-1">
                              <span className={clsx('block truncate', selected && 'font-semibold')}>
                                {location.displayName}
                              </span>
                              <span className={clsx(
                                'block text-xs',
                                active ? 'text-indigo-200' : 'text-gray-500'
                              )}>
                                {getLocationTypeLabel(location.type)}
                                {location.lat && location.lng && (
                                  <span className="ml-2">
                                    📍 {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                                  </span>
                                )}
                              </span>
                            </div>
                          </div>

                          {selected && (
                            <span
                              className={clsx(
                                'absolute inset-y-0 right-0 flex items-center pr-4',
                                active ? 'text-white' : 'text-indigo-600'
                              )}
                            >
                              ✓
                            </span>
                          )}
                        </>
                      )}
                    </Combobox.Option>
                  ))}
                </>
              )}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
    </div>
  )
}
