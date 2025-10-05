// Role-Based Access Control (RBAC) System
// Defines permissions and actions for different user roles

export enum UserRole {
  GUEST = 'GUEST',
  USER = 'USER', 
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN'
}

export enum Permission {
  // User Permissions
  VIEW_PROPERTIES = 'view_properties',
  SEARCH_PROPERTIES = 'search_properties',
  VIEW_PROPERTY_DETAILS = 'view_property_details',
  CONTACT_OWNER = 'contact_owner',
  CREATE_LISTING = 'create_listing',
  EDIT_OWN_LISTING = 'edit_own_listing',
  DELETE_OWN_LISTING = 'delete_own_listing',
  VIEW_OWN_PROFILE = 'view_own_profile',
  EDIT_OWN_PROFILE = 'edit_own_profile',
  VIEW_OWN_LISTINGS = 'view_own_listings',
  VIEW_OWN_DASHBOARD = 'view_own_dashboard',
  
  // Admin Permissions
  VIEW_ADMIN_DASHBOARD = 'view_admin_dashboard',
  MANAGE_ALL_LISTINGS = 'manage_all_listings',
  APPROVE_LISTINGS = 'approve_listings',
  REJECT_LISTINGS = 'reject_listings',
  SUSPEND_LISTINGS = 'suspend_listings',
  DELETE_ANY_LISTING = 'delete_any_listing',
  VIEW_ALL_USERS = 'view_all_users',
  MANAGE_USERS = 'manage_users',
  VIEW_USER_DETAILS = 'view_user_details',
  SUSPEND_USERS = 'suspend_users',
  VIEW_ANALYTICS = 'view_analytics',
  VIEW_SYSTEM_STATS = 'view_system_stats',
  MANAGE_AMENITIES = 'manage_amenities',
  MANAGE_NOTIFICATIONS = 'manage_notifications',
  
  // Super Admin Permissions
  MANAGE_ADMINS = 'manage_admins',
  CREATE_ADMINS = 'create_admins',
  DELETE_ADMINS = 'delete_admins',
  MANAGE_SYSTEM_SETTINGS = 'manage_system_settings',
  VIEW_SYSTEM_LOGS = 'view_system_logs',
  MANAGE_DATABASE = 'manage_database',
  EXPORT_DATA = 'export_data',
  IMPORT_DATA = 'import_data'
}

// Role-based permission mapping
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.GUEST]: [
    Permission.VIEW_PROPERTIES,
    Permission.SEARCH_PROPERTIES,
    Permission.VIEW_PROPERTY_DETAILS,
    Permission.CONTACT_OWNER
  ],
  
  [UserRole.USER]: [
    // All guest permissions
    Permission.VIEW_PROPERTIES,
    Permission.SEARCH_PROPERTIES,
    Permission.VIEW_PROPERTY_DETAILS,
    Permission.CONTACT_OWNER,
    
    // User-specific permissions
    Permission.CREATE_LISTING,
    Permission.EDIT_OWN_LISTING,
    Permission.DELETE_OWN_LISTING,
    Permission.VIEW_OWN_PROFILE,
    Permission.EDIT_OWN_PROFILE,
    Permission.VIEW_OWN_LISTINGS,
    Permission.VIEW_OWN_DASHBOARD
  ],
  
  [UserRole.ADMIN]: [
    // All user permissions
    Permission.VIEW_PROPERTIES,
    Permission.SEARCH_PROPERTIES,
    Permission.VIEW_PROPERTY_DETAILS,
    Permission.CONTACT_OWNER,
    Permission.CREATE_LISTING,
    Permission.EDIT_OWN_LISTING,
    Permission.DELETE_OWN_LISTING,
    Permission.VIEW_OWN_PROFILE,
    Permission.EDIT_OWN_PROFILE,
    Permission.VIEW_OWN_LISTINGS,
    Permission.VIEW_OWN_DASHBOARD,
    
    // Admin permissions
    Permission.VIEW_ADMIN_DASHBOARD,
    Permission.MANAGE_ALL_LISTINGS,
    Permission.APPROVE_LISTINGS,
    Permission.REJECT_LISTINGS,
    Permission.SUSPEND_LISTINGS,
    Permission.DELETE_ANY_LISTING,
    Permission.VIEW_ALL_USERS,
    Permission.MANAGE_USERS,
    Permission.VIEW_USER_DETAILS,
    Permission.SUSPEND_USERS,
    Permission.VIEW_ANALYTICS,
    Permission.VIEW_SYSTEM_STATS,
    Permission.MANAGE_AMENITIES,
    Permission.MANAGE_NOTIFICATIONS
  ],
  
  [UserRole.SUPER_ADMIN]: [
    // All permissions (admin + super admin)
    Permission.VIEW_PROPERTIES,
    Permission.SEARCH_PROPERTIES,
    Permission.VIEW_PROPERTY_DETAILS,
    Permission.CONTACT_OWNER,
    Permission.CREATE_LISTING,
    Permission.EDIT_OWN_LISTING,
    Permission.DELETE_OWN_LISTING,
    Permission.VIEW_OWN_PROFILE,
    Permission.EDIT_OWN_PROFILE,
    Permission.VIEW_OWN_LISTINGS,
    Permission.VIEW_OWN_DASHBOARD,
    Permission.VIEW_ADMIN_DASHBOARD,
    Permission.MANAGE_ALL_LISTINGS,
    Permission.APPROVE_LISTINGS,
    Permission.REJECT_LISTINGS,
    Permission.SUSPEND_LISTINGS,
    Permission.DELETE_ANY_LISTING,
    Permission.VIEW_ALL_USERS,
    Permission.MANAGE_USERS,
    Permission.VIEW_USER_DETAILS,
    Permission.SUSPEND_USERS,
    Permission.VIEW_ANALYTICS,
    Permission.VIEW_SYSTEM_STATS,
    Permission.MANAGE_AMENITIES,
    Permission.MANAGE_NOTIFICATIONS,
    
    // Super admin exclusive permissions
    Permission.MANAGE_ADMINS,
    Permission.CREATE_ADMINS,
    Permission.DELETE_ADMINS,
    Permission.MANAGE_SYSTEM_SETTINGS,
    Permission.VIEW_SYSTEM_LOGS,
    Permission.MANAGE_DATABASE,
    Permission.EXPORT_DATA,
    Permission.IMPORT_DATA
  ]
}

