import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Basic health check
    const health = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: {
        nodeEnv: process.env.NODE_ENV,
        databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not set',
        nextauthUrl: process.env.NEXTAUTH_URL ? 'Set' : 'Not set',
        googleClientId: process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Not set',
        googlePlacesApiKey: process.env.GOOGLE_PLACES_API_KEY ? 'Set' : 'Not set'
      },
      build: {
        version: process.env.npm_package_version || 'unknown',
        buildTime: process.env.BUILD_TIME || 'unknown'
      }
    }

    return NextResponse.json(health)
  } catch (error) {
    console.error('Debug endpoint error:', error)
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
