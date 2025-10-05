import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { 
  hasPermission, 
  canAccessRoute, 
  canPerformAction,
  Permission,
  UserRole 
} from '@/lib/permissions'

// Middleware for protecting routes based on permissions
export function requirePermission(permission: Permission) {
  return async (request: NextRequest) => {
    try {
      const session = await getServerSession(authOptions)
      
      if (!session?.user) {
        return NextResponse.redirect(new URL('/auth/signin', request.url))
      }

      const userRole = session.user.role as UserRole
      
      if (!hasPermission(userRole, permission)) {
        return NextResponse.json(
          { error: 'Insufficient permissions', required: permission },
          { status: 403 }
        )
      }

      return NextResponse.next()
    } catch (error) {
      console.error('Permission check error:', error)
      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: 500 }
      )
    }
  }
}

// Middleware for protecting routes based on role hierarchy
export function requireRole(minimumRole: UserRole) {
  return async (request: NextRequest) => {
    try {
      const session = await getServerSession(authOptions)
      
      if (!session?.user) {
        return NextResponse.redirect(new URL('/auth/signin', request.url))
      }

      const userRole = session.user.role as UserRole
      const roleHierarchy = {
        [UserRole.GUEST]: 0,
        [UserRole.USER]: 1,
        [UserRole.ADMIN]: 2,
        [UserRole.SUPER_ADMIN]: 3
      }

      if (roleHierarchy[userRole] < roleHierarchy[minimumRole]) {
        return NextResponse.json(
          { error: 'Insufficient role level', required: minimumRole },
          { status: 403 }
        )
      }

      return NextResponse.next()
    } catch (error) {
      console.error('Role check error:', error)
      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: 500 }
      )
    }
  }
}

// Middleware for protecting API routes
export function requireAPIPermission(permission: Permission) {
  return async (request: NextRequest) => {
    try {
      const session = await getServerSession(authOptions)
      
      if (!session?.user) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        )
      }

      const userRole = session.user.role as UserRole
      
      if (!hasPermission(userRole, permission)) {
        return NextResponse.json(
          { 
            error: 'Insufficient permissions',
            required: permission,
            currentRole: userRole
          },
          { status: 403 }
        )
      }

      return NextResponse.next()
    } catch (error) {
      console.error('API permission check error:', error)
      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: 500 }
      )
    }
  }
}

// Middleware for protecting actions
export function requireAction(action: string) {
  return async (request: NextRequest) => {
    try {
      const session = await getServerSession(authOptions)
      
      if (!session?.user) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        )
      }

      const userRole = session.user.role as UserRole
      
      if (!canPerformAction(userRole, action)) {
        return NextResponse.json(
          { 
            error: 'Action not allowed',
            action,
            currentRole: userRole
          },
          { status: 403 }
        )
      }

      return NextResponse.next()
    } catch (error) {
      console.error('Action permission check error:', error)
      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: 500 }
      )
    }
  }
}

// Helper function to check if user can access a specific route
export async function canUserAccessRoute(route: string, userRole?: UserRole): Promise<boolean> {
  if (!userRole) {
    const session = await getServerSession(authOptions)
    userRole = session?.user?.role as UserRole || UserRole.GUEST
  }
  
  return canAccessRoute(userRole, route)
}

// Helper function to get user permissions
export async function getUserPermissions(userRole?: UserRole): Promise<Permission[]> {
  if (!userRole) {
    const session = await getServerSession(authOptions)
    userRole = session?.user?.role as UserRole || UserRole.GUEST
  }
  
  const { ROLE_PERMISSIONS } = await import('@/lib/permissions')
  return ROLE_PERMISSIONS[userRole] || []
}

// Helper function to check multiple permissions
export async function hasAnyPermission(
  permissions: Permission[], 
  userRole?: UserRole
): Promise<boolean> {
  if (!userRole) {
    const session = await getServerSession(authOptions)
    userRole = session?.user?.role as UserRole || UserRole.GUEST
  }
  
  return permissions.some(permission => hasPermission(userRole, permission))
}

// Helper function to check all permissions
export async function hasAllPermissions(
  permissions: Permission[], 
  userRole?: UserRole
): Promise<boolean> {
  if (!userRole) {
    const session = await getServerSession(authOptions)
    userRole = session?.user?.role as UserRole || UserRole.GUEST
  }
  
  return permissions.every(permission => hasPermission(userRole, permission))
}

// Route-specific middleware configurations
export const ROUTE_MIDDLEWARE = {
  // User routes
  '/user/dashboard': requirePermission(Permission.VIEW_OWN_DASHBOARD),
  '/user/profile': requirePermission(Permission.VIEW_OWN_PROFILE),
  '/listings/create': requirePermission(Permission.CREATE_LISTING),
  '/listings/[id]/edit': requirePermission(Permission.EDIT_OWN_LISTING),
  
  // Admin routes
  '/admin/dashboard': requireRole(UserRole.ADMIN),
  '/admin/listings': requirePermission(Permission.MANAGE_ALL_LISTINGS),
  '/admin/users': requirePermission(Permission.VIEW_ALL_USERS),
  '/admin/analytics': requirePermission(Permission.VIEW_ANALYTICS),
  '/admin/settings': requireRole(UserRole.SUPER_ADMIN),
  
  // API routes
  '/api/admin/stats': requireAPIPermission(Permission.VIEW_ANALYTICS),
  '/api/admin/users': requireAPIPermission(Permission.VIEW_ALL_USERS),
  '/api/admin/listings': requireAPIPermission(Permission.MANAGE_ALL_LISTINGS),
  '/api/user/dashboard': requireAPIPermission(Permission.VIEW_OWN_DASHBOARD),
  '/api/user/profile': requireAPIPermission(Permission.VIEW_OWN_PROFILE),
  '/api/listings': requireAPIPermission(Permission.CREATE_LISTING),
}

// Utility function to create protected API handler
export function createProtectedAPIHandler(
  permission: Permission,
  handler: (request: NextRequest, session: any) => Promise<NextResponse>
) {
  return async (request: NextRequest) => {
    try {
      const session = await getServerSession(authOptions)
      
      if (!session?.user) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        )
      }

      const userRole = session.user.role as UserRole
      
      if (!hasPermission(userRole, permission)) {
        return NextResponse.json(
          { 
            error: 'Insufficient permissions',
            required: permission,
            currentRole: userRole
          },
          { status: 403 }
        )
      }

      return await handler(request, session)
    } catch (error) {
      console.error('Protected API handler error:', error)
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
  }
}
