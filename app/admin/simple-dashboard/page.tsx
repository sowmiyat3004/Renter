'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Users, 
  Home, 
  UserPlus,
  EyeIcon
} from 'lucide-react'

interface AdminStats {
  totalUsers: number
  websiteVisitors: number
}

export default function SimpleAdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    websiteVisitors: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return

    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      router.push('/')
      return
    }

    fetchStats()
  }, [session, status, router])

  const fetchStats = async () => {
    try {
      const [usersResponse, visitorsResponse] = await Promise.all([
        fetch('/api/admin/users?count=true'),
        fetch('/api/admin/visitors')
      ])

      const usersData = await usersResponse.json()
      const visitorsData = await visitorsResponse.json()

      setStats({
        totalUsers: usersData.success ? usersData.count : 0,
        websiteVisitors: visitorsData.success ? visitorsData.count : 0
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
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
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage your Broker360 platform</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-red-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                    <dd className="text-2xl font-semibold text-gray-900">{stats.totalUsers}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <EyeIcon className="h-8 w-8 text-red-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Website Visitors</dt>
                    <dd className="text-2xl font-semibold text-gray-900">{stats.websiteVisitors}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link 
              href="/admin/users"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
            >
              <Users className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900">User Management</div>
            </Link>
            <Link 
              href="/admin/listings"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
            >
              <Home className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900">Manage Listings</div>
            </Link>
            <Link 
              href="/admin/add-user"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
            >
              <UserPlus className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900">Add User</div>
            </Link>
          </div>
        </div>

        {/* User Permission Levels */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">User Permission Levels</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="text-sm font-medium text-gray-900">User</h4>
                <p className="text-sm text-gray-500">Can create and manage their own listings</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                Basic Access
              </span>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Admin</h4>
                <p className="text-sm text-gray-500">Can manage users and approve/reject listings</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                Admin Access
              </span>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Super Admin</h4>
                <p className="text-sm text-gray-500">Full platform access and user management</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                Super Admin Access
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
