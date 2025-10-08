import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    return NextResponse.json({
      success: true,
      message: 'API is working',
      session: session ? 'authenticated' : 'not authenticated',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Test API error:', error)
    return NextResponse.json(
      { success: false, error: 'Test API failed' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    
    return NextResponse.json({
      success: true,
      message: 'Test POST is working',
      receivedData: body,
      session: session.user,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Test POST error:', error)
    return NextResponse.json(
      { success: false, error: 'Test POST failed' },
      { status: 500 }
    )
  }
}
