'use client'

import { Search, MapPin, Home, Shield } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  return (
    <div className="relative h-[70vh] min-h-[500px] overflow-hidden bg-gradient-to-r from-primary-600 to-primary-800">
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Find Your Perfect
              <span className="block text-primary-400">Rental Property</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-slide-up">
              Discover verified rental properties, connect with landlords, 
              and find your next home with confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-bounce-gentle">
              <Link
                href="/listings"
                className="btn-primary btn-lg inline-flex items-center"
              >
                <Search className="h-5 w-5 mr-2" />
                Browse Properties
              </Link>
              <Link
                href="/listings/create"
                className="btn-secondary btn-lg inline-flex items-center bg-white text-gray-900 hover:bg-gray-100"
              >
                <Home className="h-5 w-5 mr-2" />
                List Your Property
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-2">
                <Shield className="h-6 w-6 text-primary-400" />
                <span className="text-lg font-medium">Verified Listings</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <MapPin className="h-6 w-6 text-primary-400" />
                <span className="text-lg font-medium">Location-Based Search</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Home className="h-6 w-6 text-primary-400" />
                <span className="text-lg font-medium">Easy Management</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}