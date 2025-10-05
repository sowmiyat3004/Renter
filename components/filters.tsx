'use client'

import { useState } from 'react'
import { X, Bed, Bath, Wifi, Car, Home } from 'lucide-react'

interface FiltersProps {
  filters: {
    location: string
    minPrice: string
    maxPrice: string
    bedrooms: string
    bathrooms: string
    amenities: string[]
  }
  onFilterChange: (filters: any) => void
  onApplyFilters: () => void
}

const amenityOptions = [
  { id: 'wifi', name: 'WiFi', icon: Wifi },
  { id: 'parking', name: 'Parking', icon: Car },
  { id: 'furnished', name: 'Furnished', icon: Home },
  { id: 'air-conditioning', name: 'Air Conditioning', icon: Wifi },
  { id: 'heating', name: 'Heating', icon: Wifi },
  { id: 'washing-machine', name: 'Washing Machine', icon: Wifi },
  { id: 'dishwasher', name: 'Dishwasher', icon: Wifi },
  { id: 'balcony', name: 'Balcony', icon: Wifi },
  { id: 'garden', name: 'Garden', icon: Wifi },
  { id: 'pet-friendly', name: 'Pet Friendly', icon: Wifi },
  { id: 'gym', name: 'Gym', icon: Wifi },
  { id: 'pool', name: 'Pool', icon: Wifi },
  { id: 'security', name: 'Security', icon: Wifi },
  { id: 'elevator', name: 'Elevator', icon: Wifi },
]

export function Filters({ filters, onFilterChange, onApplyFilters }: FiltersProps) {
  const [localFilters, setLocalFilters] = useState(filters)

  const handleInputChange = (field: string, value: string) => {
    const newFilters = { ...localFilters, [field]: value }
    setLocalFilters(newFilters)
  }

  const handleAmenityToggle = (amenityId: string) => {
    const newAmenities = localFilters.amenities.includes(amenityId)
      ? localFilters.amenities.filter(id => id !== amenityId)
      : [...localFilters.amenities, amenityId]
    
    setLocalFilters({ ...localFilters, amenities: newAmenities })
  }

  const handleApplyFilters = () => {
    onFilterChange(localFilters)
    onApplyFilters()
  }

  const handleClearFilters = () => {
    const clearedFilters = {
      location: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      amenities: [],
    }
    setLocalFilters(clearedFilters)
    onFilterChange(clearedFilters)
    onApplyFilters()
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button
          onClick={handleClearFilters}
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-6">
        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            placeholder="Enter city, state, or address"
            value={localFilters.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="input"
          />
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Min Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">₹</span>
                <input
                  type="number"
                  placeholder="0"
                  value={localFilters.minPrice}
                  onChange={(e) => handleInputChange('minPrice', e.target.value)}
                  className="input pl-10"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Max Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">₹</span>
                <input
                  type="number"
                  placeholder="5000"
                  value={localFilters.maxPrice}
                  onChange={(e) => handleInputChange('maxPrice', e.target.value)}
                  className="input pl-10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bedrooms
          </label>
          <div className="relative">
            <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={localFilters.bedrooms}
              onChange={(e) => handleInputChange('bedrooms', e.target.value)}
              className="input pl-10"
            >
              <option value="">Any</option>
              <option value="0">Studio</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
        </div>

        {/* Bathrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bathrooms
          </label>
          <div className="relative">
            <Bath className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={localFilters.bathrooms}
              onChange={(e) => handleInputChange('bathrooms', e.target.value)}
              className="input pl-10"
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="1.5">1.5+</option>
              <option value="2">2+</option>
              <option value="2.5">2.5+</option>
              <option value="3">3+</option>
            </select>
          </div>
        </div>

        {/* Amenities */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amenities
          </label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {amenityOptions.map((amenity) => (
              <label
                key={amenity.id}
                className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
              >
                <input
                  type="checkbox"
                  checked={localFilters.amenities.includes(amenity.id)}
                  onChange={() => handleAmenityToggle(amenity.id)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <amenity.icon className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-700">{amenity.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Apply Button */}
        <button
          onClick={handleApplyFilters}
          className="btn-primary w-full"
        >
          Apply Filters
        </button>
      </div>
    </div>
  )
}
