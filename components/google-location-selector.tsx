'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronDownIcon, MapPinIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import clsx from 'clsx'

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

interface GoogleLocationSelectorProps {
  label?: string
  value: LocationData | null
  onChange: (location: LocationData | null) => void
  onAddressChange?: (address: string) => void
  error?: string
  placeholder?: string
}

export function GoogleLocationSelector({
  label,
  value,
  onChange,
  onAddressChange,
  error,
  placeholder = "Search for a location..."
}: GoogleLocationSelectorProps) {
  const [query, setQuery] = useState('')
  const [locations, setLocations] = useState<LocationData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (query.length >= 2) {
      fetchLocations()
    } else {
      setLocations([])
    }
  }, [query])

  const fetchLocations = async () => {
    setIsLoading(true)
    try {
      // Fetch ONLY from Google Places API - no fallback, no static data
      const response = await fetch(`/api/google-places?q=${encodeURIComponent(query)}&country=IN`)
      const data = await response.json()
      
      if (data.success && data.data) {
        setLocations(data.data)
        console.log(`Found ${data.data.length} locations from Google API`)
      } else {
        console.error('Error fetching locations:', data.error)
        setLocations([])
      }
    } catch (error) {
      console.error('Error fetching locations from Google API:', error)
      setLocations([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelect = (location: LocationData) => {
    onChange(location)
    setQuery(location.formatted_address)
    setIsOpen(false)
    
    if (onAddressChange) {
      onAddressChange(location.formatted_address)
    }
  }

  const handleInputChange = (value: string) => {
    setQuery(value)
    setIsOpen(true)
    
    if (!value) {
      onChange(null)
      if (onAddressChange) {
        onAddressChange('')
      }
    }
  }

  const getLocationIcon = () => {
    return <MapPinIcon className="h-5 w-5 text-gray-400" />
  }

  const getLocationTypeLabel = (location: LocationData) => {
    if (location.locality) return 'Locality'
    if (location.city) return 'City'
    if (location.district) return 'District'
    if (location.state) return 'State'
    return 'Location'
  }

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <Combobox value={value} onChange={handleSelect}>
        <div className="relative">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {getLocationIcon()}
            </div>
            <Combobox.Input
              ref={inputRef}
              className={clsx(
                'block w-full pl-10 pr-10 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
                error ? 'border-blue-300' : 'border-gray-300'
              )}
              placeholder={placeholder}
              value={query}
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={() => setIsOpen(true)}
              onBlur={() => setTimeout(() => setIsOpen(false), 200)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              ) : (
                <ChevronDownIcon className="h-4 w-4 text-gray-400" />
              )}
            </div>
          </div>

          {isOpen && (
            <Combobox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
              {locations.length === 0 && query !== '' && !isLoading && (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  No locations found.
                </div>
              )}
              {locations.length === 0 && query !== '' && isLoading && (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Searching...
                </div>
              )}
              {locations.map((location) => (
                <Combobox.Option
                  key={location.id}
                  value={location}
                  className={({ active }) =>
                    clsx(
                      'relative cursor-default select-none py-2 pl-10 pr-4',
                      active ? 'bg-blue-600 text-white' : 'text-gray-900'
                    )
                  }
                >
                  {({ selected, active }) => (
                    <>
                      <span className={clsx('block truncate', selected ? 'font-medium' : 'font-normal')}>
                        {location.formatted_address}
                      </span>
                      <span className={clsx(
                        'absolute inset-y-0 left-0 flex items-center pl-3',
                        active ? 'text-white' : 'text-blue-600'
                      )}>
                        <MapPinIcon className="h-4 w-4" />
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        {getLocationTypeLabel(location)} • {location.city}, {location.state}
                      </div>
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>

      {error && (
        <p className="text-sm text-blue-600">{error}</p>
      )}
    </div>
  )
}
