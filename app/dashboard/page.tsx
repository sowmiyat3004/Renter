'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  HomeIcon, 
  PlusIcon, 
  EyeIcon, 
  PencilIcon, 
  TrashIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  ChartBarIcon,
  UserGroupIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline'

interface Listing {
  id: string
  title: string
  description: string
  priceAmount: number
  currency: string
  bedrooms: number
  bathrooms: number
  state: string
  city: string
  locality?: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  createdAt: string
  updatedAt: string
  _count: {
    views: number
    inquiries: number
  }
}

interface UserStats {
  totalListings: number
  approvedListings: number
  pendingListings: number
  rejectedListings: number
  totalViews: number
  totalInquiries: number
}

export default function UserDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [listings, setListings] = useState<Listing[]>([])
  const [stats, setStats] = useState<UserStats>({
    totalListings: 0,
    approvedListings: 0,
    pendingListings: 0,
    rejectedListings: 0,
    totalViews: 0,
    totalInquiries: 0
  })
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'all' | 'approved' | 'pending' | 'rejected'>('all')

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/auth/signin')
      return
    }
    fetchUserListings()
  }, [session, status, router])

  const fetchUserListings = async () => {
    try {
      const response = await fetch('/api/user/listings')
      const data = await response.json()
      
      if (data.success) {
        setListings(data.data)
        calculateStats(data.data)
      }
    } catch (error) {
      console.error('Error fetching listings:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (userListings: Listing[]) => {
    const stats = {
      totalListings: userListings.length,
      approvedListings: userListings.filter(l => l.status === 'APPROVED').length,
      pendingListings: userListings.filter(l => l.status === 'PENDING').length,
      rejectedListings: userListings.filter(l => l.status === 'REJECTED').length,
      totalViews: userListings.reduce((sum, l) => sum + l._count.views, 0),
      totalInquiries: userListings.reduce((sum, l) => sum + l._count.inquiries, 0)
    }
    setStats(stats)
  }

  const filteredListings = listings.filter(listing => {
    if (activeTab === 'all') return true
    return listing.status === activeTab.toUpperCase()
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />
      case 'PENDING':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />
      case 'REJECTED':
        return <XCircleIcon className="h-5 w-5 text-red-500" />
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'REJECTED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">
                Welcome back, {session?.user?.name}
              </p>
            </div>
            <div className="flex space-x-3">
              <Link
                href="/listings/create"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Property
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <HomeIcon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Properties
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.totalListings}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircleIcon className="h-6 w-6 text-green-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Approved
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.approvedListings}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <EyeIcon className="h-6 w-6 text-blue-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Views
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.totalViews}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <UserGroupIcon className="h-6 w-6 text-purple-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Inquiries
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.totalInquiries}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white shadow rounded-lg">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
              {[
                { key: 'all', label: 'All Properties', count: stats.totalListings },
                { key: 'approved', label: 'Approved', count: stats.approvedListings },
                { key: 'pending', label: 'Pending', count: stats.pendingListings },
                { key: 'rejected', label: 'Rejected', count: stats.rejectedListings }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`${
                    activeTab === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  {tab.label}
                  <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                    activeTab === tab.key
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Listings */}
          <div className="p-6">
            {filteredListings.length === 0 ? (
              <div className="text-center py-12">
                <HomeIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No properties found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {activeTab === 'all' 
                    ? "Get started by adding your first property."
                    : `No ${activeTab} properties found.`
                  }
                </p>
                {activeTab === 'all' && (
                  <div className="mt-6">
                    <Link
                      href="/listings/create"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Add Property
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredListings.map((listing) => (
                  <div key={listing.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-medium text-gray-900">{listing.title}</h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(listing.status)}`}>
                            {getStatusIcon(listing.status)}
                            <span className="ml-1">{listing.status}</span>
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-3 line-clamp-2">{listing.description}</p>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center">
                            <span className="font-medium">₹{listing.priceAmount.toLocaleString()}</span>
                            <span className="ml-1">/month</span>
                          </div>
                          <div className="flex items-center">
                            <span>{listing.bedrooms} bed</span>
                            <span className="mx-1">•</span>
                            <span>{listing.bathrooms} bath</span>
                          </div>
                          <div className="flex items-center">
                            <span>{listing.city}, {listing.state}</span>
                            {listing.locality && <span className="ml-1">• {listing.locality}</span>}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6 mt-3 text-sm text-gray-500">
                          <div className="flex items-center">
                            <EyeIcon className="h-4 w-4 mr-1" />
                            <span>{listing._count.views} views</span>
                          </div>
                          <div className="flex items-center">
                            <UserGroupIcon className="h-4 w-4 mr-1" />
                            <span>{listing._count.inquiries} inquiries</span>
                          </div>
                          <div className="flex items-center">
                            <span>Posted {new Date(listing.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <Link
                          href={`/listings/${listing.id}`}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <EyeIcon className="h-4 w-4 mr-1" />
                          View
                        </Link>
                        <Link
                          href={`/listings/${listing.id}/edit`}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <PencilIcon className="h-4 w-4 mr-1" />
                          Edit
                        </Link>
                        <button
                          onClick={() => {
                            if (confirm('Are you sure you want to delete this property?')) {
                              // Handle delete
                              console.log('Delete listing:', listing.id)
                            }
                          }}
                          className="inline-flex items-center px-3 py-1.5 border border-red-300 shadow-sm text-xs font-medium rounded text-red-700 bg-white hover:bg-red-50"
                        >
                          <TrashIcon className="h-4 w-4 mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}