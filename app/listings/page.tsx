'use client'

import { Suspense } from 'react'
import { SearchBar } from '@/components/search-bar'
import { ListingCard } from '@/components/listing-card'
import { Filters } from '@/components/filters'
import { Pagination } from '@/components/pagination'
import { MapPin, Filter, Grid, List, Loader2 } from 'lucide-react'
import { ListingWithDetails } from '@/types'
import ListingsContent from './listings-content'

function ListingsPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="h-12 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
          <div className="flex justify-between items-center">
            <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
        </div>
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
      </div>
    </div>
  )
}

export default function ListingsPage() {
  return (
    <Suspense fallback={<ListingsPageSkeleton />}>
      <ListingsContent />
    </Suspense>
  )
}