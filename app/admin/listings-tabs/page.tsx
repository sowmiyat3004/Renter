'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeftIcon, CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/outline'
import { ListingWithDetails } from '@/types'

export default function AdminListingsTabsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [listings, setListings] = useState<ListingWithDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending')

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      router.push('/')
      return
    }

    fetchListings()
  }, [session, status, router, activeTab])

  const fetchListings = async () => {
    try {
      const response = await fetch(`/api/admin/listings?status=${activeTab.toUpperCase()}`)
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
          action,
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />
      case 'REJECTED':
        return <XCircleIcon className="h-5 w-5 text-red-500" />
      case 'PENDING':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800'
      case 'REJECTED':
        return 'bg-red-100 text-red-800'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
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

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
              {[
                { key: 'pending', label: 'Pending Requests', count: listings.filter(l => l.status === 'PENDING').length },
                { key: 'approved', label: 'Approved', count: listings.filter(l => l.status === 'APPROVED').length },
                { key: 'rejected', label: 'Rejected', count: listings.filter(l => l.status === 'REJECTED').length }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`${
                    activeTab === tab.key
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  {tab.label}
                  <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                    activeTab === tab.key
                      ? 'bg-red-100 text-red-600'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Listings */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              {activeTab === 'pending' && 'Pending Requests'}
              {activeTab === 'approved' && 'Approved Listings'}
              {activeTab === 'rejected' && 'Rejected Listings'}
            </h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {listings.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No {activeTab} listings found
              </div>
            ) : (
              listings.map((listing) => (
                <div key={listing.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-medium text-gray-900">{listing.title}</h4>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(listing.status)}`}>
                          {getStatusIcon(listing.status)}
                          <span className="ml-1">{listing.status}</span>
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-2">{listing.description}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>₹{listing.priceAmount.toLocaleString()}/month</span>
                        <span>{listing.bedrooms} bed, {listing.bathrooms} bath</span>
                        <span>{listing.city}, {listing.state}</span>
                        <span>Owner: {listing.owner.name}</span>
                        <span>Created: {new Date(listing.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    {activeTab === 'pending' && (
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => handleAdminAction(listing.id, 'APPROVE')}
                          disabled={actionLoading === listing.id}
                          className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 disabled:opacity-50"
                        >
                          {actionLoading === listing.id ? 'Processing...' : 'Approve'}
                        </button>
                        <button
                          onClick={() => handleAdminAction(listing.id, 'REJECT')}
                          disabled={actionLoading === listing.id}
                          className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 disabled:opacity-50"
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
