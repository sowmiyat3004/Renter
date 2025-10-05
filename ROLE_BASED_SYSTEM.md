# 🔐 Role-Based Access Control (RBAC) System

## Overview
This document outlines the complete role-based permission system for the Renter application, defining what each user role can and cannot do.

## User Roles

### 1. **GUEST** (Anonymous Users)
- **Purpose**: Browse properties without account
- **Access Level**: Read-only, limited features

**Permissions:**
- ✅ View properties list
- ✅ Search properties
- ✅ View property details
- ✅ Contact property owner (with login prompt)
- ❌ Create listings
- ❌ Access user dashboard
- ❌ Manage profile

**Routes Access:**
- `/` (Home page)
- `/listings` (Browse properties)
- `/listings/[id]` (View property details)
- `/auth/signin` (Login page)
- `/auth/signup` (Signup page)

---

### 2. **USER** (Registered Users)
- **Purpose**: Full user functionality for property browsing and listing
- **Access Level**: Standard user features

**Permissions:**
- ✅ All Guest permissions
- ✅ Create property listings
- ✅ Edit own listings
- ✅ Delete own listings
- ✅ View own profile
- ✅ Edit own profile
- ✅ View own dashboard
- ✅ View own listings
- ❌ Manage other users' listings
- ❌ Access admin features

**Routes Access:**
- All Guest routes
- `/user/dashboard` (User dashboard)
- `/user/profile` (User profile)
- `/listings/create` (Create listing)
- `/listings/[id]/edit` (Edit own listing)

**Key Features:**
- Browse and search properties
- Create and manage property listings
- Contact property owners
- View personal dashboard with stats
- Manage profile information

---

### 3. **ADMIN** (Platform Moderators)
- **Purpose**: Moderate platform content and manage users
- **Access Level**: Administrative privileges

**Permissions:**
- ✅ All User permissions
- ✅ View admin dashboard
- ✅ Manage all listings (approve/reject/suspend)
- ✅ View all users
- ✅ Manage users (suspend/activate)
- ✅ View analytics and statistics
- ✅ Manage amenities
- ✅ Manage notifications
- ❌ Create/delete other admins
- ❌ System-level settings

**Routes Access:**
- All User routes
- `/admin/dashboard` (Admin dashboard)
- `/admin/listings` (Manage listings)
- `/admin/users` (User management)
- `/admin/analytics` (Analytics)

**Key Features:**
- Approve/reject property listings
- Suspend problematic users
- View platform analytics
- Manage amenities and categories
- Monitor user activity

---

### 4. **SUPER_ADMIN** (Platform Administrators)
- **Purpose**: Complete platform control and management
- **Access Level**: Full administrative privileges

**Permissions:**
- ✅ All Admin permissions
- ✅ Manage other admins
- ✅ Create new admins
- ✅ Delete admins
- ✅ System settings management
- ✅ View system logs
- ✅ Database management
- ✅ Export/import data
- ✅ Full platform control

**Routes Access:**
- All Admin routes
- `/admin/settings` (System settings)
- `/admin/logs` (System logs)
- `/admin/database` (Database management)

**Key Features:**
- Complete platform administration
- User and admin management
- System configuration
- Data export/import
- Security and monitoring

---

## Permission Categories

### 🏠 **Property Management**
| Permission | GUEST | USER | ADMIN | SUPER_ADMIN |
|------------|-------|------|-------|-------------|
| View Properties | ✅ | ✅ | ✅ | ✅ |
| Search Properties | ✅ | ✅ | ✅ | ✅ |
| View Property Details | ✅ | ✅ | ✅ | ✅ |
| Contact Owner | ✅ | ✅ | ✅ | ✅ |
| Create Listing | ❌ | ✅ | ✅ | ✅ |
| Edit Own Listing | ❌ | ✅ | ✅ | ✅ |
| Delete Own Listing | ❌ | ✅ | ✅ | ✅ |
| Manage All Listings | ❌ | ❌ | ✅ | ✅ |
| Approve Listings | ❌ | ❌ | ✅ | ✅ |
| Reject Listings | ❌ | ❌ | ✅ | ✅ |
| Suspend Listings | ❌ | ❌ | ✅ | ✅ |
| Delete Any Listing | ❌ | ❌ | ✅ | ✅ |

### 👤 **User Management**
| Permission | GUEST | USER | ADMIN | SUPER_ADMIN |
|------------|-------|------|-------|-------------|
| View Own Profile | ❌ | ✅ | ✅ | ✅ |
| Edit Own Profile | ❌ | ✅ | ✅ | ✅ |
| View Own Dashboard | ❌ | ✅ | ✅ | ✅ |
| View All Users | ❌ | ❌ | ✅ | ✅ |
| Manage Users | ❌ | ❌ | ✅ | ✅ |
| Suspend Users | ❌ | ❌ | ✅ | ✅ |
| Manage Admins | ❌ | ❌ | ❌ | ✅ |
| Create Admins | ❌ | ❌ | ❌ | ✅ |
| Delete Admins | ❌ | ❌ | ❌ | ✅ |

