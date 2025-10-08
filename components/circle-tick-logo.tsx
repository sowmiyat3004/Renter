'use client'

import React from 'react'
import Image from 'next/image'

interface CircleTickLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  className?: string
}

export function CircleTickLogo({
  size = 'md',
  showText = true,
  className = ''
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

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Image */}
      <div className={`${sizeClasses[size]} relative`}>
        <Image
          src="/logo.svg"
          alt="Broker360 Logo"
          width={48}
          height={48}
          className="w-full h-full"
          priority
        />
      </div>

      {/* Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold text-gray-900 ${textSizeClasses[size]} tracking-tight`}>
            Broker360
          </span>
        </div>
      )}
    </div>
  )
}

export default CircleTickLogo