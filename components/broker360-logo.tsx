'use client'

import React from 'react'

interface Broker360LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  className?: string
}

export function Broker360Logo({ size = 'md', showText = true, className = '' }: Broker360LogoProps) {
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

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Circle with Tick */}
      <div className={`${sizeClasses[size]} relative flex items-center justify-center`}>
        {/* Outer Circle */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-lg"></div>
        
        {/* Inner Circle */}
        <div className="relative w-3/4 h-3/4 rounded-full bg-white flex items-center justify-center">
          {/* Tick Mark */}
          <svg 
            className="w-1/2 h-1/2 text-red-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={3} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        </div>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-full bg-red-300 opacity-20 blur-sm"></div>
      </div>

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

export default Broker360Logo
