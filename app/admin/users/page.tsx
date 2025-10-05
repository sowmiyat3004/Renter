'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Home, Users, Settings, ChartBarIcon } from '@heroicons/react/24/outline'

interface UserWithDetails {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
  _count: {
    listings: number
  }
}

export default function AdminUsersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [users, setUsers] = useState<UserWithDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      router.push('/')
      return
    }

    fetchUsers()
  }, [session, status, router])

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users')
      const data = await response.json()
      
      if (data.success) {
        setUsers(data.data)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRoleChange = async (userId: string, newRole: string) => {
    setActionLoading(userId)
    
    try {
      const response = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          role: newRole
        }),
      })

      const result = await response.json()

      if (result.success) {
        // Update the user in state
        setUsers(prev => prev.map(user => 
          user.id === userId 
            ? { ...user, role: newRole }
            : user
        ))
      } else {
        alert(result.error || 'Failed to update user role')
      }
    } catch (error) {
      console.error('Error updating user role:', error)
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
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                <p className="text-gray-600">Manage user accounts and permissions</p>
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
              <Home className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900">Dashboard</div>
            </Link>
            <Link 
              href="/admin/listings"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
            >
              <Home className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-gray-900">Manage Listings</div>
            </Link>
            <Link 
              href="/admin/settings"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center"
            >
              <Settings className="h-8 w-8 text-gray-600 mx-auto mb-2" />
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

        {/* Users */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">All Users</h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {users.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No users found
              </div>
            ) : (
              users.map((user) => (
                <div key={user.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="text-lg font-medium text-gray-900">{user.name}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          user.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-800' :
                          user.role === 'ADMIN' ? 'bg-blue-100 text-blue-800' :
                          user.role === 'MODERATOR' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mt-1">{user.email}</p>
                      
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>{user._count.listings} listings</span>
                        <span>Joined: {new Date(user.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        disabled={actionLoading === user.id || user.id === session?.user?.id}
                        className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50"
                      >
                        <option value="USER">User</option>
                        <option value="MODERATOR">Moderator</option>
                        <option value="ADMIN">Admin</option>
                        {session?.user?.role === 'SUPER_ADMIN' && (
                          <option value="SUPER_ADMIN">Super Admin</option>
                        )}
                      </select>
                      {actionLoading === user.id && (
                        <span className="text-sm text-gray-500">Updating...</span>
                      )}
                    </div>
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
