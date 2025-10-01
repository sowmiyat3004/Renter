import { prisma } from './prisma'
import { NotificationType } from '@/types'

export interface CreateNotificationData {
  type: NotificationType
  title: string
  message: string
  userId: string
  listingId?: string
}

export class NotificationService {
  static async createNotification(data: CreateNotificationData) {
    try {
      const notification = await prisma.notification.create({
        data: {
          type: data.type,
          title: data.title,
          message: data.message,
          userId: data.userId,
          listingId: data.listingId,
        }
      })

      return notification
    } catch (error) {
      console.error('Error creating notification:', error)
      throw error
    }
  }

  static async createListingApprovedNotification(listingId: string, ownerId: string) {
    return this.createNotification({
      type: 'listing_approved',
      title: 'Listing Approved',
      message: 'Your listing has been approved and is now visible to users.',
      userId: ownerId,
      listingId,
    })
  }

  static async createListingRejectedNotification(listingId: string, ownerId: string, reason?: string) {
    return this.createNotification({
      type: 'listing_rejected',
      title: 'Listing Rejected',
      message: reason 
        ? `Your listing was rejected: ${reason}` 
        : 'Your listing was rejected. Please review and resubmit.',
      userId: ownerId,
      listingId,
    })
  }

  static async createListingCreatedNotification(listingId: string, ownerId: string) {
    return this.createNotification({
      type: 'listing_created',
      title: 'Listing Created',
      message: 'Your listing has been created and is pending admin approval.',
      userId: ownerId,
      listingId,
    })
  }

  static async createAdminActionNotification(adminId: string, listingId: string, actionType: string) {
    return this.createNotification({
      type: 'admin_action',
      title: 'Admin Action',
      message: `Admin action performed: ${actionType.toLowerCase()}`,
      userId: adminId,
      listingId,
    })
  }

  static async getUnreadCount(userId: string): Promise<number> {
    try {
      return await prisma.notification.count({
        where: {
          userId,
          isRead: false
        }
      })
    } catch (error) {
      console.error('Error getting unread count:', error)
      return 0
    }
  }

  static async markAllAsRead(userId: string) {
    try {
      await prisma.notification.updateMany({
        where: {
          userId,
          isRead: false
        },
        data: {
          isRead: true
        }
      })
    } catch (error) {
      console.error('Error marking notifications as read:', error)
      throw error
    }
  }
}