### 📊 **Analytics & Reports**
| Permission | GUEST | USER | ADMIN | SUPER_ADMIN |
|------------|-------|------|-------|-------------|
| View Own Stats | ❌ | ✅ | ✅ | ✅ |
| View Analytics | ❌ | ❌ | ✅ | ✅ |
| View System Stats | ❌ | ❌ | ✅ | ✅ |
| Export Data | ❌ | ❌ | ❌ | ✅ |
| Import Data | ❌ | ❌ | ❌ | ✅ |
| View System Logs | ❌ | ❌ | ❌ | ✅ |

### ⚙️ **System Management**
| Permission | GUEST | USER | ADMIN | SUPER_ADMIN |
|------------|-------|------|-------|-------------|
| Manage Amenities | ❌ | ❌ | ✅ | ✅ |
| Manage Notifications | ❌ | ❌ | ✅ | ✅ |
| System Settings | ❌ | ❌ | ❌ | ✅ |
| Database Management | ❌ | ❌ | ❌ | ✅ |

---

## Database Schema

### User Model
```prisma
model User {
  id            String    @id @default(cuid())
  name          String
  email         String    @unique
  phone         String?   // Phone number for contact
  passwordHash  String?   @map("password_hash")
  googleId      String?   @unique @map("google_id")
  role          String    @default("USER") // GUEST, USER, ADMIN, SUPER_ADMIN
  emailVerified DateTime? @map("email_verified")
  lastLoginAt   DateTime? @map("last_login_at")
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")

  // Relations
  listings      Listing[]
  adminActions  AdminAction[]
  notifications Notification[]
  views         PropertyView[]
  inquiries     PropertyInquiry[]

  @@map("users")
}
```

### Role Constraints
```sql
-- Database constraint for role validation
ALTER TABLE users ADD CONSTRAINT check_role 
CHECK (role IN ('GUEST', 'USER', 'ADMIN', 'SUPER_ADMIN'));
```

---

## Implementation Examples

### Permission Checking
```typescript
import { hasPermission, Permission, UserRole } from '@/lib/permissions'

// Check if user can create listings
if (hasPermission(userRole, Permission.CREATE_LISTING)) {
  // Allow listing creation
}

// Check if user can manage all listings
if (hasPermission(userRole, Permission.MANAGE_ALL_LISTINGS)) {
  // Show admin listing management
}
```

### Route Protection
```typescript
import { canAccessRoute } from '@/lib/permissions'

// Middleware for route protection
export function requirePermission(permission: Permission) {
  return (req: NextRequest) => {
    const userRole = getUserRole(req)
    if (!hasPermission(userRole, permission)) {
      return NextResponse.redirect('/unauthorized')
    }
  }
}
```

### Component-Level Permissions
```typescript
// Show/hide UI elements based on permissions
{hasPermission(userRole, Permission.CREATE_LISTING) && (
  <CreateListingButton />
)}

{hasPermission(userRole, Permission.MANAGE_ALL_LISTINGS) && (
  <AdminListingManagement />
)}
```

---

## Security Considerations

### 1. **Server-Side Validation**
- All permissions must be validated on the server
- Client-side checks are for UX only
- API endpoints must enforce role-based access

### 2. **Database Security**
- Role constraints at database level
- Audit trails for admin actions
- Secure session management

### 3. **API Protection**
```typescript
// Example API route protection
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session || !hasPermission(session.user.role, Permission.VIEW_ANALYTICS)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Proceed with analytics data
}
```

---

## Role Assignment

### Default Roles
- **New Users**: `USER` (default)
- **Guest Users**: `GUEST` (temporary)
- **Admin Users**: `ADMIN` (manual assignment)
- **Super Admin**: `SUPER_ADMIN` (manual assignment)

### Role Promotion
- Only `SUPER_ADMIN` can promote users to `ADMIN`
- Only `SUPER_ADMIN` can create other `SUPER_ADMIN`
- Role changes are logged in `AdminAction` table

---

## Monitoring & Auditing

### Admin Actions Log
```prisma
model AdminAction {
  id         String   @id @default(cuid())
  adminId    String   @map("admin_id")
  listingId  String   @map("listing_id")
  actionType String   @map("action_type") // APPROVE, REJECT, SUSPEND, DELETE
  reason     String?
  createdAt  DateTime @default(now()) @map("created_at")

  // Relations
  admin      User    @relation(fields: [adminId], references: [id], onDelete: Cascade)
  listing    Listing @relation(fields: [listingId], references: [id], onDelete: Cascade)

  @@map("admin_actions")
}
```

### Notification System
- Users notified of listing status changes
- Admins notified of new listings requiring approval
- System notifications for important events

---

## Best Practices

1. **Principle of Least Privilege**: Users get minimum required permissions
2. **Role Hierarchy**: Higher roles inherit lower role permissions
3. **Audit Everything**: Log all admin actions and permission changes
4. **Regular Reviews**: Periodically review user roles and permissions
5. **Secure Defaults**: Default to most restrictive permissions
6. **Clear Documentation**: Maintain clear permission documentation
7. **Testing**: Test all permission scenarios thoroughly
