import { NextRequest, NextResponse } from 'next/server'
import { googleMapsService } from '@/lib/google-maps-complete'

export const dynamic = 'force-dynamic'

// GET /api/maps/autocomplete?input=koramangala
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const input = searchParams.get('input')
    const country = searchParams.get('country') || 'in'

    if (!input || input.length < 2) {
      return NextResponse.json({
        success: false,
        error: 'Input must be at least 2 characters'
      }, { status: 400 })
    }

    const predictions = await googleMapsService.searchPlaces(input, country)

    return NextResponse.json({
      success: true,
      data: predictions,
      count: predictions.length
    })
  } catch (error) {
    console.error('Autocomplete error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get suggestions'
    }, { status: 500 })
  }
}