// Permission checking functions
export function hasPermission(userRole: UserRole, permission: Permission): boolean {
  const rolePermissions = ROLE_PERMISSIONS[userRole] || []
  return rolePermissions.includes(permission)
}

export function hasAnyPermission(userRole: UserRole, permissions: Permission[]): boolean {
  return permissions.some(permission => hasPermission(userRole, permission))
}

export function hasAllPermissions(userRole: UserRole, permissions: Permission[]): boolean {
  return permissions.every(permission => hasPermission(userRole, permission))
}

// Role hierarchy checking
export function isRoleHigherOrEqual(userRole: UserRole, requiredRole: UserRole): boolean {
  const roleHierarchy = {
    [UserRole.GUEST]: 0,
    [UserRole.USER]: 1,
    [UserRole.ADMIN]: 2,
    [UserRole.SUPER_ADMIN]: 3
  }
  
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
}

// Action-based permissions
export const ACTION_PERMISSIONS: Record<string, Permission[]> = {
  // User Actions
  'browse_properties': [Permission.VIEW_PROPERTIES, Permission.SEARCH_PROPERTIES],
  'view_property': [Permission.VIEW_PROPERTY_DETAILS],
  'contact_owner': [Permission.CONTACT_OWNER],
  'create_listing': [Permission.CREATE_LISTING],
  'edit_listing': [Permission.EDIT_OWN_LISTING],
  'delete_listing': [Permission.DELETE_OWN_LISTING],
  'view_profile': [Permission.VIEW_OWN_PROFILE],
  'edit_profile': [Permission.EDIT_OWN_PROFILE],
  'view_dashboard': [Permission.VIEW_OWN_DASHBOARD],
  
  // Admin Actions
  'admin_dashboard': [Permission.VIEW_ADMIN_DASHBOARD],
  'manage_listings': [Permission.MANAGE_ALL_LISTINGS],
  'approve_listing': [Permission.APPROVE_LISTINGS],
  'reject_listing': [Permission.REJECT_LISTINGS],
  'suspend_listing': [Permission.SUSPEND_LISTINGS],
  'delete_any_listing': [Permission.DELETE_ANY_LISTING],
  'view_users': [Permission.VIEW_ALL_USERS],
  'manage_users': [Permission.MANAGE_USERS],
  'view_user_details': [Permission.VIEW_USER_DETAILS],
  'suspend_user': [Permission.SUSPEND_USERS],
  'view_analytics': [Permission.VIEW_ANALYTICS],
  'manage_amenities': [Permission.MANAGE_AMENITIES],
  
  // Super Admin Actions
  'manage_admins': [Permission.MANAGE_ADMINS],
  'create_admin': [Permission.CREATE_ADMINS],
  'delete_admin': [Permission.DELETE_ADMINS],
  'system_settings': [Permission.MANAGE_SYSTEM_SETTINGS],
  'system_logs': [Permission.VIEW_SYSTEM_LOGS],
  'database_management': [Permission.MANAGE_DATABASE],
  'export_data': [Permission.EXPORT_DATA],
  'import_data': [Permission.IMPORT_DATA]
}

export function canPerformAction(userRole: UserRole, action: string): boolean {
  const requiredPermissions = ACTION_PERMISSIONS[action] || []
  return hasAllPermissions(userRole, requiredPermissions)
}

// Route-based permissions
export const ROUTE_PERMISSIONS: Record<string, Permission[]> = {
  // Public routes
  '/': [],
  '/listings': [Permission.VIEW_PROPERTIES],
  '/listings/[id]': [Permission.VIEW_PROPERTY_DETAILS],
  
  // User routes
  '/user/dashboard': [Permission.VIEW_OWN_DASHBOARD],
  '/user/profile': [Permission.VIEW_OWN_PROFILE],
  '/user/login': [],
  '/user/signup': [],
  '/listings/create': [Permission.CREATE_LISTING],
  '/listings/[id]/edit': [Permission.EDIT_OWN_LISTING],
  
  // Admin routes
  '/admin/dashboard': [Permission.VIEW_ADMIN_DASHBOARD],
  '/admin/listings': [Permission.MANAGE_ALL_LISTINGS],
  '/admin/users': [Permission.VIEW_ALL_USERS],
  '/admin/analytics': [Permission.VIEW_ANALYTICS],
  '/admin/settings': [Permission.MANAGE_SYSTEM_SETTINGS]
}

export function canAccessRoute(userRole: UserRole, route: string): boolean {
  const requiredPermissions = ROUTE_PERMISSIONS[route] || []
  return hasAllPermissions(userRole, requiredPermissions)
}

// Permission middleware helper
export function requirePermission(permission: Permission) {
  return (userRole: UserRole) => hasPermission(userRole, permission)
}

export function requireRole(requiredRole: UserRole) {
  return (userRole: UserRole) => isRoleHigherOrEqual(userRole, requiredRole)
}

export function requireAction(action: string) {
  return (userRole: UserRole) => canPerformAction(userRole, action)
}