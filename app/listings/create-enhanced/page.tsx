'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import { ArrowLeft, Upload, X, MapPin, Home, Bed, Bath, Calendar, Users, Building } from 'lucide-react'
import { EnhancedLocationSelector } from '@/components/enhanced-location-selector'

interface Amenity {
  id: string
  name: string
}

interface CreateListingForm {
  title: string
  description: string
  priceAmount: number
  bedrooms: number
  bathrooms: number
  state: string
  district: string
  city: string
  locality: string
  address: string
  lat: number
  lng: number
  rentType: 'HOME' | 'PG' | 'ROOM_SHARING'
  propertyType?: string
  furnishing?: string
  postedBy?: string
  floorNumber?: string
  availableFrom?: string
  sharingType?: string
  acRoom?: boolean
  gender?: string
  bhk?: string
  comments?: string
  amenities: string[]
}

export default function CreateListingEnhancedPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [amenities, setAmenities] = useState<Amenity[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<File[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateListingForm>({
    defaultValues: {
      title: '',
      description: '',
      priceAmount: 0,
      bedrooms: 0,
      bathrooms: 0,
      state: '',
      district: '',
      city: '',
      locality: '',
      address: '',
      lat: 0,
      lng: 0,
      rentType: 'HOME',
      amenities: [],
    },
  })

  const rentType = watch('rentType')

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

  const onSubmit = async (data: CreateListingForm) => {
    if (uploadedImages.length === 0) {
      toast.error('Please upload at least one image')
      return
    }

    setIsLoading(true)
    
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
        rentType: data.rentType,
        propertyType: data.propertyType,
        furnishing: data.furnishing,
        postedBy: data.postedBy,
        floorNumber: data.floorNumber,
        availableFrom: data.availableFrom,
        sharingType: data.sharingType,
        acRoom: data.acRoom,
        gender: data.gender,
        bhk: data.bhk,
        comments: data.comments,
        amenities: selectedAmenities
      }

      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listingData),
      })

      const result = await response.json()

      if (result.success) {
        // Upload images after listing creation
        if (uploadedImages.length > 0) {
          try {
            const imageFormData = new FormData()
            uploadedImages.forEach((image, index) => {
              imageFormData.append('images', image)
            })

            const imageResponse = await fetch(`/api/listings/${result.data.id}/images`, {
              method: 'POST',
              body: imageFormData,
            })

            const imageResult = await imageResponse.json()
            if (!imageResult.success) {
              console.error('Image upload failed:', imageResult.error)
              toast.error('Listing created but image upload failed')
            }
          } catch (imageError) {
            console.error('Image upload error:', imageError)
            toast.error('Listing created but image upload failed')
          }
        }

        toast.success('Listing created successfully! It will be reviewed by our admin team.')
        router.push('/dashboard')
      } else {
        toast.error(result.error || 'Failed to create listing')
      }
    } catch (error) {
      console.error('Listing creation error:', error)
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
          <p className="mt-2 text-sm text-gray-600">
            Fill out the details below to list your property. All listings are subject to admin approval.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Rent Type Selection */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Rent Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  value="HOME"
                  {...register('rentType')}
                  className="h-4 w-4 text-red-600 focus:ring-red-500"
                />
                <div className="ml-3">
                  <div className="flex items-center">
                    <Home className="h-5 w-5 text-red-600 mr-2" />
                    <span className="font-medium">Home</span>
                  </div>
                  <p className="text-sm text-gray-500">House, Apartment, Villa</p>
                </div>
              </label>

              <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  value="PG"
                  {...register('rentType')}
                  className="h-4 w-4 text-red-600 focus:ring-red-500"
                />
                <div className="ml-3">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-red-600 mr-2" />
                    <span className="font-medium">PG</span>
                  </div>
                  <p className="text-sm text-gray-500">Paying Guest</p>
                </div>
              </label>

              <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  value="ROOM_SHARING"
                  {...register('rentType')}
                  className="h-4 w-4 text-red-600 focus:ring-red-500"
                />
                <div className="ml-3">
                  <div className="flex items-center">
                    <Building className="h-5 w-5 text-red-600 mr-2" />
                    <span className="font-medium">Room Sharing</span>
                  </div>
                  <p className="text-sm text-gray-500">Shared Room</p>
                </div>
              </label>
            </div>
          </div>

          {/* Property Details */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Property Details</h2>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  {...register('title', { required: 'Title is required' })}
                  className={`input ${errors.title ? 'input-error' : ''}`}
                  placeholder="e.g., Spacious 2BHK Apartment in City Center"
                />
                {errors.title && (
                  <p className="form-error">{String(errors.title.message)}</p>
                )}
              </div>

              <div>
                <label htmlFor="priceAmount" className="block text-sm font-medium text-gray-700 mb-2">
                  Rent Price (INR) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">₹</span>
                  <input
                    type="number"
                    id="priceAmount"
                    {...register('priceAmount', { required: 'Price is required', valueAsNumber: true })}
                    className={`input pl-8 ${errors.priceAmount ? 'input-error' : ''}`}
                    placeholder="e.g., 25000"
                  />
                </div>
                {errors.priceAmount && (
                  <p className="form-error">{String(errors.priceAmount.message)}</p>
                )}
              </div>

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

            <div className="mt-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                {...register('description', { required: 'Description is required' })}
                rows={5}
                className={`input ${errors.description ? 'input-error' : ''}`}
                placeholder="Provide a detailed description of your property..."
              ></textarea>
              {errors.description && (
                <p className="form-error">{String(errors.description.message)}</p>
              )}
            </div>
          </div>

          {/* Home-specific filters */}
          {rentType === 'HOME' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Home Details</h2>
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type
                  </label>
                  <select {...register('propertyType')} className="input">
                    <option value="">Select property type</option>
                    <option value="FLAT">Flat</option>
                    <option value="APARTMENT">Apartment</option>
                    <option value="INDIVIDUAL_HOUSE">Individual House</option>
                    <option value="FARM_HOUSE">Farm House</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Furnishing
                  </label>
                  <select {...register('furnishing')} className="input">
                    <option value="">Select furnishing</option>
                    <option value="UNFURNISHED">Unfurnished</option>
                    <option value="SEMI_FURNISHED">Semi-furnished</option>
                    <option value="FURNISHED">Furnished</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Posted by
                  </label>
                  <select {...register('postedBy')} className="input">
                    <option value="">Select posted by</option>
                    <option value="OWNER">Owner</option>
                    <option value="BUILDER">Builder</option>
                    <option value="DEALER">Dealer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Floor Number
                  </label>
                  <input
                    type="text"
                    {...register('floorNumber')}
                    className="input"
                    placeholder="e.g., 2nd Floor"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available From
                  </label>
                  <input
                    type="date"
                    {...register('availableFrom')}
                    className="input"
                  />
                </div>
              </div>
            </div>
          )}

          {/* PG-specific filters */}
          {rentType === 'PG' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">PG Details</h2>
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sharing Type
                  </label>
                  <select {...register('sharingType')} className="input">
                    <option value="">Select sharing</option>
                    <option value="SINGLE">Single Room</option>
                    <option value="TWO_SHARING">2 Sharing</option>
                    <option value="THREE_SHARING">3 Sharing</option>
                    <option value="FOUR_SHARING">4 Sharing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    AC Room
                  </label>
                  <select {...register('acRoom', { valueAsBoolean: true })} className="input">
                    <option value="">Select AC</option>
                    <option value="true">AC Room</option>
                    <option value="false">Non AC Room</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Posted by
                  </label>
                  <select {...register('postedBy')} className="input">
                    <option value="">Select posted by</option>
                    <option value="OWNER">Owner</option>
                    <option value="SUPERVISOR">Supervisor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select {...register('gender')} className="input">
                    <option value="">Select gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="ANY">Any</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available From
                  </label>
                  <input
                    type="date"
                    {...register('availableFrom')}
                    className="input"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Room Sharing-specific filters */}
          {rentType === 'ROOM_SHARING' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Room Sharing Details</h2>
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    BHK
                  </label>
                  <select {...register('bhk')} className="input">
                    <option value="">Select BHK</option>
                    <option value="1BHK">1 BHK</option>
                    <option value="2BHK">2 BHK</option>
                    <option value="3BHK">3 BHK</option>
                    <option value="4BHK">4 BHK</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type
                  </label>
                  <select {...register('propertyType')} className="input">
                    <option value="">Select property type</option>
                    <option value="FLAT">Flat</option>
                    <option value="APARTMENT">Apartment</option>
                    <option value="INDIVIDUAL_HOUSE">Individual House</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Posted by
                  </label>
                  <select {...register('postedBy')} className="input">
                    <option value="">Select posted by</option>
                    <option value="TENANT">Tenant</option>
                    <option value="OWNER">Owner</option>
                    <option value="DEALER">Dealer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select {...register('gender')} className="input">
                    <option value="">Select gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="ANY">Any</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Floor Number
                  </label>
                  <input
                    type="text"
                    {...register('floorNumber')}
                    className="input"
                    placeholder="e.g., 2nd Floor"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available From
                  </label>
                  <input
                    type="date"
                    {...register('availableFrom')}
                    className="input"
                  />
                </div>
              </div>
            </div>
          )}

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
                    onChange={() => toggleAmenity(amenity.id)}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{amenity.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Additional Comments</h2>
            <textarea
              {...register('comments')}
              rows={4}
              className="input"
              placeholder="Any additional information about the property..."
            />
          </div>

          {/* Images */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Property Images *</h2>
            
            <div>
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
                      {uploadedImages.length} image(s) selected
                    </span>
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
                    setValue('city', location.city || '')
                    setValue('state', location.state || '')
                    setValue('district', location.district || '')
                    setValue('locality', location.locality || '')
                    setValue('lat', location.lat || 0)
                    setValue('lng', location.lng || 0)
                  } else {
                    setValue('city', '')
                    setValue('state', '')
                    setValue('district', '')
                    setValue('locality', '')
                    setValue('lat', 0)
                    setValue('lng', 0)
                  }
                }}
                onAddressChange={(address) => setValue('address', address)}
                error={errors.city || errors.state || errors.lat || errors.lng ? 'Please select a valid location' : undefined}
              />
              {errors.city && <p className="form-error">{String(errors.city.message)}</p>}
              {errors.state && <p className="form-error">{String(errors.state.message)}</p>}
              {errors.lat && <p className="form-error">{String(errors.lat.message)}</p>}
              {errors.lng && <p className="form-error">{String(errors.lng.message)}</p>}

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address (Optional)
                </label>
                <input
                  type="text"
                  id="address"
                  {...register('address')}
                  className={`input ${errors.address ? 'input-error' : ''}`}
                  placeholder="e.g., 123 Main St"
                />
                {errors.address && (
                  <p className="form-error">{String(errors.address.message)}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="btn-secondary"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
