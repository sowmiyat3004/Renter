'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin, Bed, Bath, DollarSign, Heart, Star } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { ListingWithDetails } from '@/types'

interface ListingCardProps {
  listing: ListingWithDetails
  viewMode: 'grid' | 'list'
}

export function ListingCard({ listing, viewMode }: ListingCardProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const toggleFavorite = (listingId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(listingId)) {
        newFavorites.delete(listingId)
      } else {
        newFavorites.add(listingId)
      }
      return newFavorites
    })
  }

  if (viewMode === 'list') {
    return (
      <div className="card group hover:shadow-lg transition-shadow duration-300">
        <div className="flex">
          {/* Image */}
          <div className="relative w-64 h-48 flex-shrink-0">
            {listing.images.length > 0 ? (
              <img
                src={listing.images[0].url}
                alt={listing.title}
                className="w-full h-full object-cover rounded-l-lg group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-l-lg flex items-center justify-center">
                <DollarSign className="h-12 w-12 text-gray-400" />
              </div>
            )}
            
            {/* Favorite Button */}
            <button
              onClick={() => toggleFavorite(listing.id)}
              className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
            >
              <Heart 
                className={`h-4 w-4 ${
                  favorites.has(listing.id) 
                    ? 'text-red-500 fill-current' 
                    : 'text-gray-400'
                }`} 
              />
            </button>

            {/* Price Badge */}
            <div className="absolute top-3 left-3">
              <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {formatPrice(listing.priceAmount)}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {listing.title}
                </h3>
                
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{listing.city}, {listing.state}</span>
                </div>
              </div>
              
              {/* Rating */}
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600 ml-1">4.8</span>
              </div>
            </div>

            <p className="text-gray-600 mb-4 line-clamp-2">
              {listing.description}
            </p>

            {/* Property Details */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-6">
                <div className="flex items-center text-gray-600">
                  <Bed className="h-4 w-4 mr-1" />
                  <span className="text-sm">{listing.bedrooms} bed{listing.bedrooms !== 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Bath className="h-4 w-4 mr-1" />
                  <span className="text-sm">{listing.bathrooms} bath{listing.bathrooms !== 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>

            {/* Amenities */}
            {listing.amenities.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {listing.amenities.slice(0, 4).map((amenity) => (
                    <span
                      key={amenity.id}
                      className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                    >
                      {amenity.amenity.name}
                    </span>
                  ))}
                  {listing.amenities.length > 4 && (
                    <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                      +{listing.amenities.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* View Details Button */}
            <Link
              href={`/listings/${listing.id}`}
              className="btn-primary"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Grid view
  return (
    <div className="card group hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        {listing.images.length > 0 ? (
          <img
            src={listing.images[0].url}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <DollarSign className="h-12 w-12 text-gray-400" />
          </div>
        )}
        
        {/* Favorite Button */}
        <button
          onClick={() => toggleFavorite(listing.id)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
        >
          <Heart 
            className={`h-4 w-4 ${
              favorites.has(listing.id) 
                ? 'text-red-500 fill-current' 
                : 'text-gray-400'
            }`} 
          />
        </button>

        {/* Price Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {formatPrice(listing.priceAmount)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {listing.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {listing.description}
        </p>

        {/* Location */}
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{listing.city}, {listing.state}</span>
        </div>

        {/* Property Details */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-600">
              <Bed className="h-4 w-4 mr-1" />
              <span className="text-sm">{listing.bedrooms}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Bath className="h-4 w-4 mr-1" />
              <span className="text-sm">{listing.bathrooms}</span>
            </div>
          </div>
          
          {/* Rating */}
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">4.8</span>
          </div>
        </div>

        {/* Amenities */}
        {listing.amenities.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {listing.amenities.slice(0, 3).map((amenity) => (
                <span
                  key={amenity.id}
                  className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                >
                  {amenity.amenity.name}
                </span>
              ))}
              {listing.amenities.length > 3 && (
                <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                  +{listing.amenities.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* View Details Button */}
        <Link
          href={`/listings/${listing.id}`}
          className="btn-primary w-full text-center"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}
