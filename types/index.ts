import { User, Listing, ListingImage, Amenity, AdminAction, Notification, SystemConfig } from '@prisma/client'

// Define types for better type safety
export type UserRole = 'GUEST' | 'USER' | 'ADMIN' | 'SUPER_ADMIN'
export type ListingStatus = 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'ARCHIVED'
export type AdminActionType = 'APPROVE' | 'REJECT' | 'SUSPEND' | 'DELETE'
export type NotificationType = 'listing_approved' | 'listing_rejected' | 'listing_created' | 'admin_action'

export type { User, Listing, ListingImage, Amenity, AdminAction, Notification, SystemConfig }

export interface UserWithListings extends User {
  listings: Listing[]
}

export interface ListingWithDetails extends Listing {
  owner: User
  images: ListingImage[]
  amenities: (ListingAmenity & { amenity: Amenity })[]
  contactViewCount?: number
  _count?: {
    views: number
    inquiries: number
  }
}

export interface ListingAmenity {
  id: string
  listingId: string
  amenityId: string
  amenity: Amenity
}

export interface SearchFilters {
  q?: string // search query
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  bathrooms?: number
  amenities?: string[]
  lat?: number
  lng?: number
  radius?: number // in kilometers, default 10
  page?: number
  limit?: number
  sortBy?: 'relevance' | 'price_asc' | 'price_desc' | 'newest'
}

export interface CreateListingData {
  title: string
  description: string
  priceAmount: number
  currency?: string
  bedrooms: number
  bathrooms: number
  state: string
  city: string
  address?: string
  lat: number
  lng: number
  amenities: string[]
  images: File[]
}

export interface UpdateListingData extends Partial<CreateListingData> {
  id: string
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface NotificationData {
  type: NotificationType
  title: string
  message: string
  userId: string
  listingId?: string
}

export interface LocationData {
  address: string
  lat: number
  lng: number
  state: string
  city: string
}

export interface ImageUploadData {
  file: File
  listingId: string
  isPrimary?: boolean
}

export interface ProximitySearchResult {
  id: string
  title: string
  priceAmount: number
  distance: number // in kilometers
  lat: number
  lng: number
}

export interface AdminDashboardStats {
  totalListings: number
  pendingListings: number
  approvedListings: number
  rejectedListings: number
  totalUsers: number
  newUsersThisMonth: number
}

export interface UserDashboardStats {
  totalListings: number
  approvedListings: number
  pendingListings: number
  rejectedListings: number
  totalViews: number
  unreadNotifications: number
}
