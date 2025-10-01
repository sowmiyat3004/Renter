'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin, Filter, Bed, Bath } from 'lucide-react'
import { EnhancedLocationSelector } from './enhanced-location-selector'

export function SearchBar() {
  const [searchParams, setSearchParams] = useState({
    location: null as any,
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
  })
  const [showFilters, setShowFilters] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    
    const params = new URLSearchParams()
    
    if (searchParams.location) params.set('location', searchParams.location.displayName)
    if (searchParams.minPrice) params.set('minPrice', searchParams.minPrice)
    if (searchParams.maxPrice) params.set('maxPrice', searchParams.maxPrice)
    if (searchParams.bedrooms) params.set('bedrooms', searchParams.bedrooms)
    if (searchParams.bathrooms) params.set('bathrooms', searchParams.bathrooms)
    
    router.push(`/listings?${params.toString()}`)
  }

  const handleInputChange = (field: string, value: string) => {
    setSearchParams(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Find Your Next Home
          </h2>
          <p className="text-lg text-gray-600">
            Search through thousands of verified rental properties
          </p>
        </div>

        <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* Main Search Row */}
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              {/* Location Input */}
              <div className="flex-1">
                <EnhancedLocationSelector
                  label=""
                  value={searchParams.location}
                  onChange={(location) => setSearchParams(prev => ({ ...prev, location }))}
                  placeholder="Enter city, state, or address"
                  className="w-full"
                />
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="btn-primary btn-lg flex items-center justify-center"
              >
                <Search className="h-5 w-5 mr-2" />
                Search
              </button>
            </div>

            {/* Filters Toggle */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
              >
                <Filter className="h-4 w-4 mr-2" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Min Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        placeholder="0"
                        value={searchParams.minPrice}
                        onChange={(e) => handleInputChange('minPrice', e.target.value)}
                        className="input pl-8"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        placeholder="50000"
                        value={searchParams.maxPrice}
                        onChange={(e) => handleInputChange('maxPrice', e.target.value)}
                        className="input pl-8"
                      />
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
                        value={searchParams.bedrooms}
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
                        value={searchParams.bathrooms}
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
                </div>
              </div>
            )}
          </div>
        </form>

        {/* Quick Search Suggestions */}
        <div className="mt-8">
          <p className="text-sm text-gray-600 mb-4">Popular searches:</p>
          <div className="flex flex-wrap gap-2">
            {[
              'Apartments in Mumbai',
              'Houses in Bangalore',
              'Studios in Delhi',
              'Pet-friendly rentals',
              'Furnished apartments',
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  setSearchParams(prev => ({ ...prev, location: suggestion }))
                  router.push(`/listings?location=${encodeURIComponent(suggestion)}`)
                }}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
