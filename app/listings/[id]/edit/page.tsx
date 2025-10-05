'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { ArrowLeft, Upload, X, MapPin, Home, Bed, Bath } from 'lucide-react'
import { EnhancedLocationSelector } from '@/components/enhanced-location-selector'

interface Amenity {
  id: string
  name: string
  icon?: string
}

interface Listing {
  id: string
  title: string
  description: string
  priceAmount: number
  bedrooms: number
  bathrooms: number
  state: string
  district?: string
  city: string
  locality?: string
  address?: string
  lat: number
  lng: number
  status: string
  amenities: {
    amenity: Amenity
  }[]
}

export default function EditListingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const listingId = params.id as string

  const [listing, setListing] = useState<Listing | null>(null)
  const [amenities, setAmenities] = useState<Amenity[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  const [existingImages, setExistingImages] = useState<any[]>([])
  const [isUploadingImages, setIsUploadingImages] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push('/auth/signin')
      return
    }

    fetchListing()
    fetchAmenities()
  }, [session, status, router, listingId])

  const fetchListing = async () => {
    try {
      const response = await fetch(`/api/listings/${listingId}`)
      const data = await response.json()

      if (data.success) {
        const listingData = data.data
        setListing(listingData)
        
        // Set form values
        setValue('title', listingData.title)
        setValue('description', listingData.description)
        setValue('priceAmount', listingData.priceAmount)
        setValue('bedrooms', listingData.bedrooms)
        setValue('bathrooms', listingData.bathrooms)
        setValue('state', listingData.state)
        setValue('district', listingData.district || '')
        setValue('city', listingData.city)
        setValue('locality', listingData.locality || '')
        setValue('address', listingData.address || '')
        setValue('lat', listingData.lat)
        setValue('lng', listingData.lng)
        
        // Set selected amenities
        const amenityIds = listingData.amenities.map((a: any) => a.amenity.id)
        setSelectedAmenities(amenityIds)
        
        // Set existing images
        setExistingImages(listingData.images || [])
      } else {
        toast.error('Failed to load listing')
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Error fetching listing:', error)
      toast.error('Failed to load listing')
      router.push('/dashboard')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAmenities = async () => {
    try {
      const response = await fetch('/api/amenities')
      const data = await response.json()
      
      if (data.success) {
        setAmenities(data.data)
      }
    } catch (error) {
      console.error('Error fetching amenities:', error)
    }
  }

  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenityId)
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    )
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setUploadedImages(prev => [...prev, ...files])
  }

  const removeUploadedImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index))
  }

  const removeExistingImage = async (imageId: string) => {
    try {
      const response = await fetch(`/api/listings/${listingId}/images/${imageId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setExistingImages(prev => prev.filter(img => img.id !== imageId))
        toast.success('Image removed successfully')
      } else {
        toast.error('Failed to remove image')
      }
    } catch (error) {
      console.error('Error removing image:', error)
      toast.error('Failed to remove image')
    }
  }

  const uploadNewImages = async () => {
    if (uploadedImages.length === 0) return

    setIsUploadingImages(true)
    try {
      const imageFormData = new FormData()
      uploadedImages.forEach((image) => {
        imageFormData.append('images', image)
      })

      const response = await fetch(`/api/listings/${listingId}/images`, {
        method: 'POST',
        body: imageFormData,
      })

      const result = await response.json()
      if (result.success) {
        setExistingImages(prev => [...prev, ...result.data])
        setUploadedImages([])
        toast.success('Images uploaded successfully')
      } else {
        toast.error(result.error || 'Failed to upload images')
      }
    } catch (error) {
      console.error('Error uploading images:', error)
      toast.error('Failed to upload images')
    } finally {
      setIsUploadingImages(false)
    }
  }

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    
    try {
      const listingData = {
        title: data.title,
        description: data.description,
        priceAmount: data.priceAmount,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        state: data.state,
        district: data.district || '',
        city: data.city,
        locality: data.locality || '',
        address: data.address || '',
        lat: data.lat,
        lng: data.lng,
        amenities: selectedAmenities
      }

      console.log('Updating listing data:', listingData)
      console.log('Listing ID:', listingId)

      const response = await fetch(`/api/listings/${listingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listingData),
      })

      console.log('Response status:', response.status)
      const result = await response.json()
      console.log('API response:', result)

      if (result.success) {
        toast.success('Listing updated successfully!')
        router.push('/dashboard')
      } else {
        console.error('Listing update failed:', result.error)
        toast.error(result.error || 'Failed to update listing')
      }
    } catch (error) {
      console.error('Listing update error:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">Loading listing...</p>
        </div>
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Listing Not Found</h1>
          <p className="text-gray-600 mb-8">The listing you're looking for doesn't exist or you don't have permission to edit it.</p>
          <Link
            href="/dashboard"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Edit Listing</h1>
          <p className="mt-2 text-gray-600">Update your property listing</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Title *
                </label>
                <input
                  {...register('title', { required: 'Title is required' })}
                  type="text"
                  className={`input ${errors.title ? 'input-error' : ''}`}
                  placeholder="e.g., Beautiful 2BHK Apartment in Downtown"
                />
                {errors.title && (
                  <p className="form-error">{String(errors.title.message)}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  {...register('description', { required: 'Description is required' })}
                  rows={4}
                  className={`input ${errors.description ? 'input-error' : ''}`}
                  placeholder="Describe your property in detail..."
                />
                {errors.description && (
                  <p className="form-error">{String(errors.description.message)}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Rent (₹) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">₹</span>
                  <input
                    {...register('priceAmount', { 
                      required: 'Price is required',
                      valueAsNumber: true,
                      min: { value: 0, message: 'Price must be positive' }
                    })}
                    type="number"
                    className={`input pl-8 ${errors.priceAmount ? 'input-error' : ''}`}
                    placeholder="15000"
                  />
                </div>
                {errors.priceAmount && (
                  <p className="form-error">{String(errors.priceAmount.message)}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bedrooms *
                  </label>
                  <div className="relative">
                    <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      {...register('bedrooms', { required: 'Bedrooms is required', valueAsNumber: true })}
                      className={`input pl-10 ${errors.bedrooms ? 'input-error' : ''}`}
                    >
                      <option value="">Select bedrooms</option>
                      <option value={0}>Studio</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5+</option>
                    </select>
                  </div>
                  {errors.bedrooms && (
                    <p className="form-error">{String(errors.bedrooms.message)}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bathrooms *
                  </label>
                  <div className="relative">
                    <Bath className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      {...register('bathrooms', { required: 'Bathrooms is required', valueAsNumber: true })}
                      className={`input pl-10 ${errors.bathrooms ? 'input-error' : ''}`}
                    >
                      <option value="">Select bathrooms</option>
                      <option value={1}>1</option>
                      <option value={1.5}>1.5</option>
                      <option value={2}>2</option>
                      <option value={2.5}>2.5</option>
                      <option value={3}>3</option>
                      <option value={3.5}>3.5</option>
                      <option value={4}>4+</option>
                    </select>
                  </div>
                  {errors.bathrooms && (
                    <p className="form-error">{String(errors.bathrooms.message)}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Amenities</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {amenities.map((amenity) => (
                <label key={amenity.id} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity.id)}
                    onChange={() => toggleAmenity(amenity.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{amenity.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Property Images</h2>
            
            {/* Existing Images */}
            {existingImages.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Current Images</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {existingImages.map((image, index) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.url}
                        alt={`Property image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(image.id)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload New Images */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4">Add New Images</h3>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                >
                  <Upload className="h-8 w-8 text-gray-400" />
                  <span className="text-sm text-gray-600">Click to upload images</span>
                  <span className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</span>
                </label>
              </div>

              {/* Uploaded Images Preview */}
              {uploadedImages.length > 0 && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {uploadedImages.length} image(s) ready to upload
                    </span>
                    <button
                      type="button"
                      onClick={uploadNewImages}
                      disabled={isUploadingImages}
                      className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 disabled:opacity-50"
                    >
                      {isUploadingImages ? 'Uploading...' : 'Upload Images'}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {uploadedImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeUploadedImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Location</h2>
            
            <div className="space-y-6">
              <EnhancedLocationSelector
                label="Location *"
                value={watch('location')}
                onChange={(location) => {
                  if (location) {
                    setValue('city', location.name)
                    setValue('state', location.state)
                    setValue('lat', location.lat || 0)
                    setValue('lng', location.lng || 0)
                    setValue('district', location.district || '')
                    setValue('locality', location.locality || '')
                  }
                }}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Address
                </label>
                <textarea
                  {...register('address')}
                  rows={2}
                  className="input"
                  placeholder="Enter complete address..."
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Link
              href="/dashboard"
              className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Updating...' : 'Update Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
