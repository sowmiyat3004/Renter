'use client'

import React from 'react'
import { CircleTickLogo } from '@/components/circle-tick-logo'
import { Broker360Logo } from '@/components/broker360-logo'

export default function LogoDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Broker360 Logo Showcase
          </h1>
          <p className="text-xl text-gray-600">
            High-quality circle with tick mark logo based on your design
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Premium Circle Tick Logo */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Premium Circle Tick Logo
            </h3>
            <div className="flex justify-center mb-4">
              <CircleTickLogo variant="premium" size="xl" showText={true} />
            </div>
            <p className="text-sm text-gray-600">
              High-quality gradient circle with white inner circle and red tick mark
            </p>
          </div>

          {/* Default Circle Tick Logo */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Default Circle Tick Logo
            </h3>
            <div className="flex justify-center mb-4">
              <CircleTickLogo variant="default" size="xl" showText={true} />
            </div>
            <p className="text-sm text-gray-600">
              Clean gradient circle with white inner circle and red tick mark
            </p>
          </div>

          {/* Minimal Circle Tick Logo */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Minimal Circle Tick Logo
            </h3>
            <div className="flex justify-center mb-4">
              <CircleTickLogo variant="minimal" size="xl" showText={true} />
            </div>
            <p className="text-sm text-gray-600">
              Simple red circle with white inner circle and red tick mark
            </p>
          </div>

          {/* Size Variations */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Size Variations
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-4">
                <CircleTickLogo variant="premium" size="sm" showText={false} />
                <span className="text-sm text-gray-600">Small</span>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <CircleTickLogo variant="premium" size="md" showText={false} />
                <span className="text-sm text-gray-600">Medium</span>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <CircleTickLogo variant="premium" size="lg" showText={false} />
                <span className="text-sm text-gray-600">Large</span>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <CircleTickLogo variant="premium" size="xl" showText={false} />
                <span className="text-sm text-gray-600">Extra Large</span>
              </div>
            </div>
          </div>

          {/* Icon Only */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Icon Only
            </h3>
            <div className="flex justify-center mb-4">
              <CircleTickLogo variant="premium" size="xl" showText={false} />
            </div>
            <p className="text-sm text-gray-600">
              Perfect for favicons, app icons, and compact spaces
            </p>
          </div>

          {/* Comparison with Original */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Original vs New
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-4">
                <Broker360Logo variant="default" size="lg" showText={false} />
                <span className="text-sm text-gray-600">Original</span>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <CircleTickLogo variant="premium" size="lg" showText={false} />
                <span className="text-sm text-gray-600">New Circle Tick</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Logo Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">High Quality</h3>
              <p className="text-sm text-gray-600">SVG-based tick mark for crisp rendering at any size</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Responsive</h3>
              <p className="text-sm text-gray-600">Multiple sizes and variants for different use cases</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Fast Loading</h3>
              <p className="text-sm text-gray-600">Optimized SVG graphics for quick loading</p>
            </div>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="mt-8 bg-gray-900 rounded-lg shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">
            How to Use
          </h2>
          <div className="bg-gray-800 rounded-lg p-6">
            <pre className="text-sm overflow-x-auto">
{`import { CircleTickLogo } from '@/components/circle-tick-logo'

// Premium version (recommended)
<CircleTickLogo variant="premium" size="md" showText={true} />

// Minimal version
<CircleTickLogo variant="minimal" size="lg" showText={false} />

// Default version
<CircleTickLogo variant="default" size="xl" showText={true} />`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
