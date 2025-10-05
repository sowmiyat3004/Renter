'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createListingSchema } from '@/lib/validations'
import { toast } from 'react-hot-toast'
import { ArrowLeft, Upload, X, MapPin, Home, Bed, Bath } from 'lucide-react'
import Link from 'next/link'
import { EnhancedLocationSelector } from '@/components/enhanced-location-selector'
import { PriceInput } from '@/components/price-input'

interface Amenity {
  id: string
  name: string
}

export default function CreateListingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  const [amenities, setAmenities] = useState<Amenity[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(createListingSchema),
  })

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/auth/signin')
      return
    }

    fetchAmenities()
  }, [session, status, router])

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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    
    // Validate file size (1MB max)
    const validFiles = files.filter(file => {
      if (file.size > 1024 * 1024) {
        toast.error(`${file.name} is too large. Maximum size is 1MB.`)
        return false
      }
      return true
    })

    setUploadedImages(prev => [...prev, ...validFiles])
  }

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleAmenityToggle = (amenityId: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenityId)
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    )
  }

  const onSubmit = async (data: any) => {
    if (uploadedImages.length === 0) {
      toast.error('Please upload at least one image')
      return
    }

    setIsLoading(true)
    
    try {
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('description', data.description)
      formData.append('priceAmount', data.priceAmount.toString())
      formData.append('bedrooms', data.bedrooms.toString())
      formData.append('bathrooms', data.bathrooms.toString())
      formData.append('state', data.state)
      formData.append('city', data.city)
      formData.append('lat', data.lat.toString())
      formData.append('lng', data.lng.toString())
      formData.append('amenities', JSON.stringify(selectedAmenities))
      
      uploadedImages.forEach((image, index) => {
        formData.append(`images`, image)
      })

      const response = await fetch('/api/listings', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        toast.success('Listing created successfully! It will be reviewed by our admin team.')
        router.push('/dashboard')
      } else {
        toast.error(result.error || 'Failed to create listing')
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="spinner h-8 w-8" />
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
          <h1 className="text-3xl font-bold text-gray-900">Create New Listing</h1>
          <p className="text-gray-600">Fill in the details below to list your property</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Title *
                </label>
                <input
                  {...register('title')}
                  type="text"
                  className={`input ${errors.title ? 'input-error' : ''}`}
                  placeholder="e.g., Beautiful 2-bedroom apartment in downtown"
                />
                {errors.title && (
                  <p className="form-error">{String(errors.title.message)}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  {...register('description')}
                  rows={4}
                  className={`input ${errors.description ? 'input-error' : ''}`}
                  placeholder="Describe your property, its features, and what makes it special..."
                />
                {errors.description && (
                  <p className="form-error">{String(errors.description.message)}</p>
                )}
              </div>

              <PriceInput
                label="Monthly Rent *"
                value={watch('priceAmount')}
                onChange={(value) => setValue('priceAmount', value || 0)}
                placeholder="0"
                required
              />
              {errors.priceAmount && (
                <p className="form-error">{String(errors.priceAmount.message)}</p>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bedrooms *
                </label>
                <div className="relative">
                  <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    {...register('bedrooms', { valueAsNumber: true })}
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
                    {...register('bathrooms', { valueAsNumber: true })}
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

          {/* Amenities */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Amenities</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {amenities.map((amenity) => (
                <label key={amenity.id} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    value={amenity.id}
                    checked={selectedAmenities.includes(amenity.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedAmenities([...selectedAmenities, amenity.id])
                      } else {
                        setSelectedAmenities(selectedAmenities.filter(id => id !== amenity.id))
                      }
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{amenity.name}</span>
                </label>
              ))}
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
                  }
                }}
                placeholder="Search for city, district, or state"
                className="w-full"
              />
              {(errors.city || errors.state) && (
                <p className="form-error">Please select a valid location</p>
              )}

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address (Optional)
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter full address for better location accuracy"
                />
                <p className="text-sm text-gray-500 mt-1">
                  This will help renters find your property more easily
                </p>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Property Photos</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Images * (Max 1MB each)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <div className="text-sm text-gray-600 mb-2">
                  Drag and drop images here, or click to select
                </div>
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
                  className="btn-secondary cursor-pointer"
                >
                  Choose Images
                </label>
              </div>
            </div>

            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Amenities</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {amenities.map((amenity) => (
                <label
                  key={amenity.id}
                  className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-3 rounded-lg border border-gray-200"
                >
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity.id)}
                    onChange={() => handleAmenityToggle(amenity.id)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{amenity.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <Link
              href="/dashboard"
              className="btn-secondary"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary"
            >
              {isLoading ? (
                <>
                  <div className="spinner h-4 w-4 mr-2" />
                  Creating Listing...
                </>
              ) : (
                'Create Listing'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
