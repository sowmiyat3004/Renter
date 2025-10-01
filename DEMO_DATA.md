# 🏠 Renter Demo Data

This document outlines all the sample data that has been populated for demonstration purposes.

## 👥 User Accounts

### Admin Accounts
- **Super Admin**: `admin@renter.com` / `admin123`
  - Full system access
  - Can manage other admins
  - Can view all system statistics

- **Admin**: `moderator@renter.com` / `admin123`
  - Can approve/reject listings
  - Can manage user reports
  - Can view admin dashboard

### Regular User
- **Test User**: `user@renter.com` / `user123`
  - Can create and manage listings
  - Can browse all approved listings
  - Can receive notifications

## 🏘️ Sample Property Listings

### 1. **Spacious 2BHK Apartment in Bandra West**
- **Location**: Mumbai, Maharashtra
- **Price**: ₹45,000/month
- **Type**: 2BHK, 2 Bathrooms
- **Status**: Approved
- **Amenities**: WiFi, Air Conditioning, Parking, Security, Elevator
- **Address**: Hill Road, Bandra West, Mumbai - 400050

### 2. **Modern 3BHK Villa in Whitefield**
- **Location**: Bangalore, Karnataka
- **Price**: ₹35,000/month
- **Type**: 3BHK, 3 Bathrooms
- **Status**: Approved
- **Amenities**: WiFi, Parking, Security, Pool, Gym, Garden
- **Address**: ITPL Road, Whitefield, Bangalore - 560066

### 3. **Cozy 1BHK Studio in Connaught Place**
- **Location**: New Delhi, Delhi
- **Price**: ₹25,000/month
- **Type**: 1BHK, 1 Bathroom
- **Status**: Approved
- **Amenities**: WiFi, Air Conditioning, Security, Furnished
- **Address**: Connaught Place, New Delhi - 110001

### 4. **Heritage Bungalow in Civil Lines**
- **Location**: Pune, Maharashtra
- **Price**: ₹40,000/month
- **Type**: 3BHK, 2 Bathrooms
- **Status**: Approved
- **Amenities**: Garden, Parking, Security, Furnished, Balcony
- **Address**: Civil Lines, Pune - 411001

### 5. **Luxury Penthouse in Banjara Hills**
- **Location**: Hyderabad, Telangana
- **Price**: ₹60,000/month
- **Type**: 4BHK, 4 Bathrooms
- **Status**: Approved
- **Amenities**: WiFi, Air Conditioning, Parking, Security, Elevator, Terrace, Gym
- **Address**: Banjara Hills, Hyderabad - 500034

### 6. **Budget-Friendly 1BHK in Koramangala**
- **Location**: Bangalore, Karnataka
- **Price**: ₹18,000/month
- **Type**: 1BHK, 1 Bathroom
- **Status**: Approved
- **Amenities**: WiFi, Security, Furnished
- **Address**: Koramangala, Bangalore - 560034

### 7. **Family Home in Salt Lake City**
- **Location**: Kolkata, West Bengal
- **Price**: ₹22,000/month
- **Type**: 3BHK, 2 Bathrooms
- **Status**: Approved
- **Amenities**: Parking, Security, Garden, Furnished
- **Address**: Salt Lake City, Kolkata - 700064

### 8. **Modern Apartment in Gurgaon**
- **Location**: Gurgaon, Haryana
- **Price**: ₹32,000/month
- **Type**: 2BHK, 2 Bathrooms
- **Status**: Pending (for admin review)
- **Amenities**: WiFi, Air Conditioning, Parking, Security, Elevator
- **Address**: Sector 29, Gurgaon - 122001

### 9. **Beach House in Goa**
- **Location**: Panaji, Goa
- **Price**: ₹28,000/month
- **Type**: 2BHK, 2 Bathrooms
- **Status**: Approved
- **Amenities**: WiFi, Parking, Garden, Furnished, Balcony
- **Address**: Calangute Beach Road, North Goa - 403516

