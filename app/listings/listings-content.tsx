'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { SearchBar } from '@/components/search-bar'
import { ListingCard } from '@/components/listing-card'
import { Filters } from '@/components/filters'
import { Pagination } from '@/components/pagination'
import { MapPin, Filter, Grid, List } from 'lucide-react'
import { ListingWithDetails } from '@/types'

export default function ListingsContent() {
  const [listings, setListings] = useState<ListingWithDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  })
  
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState({
    location: searchParams.get('location') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    bathrooms: searchParams.get('bathrooms') || '',
    amenities: searchParams.get('amenities')?.split(',') || [],
  })

  const fetchListings = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      
      if (filters.location) params.append('location', filters.location)
      if (filters.minPrice) params.append('minPrice', filters.minPrice)
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice)
      if (filters.bedrooms) params.append('bedrooms', filters.bedrooms)
      if (filters.bathrooms) params.append('bathrooms', filters.bathrooms)
      if (filters.amenities.length > 0) params.append('amenities', filters.amenities.join(','))
      
      params.append('page', pagination.page.toString())
      params.append('limit', pagination.limit.toString())

      const response = await fetch(`/api/listings?${params.toString()}`)
      const data = await response.json()

      if (data.success) {
        setListings(data.data.listings)
        setPagination(prev => ({
          ...prev,
          total: data.data.total,
          totalPages: data.data.totalPages
        }))
      }
    } catch (error) {
      console.error('Error fetching listings:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchListings()
  }, [filters, pagination.page])

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters)
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Find Your Perfect Home
          </h1>
          <SearchBar onSearch={handleFilterChange} />
        </div>

        {/* Filters and View Toggle */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${
                viewMode === 'grid' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white text-gray-600 border border-gray-300'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${
                viewMode === 'list' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white text-gray-600 border border-gray-300'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mb-6">
            <Filters 
              filters={filters} 
              onFiltersChange={handleFilterChange}
            />
          </div>
        )}

        {/* Results */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              {loading ? 'Loading...' : `${pagination.total} properties found`}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              <span>India</span>
            </div>
          </div>
        </div>

        {/* Listings Grid/List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : listings.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }>
            {listings.map((listing) => (
              <ListingCard 
                key={listing.id} 
                listing={listing} 
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MapPin className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No properties found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  )
}
