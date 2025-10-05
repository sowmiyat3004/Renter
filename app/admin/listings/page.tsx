'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeftIcon, HomeIcon, UsersIcon, CogIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import { ListingWithDetails } from '@/types'

export default function AdminListingsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [listings, setListings] = useState<ListingWithDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      router.push('/')
      return
    }

    fetchListings()
  }, [session, status, router])

  const fetchListings = async () => {
    try {
      const response = await fetch('/api/admin/listings')
      const data = await response.json()
      
      if (data.success) {
        setListings(data.data)
      }
    } catch (error) {
      console.error('Error fetching listings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAdminAction = async (listingId: string, action: 'APPROVE' | 'REJECT', reason?: string) => {
    setActionLoading(listingId)
    
    try {
      const response = await fetch('/api/admin/listings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          listingId,
          actionType: action,
          reason
        }),
      })

      const result = await response.json()

      if (result.success) {
        // Update the listing in state
        setListings(prev => prev.map(listing => 
          listing.id === listingId 
            ? { ...listing, status: action === 'APPROVE' ? 'APPROVED' : 'REJECTED' }
            : listing
        ))
      } else {
        alert(result.error || 'Failed to update listing')
      }
    } catch (error) {
      console.error('Error updating listing:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setActionLoading(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin"
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <ArrowLeftIcon className="h-6 w-6" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Manage Listings</h1>
                <p className="text-gray-600">Review and manage property listings</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link 
              href="/admin"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
            >
              <HomeIcon className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900">Dashboard</div>
            </Link>
            <Link 
              href="/admin/users"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
            >
              <UsersIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900">Manage Users</div>
            </Link>
            <Link 
              href="/admin/settings"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
            >
              <CogIcon className="h-8 w-8 text-gray-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900">Settings</div>
            </Link>
            <Link 
              href="/admin/reports"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
            >
              <ChartBarIcon className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900">Reports</div>
            </Link>
          </div>
        </div>

        {/* Listings */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">All Listings</h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {listings.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No listings found
              </div>
            ) : (
              listings.map((listing) => (
                <div key={listing.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="text-lg font-medium text-gray-900">{listing.title}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          listing.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                          listing.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {listing.status}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mt-1">{listing.description}</p>
                      
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>₹{listing.priceAmount.toLocaleString()}/month</span>
                        <span>{listing.bedrooms} bed</span>
                        <span>{listing.bathrooms} bath</span>
                        <span>{listing.city}, {listing.state}</span>
                      </div>
                      
                      <div className="text-sm text-gray-500 mt-1">
                        Listed by: {listing.owner.name} ({listing.owner.email})
                      </div>
                    </div>
                    
                    {listing.status === 'PENDING' && (
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => handleAdminAction(listing.id, 'APPROVE')}
                          disabled={actionLoading === listing.id}
                          className="px-3 py-1 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 disabled:opacity-50"
                        >
                          {actionLoading === listing.id ? 'Processing...' : 'Approve'}
                        </button>
                        <button
                          onClick={() => {
                            const reason = prompt('Reason for rejection (optional):')
                            if (reason !== null) {
                              handleAdminAction(listing.id, 'REJECT', reason)
                            }
                          }}
                          disabled={actionLoading === listing.id}
                          className="px-3 py-1 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 disabled:opacity-50"
                        >
                          {actionLoading === listing.id ? 'Processing...' : 'Reject'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
