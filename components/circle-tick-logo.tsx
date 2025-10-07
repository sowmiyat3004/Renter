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
            <div className="w-full h-full rounded-full bg-red-500 flex items-center justify-center">
              <div className="w-3/4 h-3/4 rounded-full bg-white flex items-center justify-center">
                <svg 
                  className="w-1/2 h-1/2 text-red-500" 
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
            {/* Outer glow effect */}
            <div className="absolute inset-0 rounded-full bg-red-300 opacity-30 blur-sm"></div>
            
            {/* Main circle with gradient */}
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-red-500 via-red-600 to-red-700 shadow-xl flex items-center justify-center">
              {/* Inner white circle */}
              <div className="w-4/5 h-4/5 rounded-full bg-white flex items-center justify-center shadow-inner">
                {/* Tick mark */}
                <svg 
                  className="w-1/2 h-1/2 text-red-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
              
              {/* Subtle inner shadow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-transparent to-red-800 opacity-20"></div>
            </div>
          </div>
        )
      
      default:
        return (
          <div className={`${sizeClasses[size]} relative flex items-center justify-center`}>
            <div className="w-full h-full rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-lg flex items-center justify-center">
              <div className="w-3/4 h-3/4 rounded-full bg-white flex items-center justify-center">
                <svg 
                  className="w-1/2 h-1/2 text-red-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  strokeWidth={3}
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
    }
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {renderLogo()}

      {/* Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold text-gray-900 ${textSizeClasses[size]}`}>
            Broker360
          </span>
          <span className={`text-red-600 font-medium ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
            Property Solutions
          </span>
        </div>
      )}
    </div>
  )
}

export default CircleTickLogo
