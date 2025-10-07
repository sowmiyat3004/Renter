'use client'

import React from 'react'
import { Broker360Logo } from './broker360-logo'

// Example usage of different logo variants
export function LogoExamples() {
  return (
    <div className="space-y-8 p-8">
      <h2 className="text-2xl font-bold mb-4">Logo Examples</h2>
      
      {/* Default Logo */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Default Logo (with tick mark)</h3>
        <Broker360Logo variant="default" size="lg" />
      </div>

      {/* Minimal Logo */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Minimal Logo (B in circle)</h3>
        <Broker360Logo variant="minimal" size="lg" />
      </div>

      {/* Professional Logo */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Professional Logo (nested circles)</h3>
        <Broker360Logo variant="professional" size="lg" />
      </div>

      {/* Custom Logo with House Icon */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Custom Logo (House Icon)</h3>
        <Broker360Logo 
          variant="custom" 
          size="lg"
          customIcon={
            <div className="w-full h-full rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-white text-2xl">🏠</span>
            </div>
          }
        />
      </div>

      {/* Custom Logo with Building Icon */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Custom Logo (Building Icon)</h3>
        <Broker360Logo 
          variant="custom" 
          size="lg"
          customIcon={
            <div className="w-full h-full rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-white text-2xl">🏢</span>
            </div>
          }
        />
      </div>

      {/* Custom Logo with Key Icon */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Custom Logo (Key Icon)</h3>
        <Broker360Logo 
          variant="custom" 
          size="lg"
          customIcon={
            <div className="w-full h-full rounded-full bg-purple-500 flex items-center justify-center">
              <span className="text-white text-2xl">🔑</span>
            </div>
          }
        />
      </div>

      {/* Custom Logo with SVG Icon */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Custom Logo (SVG Icon)</h3>
        <Broker360Logo 
          variant="custom" 
          size="lg"
          customIcon={
            <div className="w-full h-full rounded-full bg-orange-500 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
          }
        />
      </div>
    </div>
  )
}

export default LogoExamples