### 10. **Studio Apartment in Cyber City**
- **Location**: Gurgaon, Haryana
- **Price**: ₹20,000/month
- **Type**: 1BHK, 1 Bathroom
- **Status**: Approved
- **Amenities**: WiFi, Air Conditioning, Security, Furnished
- **Address**: Cyber City, Gurgaon - 122002

## 🏢 Amenities Available

The system includes 20+ amenities:
- WiFi
- Parking
- Air Conditioning
- Heating
- Washing Machine
- Dishwasher
- Balcony
- Garden
- Pet Friendly
- Furnished
- Gym
- Pool
- Security
- Elevator
- Furnished Kitchen
- Cable TV
- Internet
- Laundry
- Storage
- Terrace

## 🖼️ Sample Images

Each property listing includes 3 sample images:
- **Primary Image**: Bedroom view
- **Secondary Images**: Living room and kitchen
- **Format**: SVG placeholders with property-specific designs
- **Location**: `public/uploads/sample/`

## 📍 Location Coverage

### States Covered
- Maharashtra (Mumbai, Pune)
- Karnataka (Bangalore)
- Delhi (New Delhi)
- Telangana (Hyderabad)
- West Bengal (Kolkata)
- Haryana (Gurgaon)
- Goa (Panaji)

### Cities with Coordinates
All sample properties include accurate latitude and longitude coordinates for:
- Proximity search functionality
- Map integration
- Location-based filtering

## 💰 Price Range

- **Budget**: ₹18,000 - ₹25,000 (1BHK)
- **Mid-range**: ₹28,000 - ₹40,000 (2-3BHK)
- **Premium**: ₹45,000 - ₹60,000 (3-4BHK)

## 🔄 Demo Workflow

### For Regular Users
1. **Browse Listings**: View all approved properties
2. **Search & Filter**: Use location, price, amenities filters
3. **View Details**: See property details, images, amenities
4. **Create Listing**: Add new property (requires approval)

### For Admins
1. **Review Pending**: Check listings awaiting approval
2. **Approve/Reject**: Make decisions on property listings
3. **View Statistics**: See dashboard with system metrics
4. **Manage Users**: Handle user reports and issues

### For Super Admins
1. **Full Access**: All admin capabilities
2. **System Configuration**: Manage system settings
3. **Admin Management**: Add/remove other admins
4. **Audit Logs**: View all system activities

## 🚀 Getting Started with Demo

1. **Start the application**:
   ```bash
   npm run dev
   ```

2. **Access the application**:
   - URL: http://localhost:3001
   - Login with any of the provided accounts

3. **Test different user roles**:
   - Login as `user@renter.com` to browse and create listings
   - Login as `moderator@renter.com` to review pending listings
   - Login as `admin@renter.com` for full system access

4. **Explore features**:
   - Browse the 10 sample properties
   - Test search and filtering
   - Try creating a new listing
   - Test the admin approval workflow

## 📊 Database Statistics

- **Users**: 3 (1 Super Admin, 1 Admin, 1 Regular User)
- **Listings**: 10 (9 Approved, 1 Pending)
- **Amenities**: 20+ predefined options
- **Images**: 30+ sample images
- **Locations**: 7 major Indian cities
- **Price Range**: ₹18,000 - ₹60,000

## 🎯 Demo Scenarios

### Scenario 1: Property Search
1. Go to homepage
2. Use location search to find properties in Mumbai
3. Filter by price range ₹30,000 - ₹50,000
4. Filter by 2+ bedrooms
5. View property details

### Scenario 2: Create New Listing
1. Login as `user@renter.com`
2. Go to "Create Listing"
3. Fill in property details
4. Upload images
5. Submit for admin approval

### Scenario 3: Admin Review
1. Login as `moderator@renter.com`
2. Go to admin dashboard
3. Review pending listings
4. Approve or reject with reason
5. Check notification system

### Scenario 4: Location-based Search
1. Use the location selector
2. Search for "Bangalore"
3. Set radius to 10km
4. View nearby properties
5. Test proximity search

---

This demo data provides a comprehensive showcase of all the Renter application features with realistic Indian property data! 🇮🇳
