import { z } from 'zod'

export const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const createListingSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  priceAmount: z.number().min(0, 'Price must be positive'),
  bedrooms: z.number().min(0, 'Bedrooms must be 0 or more'),
  bathrooms: z.number().min(0, 'Bathrooms must be 0 or more'),
  state: z.string().min(1, 'State is required'),
  district: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  locality: z.string().optional(),
  address: z.string().optional(),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  // New fields
  rentType: z.enum(['HOME', 'PG', 'ROOM_SHARING']).optional(),
  propertyType: z.string().optional(),
  furnishing: z.string().optional(),
  postedBy: z.string().optional(),
  floorNumber: z.string().optional(),
  availableFrom: z.string().optional(),
  direction: z.string().optional(),
  sharingType: z.string().optional(),
  acRoom: z.union([z.boolean(), z.string()]).optional(),
  gender: z.string().optional(),
  bhk: z.string().optional(),
  comments: z.string().optional(),
  amenities: z.array(z.string()).optional(),
})

export const updateListingSchema = createListingSchema.partial().extend({
  id: z.string(),
})

export const searchFiltersSchema = z.object({
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  bedrooms: z.number().optional(),
  bathrooms: z.number().optional(),
  amenities: z.array(z.string()).optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  radius: z.number().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(50).default(12),
})

export const adminActionSchema = z.object({
  listingId: z.string(),
  actionType: z.enum(['APPROVE', 'REJECT', 'SUSPEND', 'DELETE']),
  reason: z.string().optional(),
})

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  listingId: z.string(),
})
