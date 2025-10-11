'use client'

import React from 'react'

interface Broker360LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  className?: string
}

export function Broker360Logo({ 
  size = 'md', 
  showText = true, 
  className = ''
}: Broker360LogoProps) {
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
      {/* B in blue square - perfectly centered */}
      <div className={`${sizeClasses[size]} relative`}>
        <div className="w-full h-full rounded-lg bg-blue-600 flex items-center justify-center">
          <span className="text-white font-bold text-2xl">B</span>
        </div>
      </div>

      {/* Text only if showText is true */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold text-blue-600 ${textSizeClasses[size]} tracking-tight`}>
            Broker360
          </span>
        </div>
      )}
    </div>
  )
}

export default Broker360Logo