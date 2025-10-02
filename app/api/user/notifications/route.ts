import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/user/notifications - Get user notification settings
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user notification settings from system config or user preferences
    const notificationSettings = await prisma.systemConfig.findMany({
      where: {
        key: {
          in: [
            'user_email_notifications',
            'user_sms_notifications', 
            'user_listing_updates',
            'user_new_messages',
            'user_admin_alerts'
          ]
        }
      }
    })

    // Convert to object format
    const settings = {
      emailNotifications: notificationSettings.find(s => s.key === 'user_email_notifications')?.value === 'true' || false,
      smsNotifications: notificationSettings.find(s => s.key === 'user_sms_notifications')?.value === 'true' || false,
      listingUpdates: notificationSettings.find(s => s.key === 'user_listing_updates')?.value === 'true' || false,
      newMessages: notificationSettings.find(s => s.key === 'user_new_messages')?.value === 'true' || false,
      adminAlerts: notificationSettings.find(s => s.key === 'user_admin_alerts')?.value === 'true' || false,
    }

    return NextResponse.json({
      success: true,
      data: settings
    })

  } catch (error) {
    console.error('Get notification settings error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch notification settings' },
      { status: 500 }
    )
  }
}

// PUT /api/user/notifications - Update user notification settings
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { 
      emailNotifications, 
      smsNotifications, 
      listingUpdates, 
      newMessages, 
      adminAlerts 
    } = body

    // Update notification settings in system config
    const settings = [
      { key: 'user_email_notifications', value: emailNotifications ? 'true' : 'false' },
      { key: 'user_sms_notifications', value: smsNotifications ? 'true' : 'false' },
      { key: 'user_listing_updates', value: listingUpdates ? 'true' : 'false' },
      { key: 'user_new_messages', value: newMessages ? 'true' : 'false' },
      { key: 'user_admin_alerts', value: adminAlerts ? 'true' : 'false' },
    ]

    // Use upsert to create or update each setting
    await Promise.all(
      settings.map(setting =>
        prisma.systemConfig.upsert({
          where: { key: setting.key },
          update: { value: setting.value },
          create: { key: setting.key, value: setting.value }
        })
      )
    )

    return NextResponse.json({
      success: true,
      message: 'Notification settings updated successfully'
    })

  } catch (error) {
    console.error('Update notification settings error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update notification settings' },
      { status: 500 }
    )
  }
}
