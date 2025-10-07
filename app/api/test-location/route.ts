import { NextRequest, NextResponse } from 'next/server'
import { googlePlacesService } from '@/lib/google-places'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || 'Bangalore'
    
    console.log('Testing location service with query:', query)
    
    const results = await googlePlacesService.searchPlaces(query, 'IN')
    
    return NextResponse.json({
      success: true,
      query,
      results,
      count: results.length,
      message: 'Location service is working'
    })
  } catch (error) {
    console.error('Location service test error:', error)
    return NextResponse.json({
      success: false,
      error: 'Location service test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
