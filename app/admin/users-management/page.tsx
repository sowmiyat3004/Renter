'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeftIcon,
  HomeIcon, 
  UsersIcon, 
  ChartBarIcon,
  UserGroupIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ShieldCheckIcon,
  UserIcon as UserIconSolid
} from '@heroicons/react/24/outline'
import { getRoleDisplayName, getRoleColor } from '@/lib/permissions'

interface UserWithDetails {
  id: string
  name: string
  email: string
  phone?: string
  role: string
  createdAt: string
  lastLoginAt?: string
  _count: {
    listings: number
  }
}

export default function UsersManagementPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [users, setUsers] = useState<UserWithDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [showRoleModal, setShowRoleModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserWithDetails | null>(null)
  const [newRole, setNewRole] = useState('')

  useEffect(() => {
    if (status === 'loading') return
    if (!session || session.user.role !== 'SUPER_ADMIN') {
      router.push('/auth/signin')
      return
    }
    fetchUsers()
  }, [session, status, router])

  const fetchUsers = async () => {
    try {
      setLoading(true)
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
    try {
      setActionLoading(userId)
      const response = await fetch('/api/admin/users/role', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          role: newRole
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        // Update local state
        setUsers(prev => 
          prev.map(user => 
            user.id === userId ? { ...user, role: newRole } : user
          )
        )
        setShowRoleModal(false)
        setSelectedUser(null)
        setNewRole('')
      } else {
        alert('Failed to update user role: ' + data.error)
      }
    } catch (error) {
      console.error('Error updating user role:', error)
      alert('Failed to update user role')
    } finally {
      setActionLoading(null)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return
    }

    try {
      setActionLoading(userId)
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE'
      })
      
      const data = await response.json()
      
      if (data.success) {
        setUsers(prev => prev.filter(user => user.id !== userId))
      } else {
        alert('Failed to delete user: ' + data.error)
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('Failed to delete user')
    } finally {
      setActionLoading(null)
    }
  }

  const openRoleModal = (user: UserWithDetails) => {
    setSelectedUser(user)
    setNewRole(user.role)
    setShowRoleModal(true)
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = !roleFilter || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
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
            <div className="flex items-center space-x-4">
              <Link
                href="/admin"
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back to Admin
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Manage users and their permissions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Users
              </label>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Role
              </label>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Roles</option>
                <option value="USER">User</option>
                <option value="SUPER_ADMIN">Super Admin</option>
              </select>
            </div>
            <div className="flex items-end">
              <div className="text-sm text-gray-500">
                Showing {filteredUsers.length} of {users.length} users
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">All Users ({users.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Properties
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {user.phone ? (
                          <div className="flex items-center">
                            <PhoneIcon className="h-4 w-4 mr-2 text-gray-400" />
                            {user.phone}
                          </div>
                        ) : (
                          <span className="text-gray-400">No phone</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role as any)}`}>
                        {getRoleDisplayName(user.role as any)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user._count.listings}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastLoginAt ? formatDate(user.lastLoginAt) : 'Never'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => openRoleModal(user)}
                          disabled={actionLoading === user.id}
                          className="text-blue-600 hover:text-blue-900 disabled:opacity-50"
                          title="Change Role"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          disabled={actionLoading === user.id || user.id === session?.user?.id}
                          className="text-red-600 hover:text-red-900 disabled:opacity-50"
                          title="Delete User"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Role Change Modal */}
      {showRoleModal && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Change User Role
              </h3>
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  Change role for <strong>{selectedUser.name}</strong>
                </p>
                <p className="text-sm text-gray-500">{selectedUser.email}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Role
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="USER">User</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowRoleModal(false)
                    setSelectedUser(null)
                    setNewRole('')
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleRoleChange(selectedUser.id, newRole)}
                  disabled={actionLoading === selectedUser.id}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {actionLoading === selectedUser.id ? 'Updating...' : 'Update Role'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
