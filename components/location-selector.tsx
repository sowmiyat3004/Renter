'use client'

import { useState, useEffect, useRef } from 'react'
import { Combobox } from '@headlessui/react'
import { MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline'

interface Location {
  city: string
  state: string
  lat: number
  lng: number
}

interface LocationSelectorProps {
  onLocationSelect: (location: Location) => void
  placeholder?: string
  className?: string
  value?: Location | null
}

export default function LocationSelector({ 
  onLocationSelect, 
  placeholder = "Search for a city...",
  className = "",
  value
}: LocationSelectorProps) {
  const [query, setQuery] = useState('')
  const [locations, setLocations] = useState<Location[]>([])
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(value || null)
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Search for locations when query changes
  useEffect(() => {
    if (query.length < 2) {
      setLocations([])
      return
    }

    const searchLocations = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/locations?type=search&q=${encodeURIComponent(query)}&limit=10`)
        const data = await response.json()
        
        if (data.success) {
          setLocations(data.data || [])
        }
      } catch (error) {
        console.error('Error searching locations:', error)
        setLocations([])
      } finally {
        setIsLoading(false)
      }
    }

    const timeoutId = setTimeout(searchLocations, 300) // Debounce search
    return () => clearTimeout(timeoutId)
  }, [query])

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location)
    setQuery(`${location.city}, ${location.state}`)
    onLocationSelect(location)
    setIsOpen(false)
  }

  const handleInputChange = (value: string) => {
    setQuery(value)
    setIsOpen(true)
    
    // Clear selection if user clears the input
    if (!value && selectedLocation) {
      setSelectedLocation(null)
      onLocationSelect(null as any)
    }
  }

  const handleInputFocus = () => {
    setIsOpen(true)
  }

  const handleInputBlur = () => {
    // Delay closing to allow for selection
    setTimeout(() => setIsOpen(false), 200)
  }

  return (
    <div className={`relative ${className}`}>
      <Combobox value={selectedLocation} onChange={handleLocationSelect}>
        <div className="relative">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Combobox.Input
              ref={inputRef}
              className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder={placeholder}
              value={query}
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              displayValue={(location: Location) => 
                location ? `${location.city}, ${location.state}` : ''
              }
            />
          </div>

          {isOpen && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {isLoading ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                    Searching...
                  </div>
                </div>
              ) : locations.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  No locations found.
                </div>
              ) : (
                locations.map((location, index) => (
                  <Combobox.Option
                    key={`${location.city}-${location.state}-${index}`}
                    value={location}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-blue-600 text-white' : 'text-gray-900'
                      }`
                    }
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
                          <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                            {location.city}, {location.state}
                          </span>
                        </div>
                        {selected ? (
                          <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-white' : 'text-blue-600'
                          }`}>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
    </div>
  )
}
