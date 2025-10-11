'use client'

import { useState } from 'react'
import { GoogleLocationSelector } from '@/components/google-location-selector'

export default function TestLocationsPage() {
  const [selectedLocation, setSelectedLocation] = useState<any>(null)
  const [testResults, setTestResults] = useState<any[]>([])
  const [isTestMode, setIsTestMode] = useState(false)

  const testLocations = [
    'Mumbai',
    'Koramangala',
    'Whitefield',
    'Jigani',
    'Bommasandra',
    'Palakkad',
    'Kuthampully',
    'Electronic City',
    'HSR Layout',
    'Indiranagar',
    'MG Road Bangalore',
    'Connaught Place Delhi',
    'Bandra Mumbai',
    'T Nagar Chennai',
    'Jubilee Hills Hyderabad'
  ]

  const runTests = async () => {
    setIsTestMode(true)
    const results = []

    for (const location of testLocations) {
      try {
        const response = await fetch(`/api/google-places?q=${encodeURIComponent(location)}`)
        const data = await response.json()
        
        results.push({
          query: location,
          found: data.success && data.data.length > 0,
          count: data.data?.length || 0,
          results: data.data?.slice(0, 3) || []
        })
      } catch (error) {
        results.push({
          query: location,
          found: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }

    setTestResults(results)
    setIsTestMode(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Test All India Locations
        </h1>

        {/* Location Selector Test */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Try Searching Any Location</h2>
          <p className="text-sm text-gray-600 mb-4">
            Type any city, locality, area, or landmark in India:
          </p>
          
          <GoogleLocationSelector
            label="Search Location"
            value={selectedLocation}
            onChange={(location) => {
              setSelectedLocation(location)
              console.log('Selected:', location)
            }}
            placeholder="Type: Mumbai, Koramangala, Jigani, Whitefield, etc."
          />

          {selectedLocation && (
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Selected Location:</h3>
              <pre className="text-sm text-green-800 overflow-auto">
                {JSON.stringify(selectedLocation, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* API Test */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Test Multiple Locations</h2>
          <p className="text-sm text-gray-600 mb-4">
            This will test {testLocations.length} different locations to verify coverage:
          </p>

          <button
            onClick={runTests}
            disabled={isTestMode}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 mb-4"
          >
            {isTestMode ? 'Testing...' : 'Run Tests'}
          </button>

          {testResults.length > 0 && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">
                  Results: {testResults.filter(r => r.found).length} / {testResults.length} found
                </h3>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  testResults.filter(r => r.found).length === testResults.length
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {Math.round((testResults.filter(r => r.found).length / testResults.length) * 100)}% Coverage
                </span>
              </div>

              {testResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    result.found
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{result.query}</span>
                      <span className="ml-2 text-sm text-gray-600">
                        {result.found ? `(${result.count} results)` : '(Not found)'}
                      </span>
                    </div>
                    <span className={`text-lg ${result.found ? 'text-green-600' : 'text-red-600'}`}>
                      {result.found ? '✓' : '✗'}
                    </span>
                  </div>

                  {result.found && result.results.length > 0 && (
                    <div className="mt-2 text-sm text-gray-700">
                      <div className="font-medium mb-1">Sample results:</div>
                      {result.results.map((loc: any, idx: number) => (
                        <div key={idx} className="ml-4 text-xs">
                          • {loc.formatted_address || loc.name}
                        </div>
                      ))}
                    </div>
                  )}

                  {result.error && (
                    <div className="mt-2 text-sm text-red-600">
                      Error: {result.error}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Examples */}
        <div className="bg-blue-50 rounded-lg p-6 mt-8">
          <h3 className="font-semibold text-blue-900 mb-2">Try These Searches:</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            {testLocations.map((loc) => (
              <div key={loc} className="text-blue-800">• {loc}</div>
            ))}
          </div>
        </div>

        {/* API Status */}
        <div className="bg-gray-100 rounded-lg p-6 mt-8">
          <h3 className="font-semibold mb-2">How It Works:</h3>
          <ol className="text-sm text-gray-700 space-y-2">
            <li>1. <strong>Google Places API</strong> - Searches all locations in India</li>
            <li>2. <strong>Autocomplete</strong> - Shows suggestions as you type</li>
            <li>3. <strong>Place Details</strong> - Gets full info (lat/lng, address components)</li>
            <li>4. <strong>Fallback</strong> - Uses static database if API fails</li>
          </ol>

          <div className="mt-4 p-3 bg-white rounded border border-gray-200">
            <div className="text-xs text-gray-600">
              <div>API Endpoint: <code className="bg-gray-100 px-2 py-1 rounded">/api/google-places</code></div>
              <div className="mt-1">Coverage: <strong>All of India</strong> (Cities, Localities, Areas, Landmarks)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

