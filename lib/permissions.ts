// Permission system for role-based access control

export type UserRole = 'USER' | 'SUPER_ADMIN'

export interface Permission {
  id: string
  name: string
  description: string
  resource: string
  action: string
}

export interface RolePermissions {
  role: UserRole
  permissions: Permission[]
}

// Define permissions for each role
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  USER: [
    {
      id: 'user:create_listing',
      name: 'Create Listing',
      description: 'Create new property listings',
      resource: 'listing',
      action: 'create'
    },
    {
      id: 'user:view_listing',
      name: 'View Listings',
      description: 'View property listings',
      resource: 'listing',
      action: 'read'
    },
    {
      id: 'user:edit_own_listing',
      name: 'Edit Own Listings',
      description: 'Edit own property listings',
      resource: 'listing',
      action: 'update'
    },
    {
      id: 'user:delete_own_listing',
      name: 'Delete Own Listings',
      description: 'Delete own property listings',
      resource: 'listing',
      action: 'delete'
    },
    {
      id: 'user:view_dashboard',
      name: 'View Dashboard',
      description: 'Access user dashboard',
      resource: 'dashboard',
      action: 'read'
    },
    {
      id: 'user:manage_profile',
      name: 'Manage Profile',
      description: 'Manage own profile',
      resource: 'profile',
      action: 'update'
    }
  ],
  SUPER_ADMIN: [
    // All user permissions
    {
      id: 'user:create_listing',
      name: 'Create Listing',
      description: 'Create new property listings',
      resource: 'listing',
      action: 'create'
    },
    {
      id: 'user:view_listing',
      name: 'View Listings',
      description: 'View property listings',
      resource: 'listing',
      action: 'read'
    },
    {
      id: 'user:edit_own_listing',
      name: 'Edit Own Listings',
      description: 'Edit own property listings',
      resource: 'listing',
      action: 'update'
    },
    {
      id: 'user:delete_own_listing',
      name: 'Delete Own Listings',
      description: 'Delete own property listings',
      resource: 'listing',
      action: 'delete'
    },
    {
      id: 'user:view_dashboard',
      name: 'View Dashboard',
      description: 'Access user dashboard',
      resource: 'dashboard',
      action: 'read'
    },
    {
      id: 'user:manage_profile',
      name: 'Manage Profile',
      description: 'Manage own profile',
      resource: 'profile',
      action: 'update'
    },
    // Super admin specific permissions
    {
      id: 'admin:view_all_listings',
      name: 'View All Listings',
      description: 'View all property listings',
      resource: 'listing',
      action: 'read_all'
    },
    {
      id: 'admin:edit_all_listings',
      name: 'Edit All Listings',
      description: 'Edit any property listing',
      resource: 'listing',
      action: 'update_all'
    },
    {
      id: 'admin:delete_all_listings',
      name: 'Delete All Listings',
      description: 'Delete any property listing',
      resource: 'listing',
      action: 'delete_all'
    },
    {
      id: 'admin:approve_listings',
      name: 'Approve Listings',
      description: 'Approve or reject listings',
      resource: 'listing',
      action: 'approve'
    },
    {
      id: 'admin:view_users',
      name: 'View Users',
      description: 'View all users',
      resource: 'user',
      action: 'read_all'
    },
    {
      id: 'admin:edit_users',
      name: 'Edit Users',
      description: 'Edit user information',
      resource: 'user',
      action: 'update_all'
    },
    {
      id: 'admin:delete_users',
      name: 'Delete Users',
      description: 'Delete users',
      resource: 'user',
      action: 'delete_all'
    },
    {
      id: 'admin:assign_roles',
      name: 'Assign Roles',
      description: 'Assign roles to users',
      resource: 'user',
      action: 'assign_role'
    },
    {
      id: 'admin:view_analytics',
      name: 'View Analytics',
      description: 'Access admin analytics',
      resource: 'analytics',
      action: 'read'
    },
    {
      id: 'admin:manage_system',
      name: 'Manage System',
      description: 'Manage system settings',
      resource: 'system',
      action: 'manage'
    }
  ]
}

// Check if user has specific permission
export function hasPermission(userRole: UserRole, permissionId: string): boolean {
  const rolePermissions = ROLE_PERMISSIONS[userRole]
  return rolePermissions.some(permission => permission.id === permissionId)
}

// Check if user has permission for resource and action
export function hasResourcePermission(
  userRole: UserRole, 
  resource: string, 
  action: string
): boolean {
  const rolePermissions = ROLE_PERMISSIONS[userRole]
  return rolePermissions.some(permission => 
    permission.resource === resource && permission.action === action
  )
}

// Get all permissions for a role
export function getRolePermissions(userRole: UserRole): Permission[] {
  return ROLE_PERMISSIONS[userRole]
}

// Check if user is super admin
export function isSuperAdmin(userRole: UserRole): boolean {
  return userRole === 'SUPER_ADMIN'
}

// Check if user is regular user
export function isUser(userRole: UserRole): boolean {
  return userRole === 'USER'
}

// Get role display name
export function getRoleDisplayName(role: UserRole): string {
  switch (role) {
    case 'USER':
      return 'User'
    case 'SUPER_ADMIN':
      return 'Super Admin'
    default:
      return 'Unknown'
  }
}

// Get role color for UI
export function getRoleColor(role: UserRole): string {
  switch (role) {
    case 'USER':
      return 'bg-green-100 text-green-800'
    case 'SUPER_ADMIN':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
