'use client'

import React from 'react'

interface CircleTickLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  className?: string
  variant?: 'default' | 'premium' | 'minimal'
}

export function CircleTickLogo({ 
  size = 'md', 
  showText = true, 
  className = '',
  variant = 'premium'
}: CircleTickLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl'
  }

  const renderLogo = () => {
    switch (variant) {
      case 'minimal':
        return (
          <div className={`${sizeClasses[size]} relative flex items-center justify-center`}>
            <div className="w-full h-full rounded-full bg-blue-500 flex items-center justify-center">
              <div className="w-3/4 h-3/4 rounded-full bg-white flex items-center justify-center">
                <svg 
                  className="w-1/2 h-1/2 text-blue-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
            </div>
          </div>
        )
      
      case 'premium':
        return (
          <div className={`${sizeClasses[size]} relative flex items-center justify-center`}>
            {/* Main blue circle - thick outer ring (exact match to image but blue) */}
            <div className="relative w-full h-full rounded-full bg-blue-600 shadow-lg flex items-center justify-center">
              {/* Inner white circle - checkmark should fill most of the space */}
              <div className="w-4/5 h-4/5 rounded-full bg-white flex items-center justify-center">
                {/* Very bold blue checkmark that fills the white circle (exact match to image but blue) */}
                <svg 
                  className="w-5/6 h-5/6 text-blue-600" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" 
                  />
                </svg>
              </div>
            </div>
          </div>
        )
      
      default:
        return (
          <div className={`${sizeClasses[size]} relative flex items-center justify-center`}>
            <div className="w-full h-full rounded-full bg-blue-600 shadow-lg flex items-center justify-center">
              <div className="w-4/5 h-4/5 rounded-full bg-white flex items-center justify-center">
                <svg 
                  className="w-5/6 h-5/6 text-blue-600" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" 
                  />
                </svg>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {renderLogo()}

            {/* Text */}
            {showText && (
              <div className="flex flex-col">
                <span className={`font-bold text-gray-900 ${textSizeClasses[size]} tracking-tight`}>
                  Broker 360
                </span>
              </div>
            )}
    </div>
  )
}

export default CircleTickLogo
