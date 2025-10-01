# Renter - Indian Rental Property Platform

A comprehensive, production-ready web application for discovering and listing rental properties across India. Built according to detailed Software Requirements Specification (SRS) with Next.js 14, TypeScript, Prisma, and Tailwind CSS, specifically localized for the Indian market.

## 🚀 Features

### 🏠 Core Functionality
- **Multi-Role Authentication** - Email/password and Google OAuth with role-based access control
- **Property Listings** - Create, browse, and manage rental properties with image uploads
- **Advanced Search & Filters** - Location-based proximity search (≤10km), price range, amenities
- **Admin Moderation Workflow** - Comprehensive approval/rejection system with audit trails
- **Real-time Notifications** - Email and in-app notifications for all user actions
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

### 🔐 User Roles & Permissions
- **Guest** - Browse public listings, search, view property details
- **Registered User** - Create/edit/delete own listings, manage profile, receive notifications
- **Admin** - Review and approve/reject listings, manage user reports, view system stats
- **Super Admin** - Full system access, admin management, system configuration

### 🎯 Advanced Features
- **Indian Location Support** - Complete coverage of Indian states, cities, and districts
- **Indian Currency (₹)** - Full INR support with Indian number formatting
- **Geolocation Search** - Haversine formula for accurate proximity calculations across India
- **Image Management** - Multi-image upload with compression, validation, and CDN support
- **Amenities System** - Comprehensive property features with filtering
- **Security Features** - Rate limiting, input sanitization, XSS protection, CSRF protection
- **Performance Optimized** - Lazy loading, image optimization, efficient database queries
- **Accessibility** - WCAG 2.1 AA compliance, keyboard navigation
- **Indian Localization** - Phone number validation, address formatting, date formats

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: SQLite (development) / PostgreSQL (production)
- **Authentication**: NextAuth.js with JWT tokens and Google OAuth
- **File Processing**: Sharp for image optimization, Multer for uploads
- **Email**: Nodemailer with SMTP configuration
- **Maps**: Leaflet for interactive maps and geolocation
- **Security**: DOMPurify, bcrypt, rate limiting, security headers
- **UI Components**: Headless UI, Lucide React icons

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** - Latest LTS version recommended
- **npm or yarn** - Package manager
- **Google OAuth credentials** (optional but recommended)
- **SMTP email service** (optional for notifications)

### 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd renter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Configure your environment variables in `.env.local`:
   ```env
   # Database (SQLite for development)
   DATABASE_URL="file:./dev.db"
   
   # NextAuth Configuration
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-super-secret-key-change-this-in-production"
   
   # Google OAuth (Get from Google Cloud Console)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   
   # JWT Configuration
   JWT_SECRET="your-jwt-secret-key-change-this-in-production"
   
   # Email Configuration (Optional)
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT="587"
   SMTP_USER="your-email@gmail.com"
   SMTP_PASS="your-app-password"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Seed the database with initial data
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### 🔑 Default Accounts

After seeding, you'll have these accounts available:

- **Super Admin**: `admin@renter.com` / `admin123`
- **Admin**: `moderator@renter.com` / `admin123`  
- **Test User**: `user@renter.com` / `user123`

## Database Schema

The application uses the following main entities:

- **Users** - User accounts with role-based access
- **Listings** - Property listings with status tracking
- **ListingImages** - Property photos with primary image support
- **Amenities** - Property features and facilities
- **AdminActions** - Audit trail for admin decisions

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `GET /api/auth/[...nextauth]` - NextAuth.js endpoints

### Listings
- `GET /api/listings` - Search and filter listings
- `POST /api/listings` - Create new listing
- `GET /api/listings/[id]` - Get single listing
- `PUT /api/listings/[id]` - Update listing
- `DELETE /api/listings/[id]` - Delete listing

### Admin
- `GET /api/admin/listings` - Get listings for moderation
- `POST /api/admin/listings` - Admin actions (approve/reject)
- `GET /api/admin/stats` - Dashboard statistics

### User
- `GET /api/user/listings` - User's own listings

## Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

### Other Platforms

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXTAUTH_URL` | Application URL | Yes |
| `NEXTAUTH_SECRET` | NextAuth.js secret | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | No |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | No |
| `JWT_SECRET` | JWT signing secret | Yes |
| `SMTP_HOST` | Email server host | No |
| `SMTP_PORT` | Email server port | No |
| `SMTP_USER` | Email username | No |
| `SMTP_PASS` | Email password | No |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@renter.com or create an issue in the repository.

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.
