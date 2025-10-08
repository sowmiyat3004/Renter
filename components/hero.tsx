'use client'

import { Search, MapPin, Home, Shield } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  return (
    <div className="relative h-[60vh] min-h-[400px] sm:h-[70vh] sm:min-h-[500px] overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800">
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center text-white">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 animate-fade-in">
              Find Your Perfect
              <span className="block text-blue-300">Rental Property</span>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto animate-slide-up px-4">
              Discover verified rental properties, connect with landlords, 
              and find your next home with confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 animate-bounce-gentle px-4">
              <Link
                href="/listings"
                className="btn-primary btn-sm sm:btn-md lg:btn-lg inline-flex items-center justify-center text-sm sm:text-base"
              >
                <Search className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Browse Properties
              </Link>
              <Link
                href="/listings/create"
                className="btn-secondary btn-sm sm:btn-md lg:btn-lg inline-flex items-center justify-center bg-white text-gray-900 hover:bg-gray-100 text-sm sm:text-base"
              >
                <Home className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                List Your Property
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto px-4">
              <div className="flex items-center justify-center space-x-2">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-blue-300" />
                <span className="text-sm sm:text-base lg:text-lg font-medium">Verified Listings</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-blue-300" />
                <span className="text-sm sm:text-base lg:text-lg font-medium">Location-Based Search</span>
              </div>
              <div className="flex items-center justify-center space-x-2 sm:col-span-2 lg:col-span-1">
                <Home className="h-5 w-5 sm:h-6 sm:w-6 text-blue-300" />
                <span className="text-sm sm:text-base lg:text-lg font-medium">Easy Management</span>
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