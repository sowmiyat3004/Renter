import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  // Create default amenities
  const amenities = [
    'WiFi',
    'Parking',
    'Air Conditioning',
    'Heating',
    'Washing Machine',
    'Dishwasher',
    'Balcony',
    'Garden',
    'Pet Friendly',
    'Furnished',
    'Gym',
    'Pool',
    'Security',
    'Elevator',
    'Furnished Kitchen',
    'Cable TV',
    'Internet',
    'Laundry',
    'Storage',
    'Terrace'
  ]

  console.log('Creating amenities...')
  for (const amenityName of amenities) {
    await prisma.amenity.upsert({
      where: { name: amenityName },
      update: {},
      create: { name: amenityName },
    })
  }

  // Create super admin user
  console.log('Creating super admin...')
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  const superAdmin = await prisma.user.upsert({
    where: { email: 'admin@renter.com' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'admin@renter.com',
      passwordHash: hashedPassword,
      role: 'SUPER_ADMIN',
      emailVerified: new Date(),
    },
  })

  // Create regular admin user
  console.log('Creating admin...')
  const adminPassword = await bcrypt.hash('admin123', 12)
  
  const admin = await prisma.user.upsert({
    where: { email: 'moderator@renter.com' },
    update: {},
    create: {
      name: 'Moderator',
      email: 'moderator@renter.com',
      passwordHash: adminPassword,
      role: 'ADMIN',
      emailVerified: new Date(),
    },
  })

  // Create test user
  console.log('Creating test user...')
  const userPassword = await bcrypt.hash('user123', 12)
  
  const testUser = await prisma.user.upsert({
    where: { email: 'user@renter.com' },
    update: {},
    create: {
      name: 'Test User',
      email: 'user@renter.com',
      passwordHash: userPassword,
      role: 'USER',
      emailVerified: new Date(),
    },
  })

  // Create system configuration
  console.log('Creating system configuration...')
  const systemConfigs = [
    { key: 'max_images_per_listing', value: '10' },
    { key: 'max_image_size_mb', value: '1' },
    { key: 'default_search_radius_km', value: '10' },
    { key: 'auto_approve_threshold', value: '0' },
    { key: 'site_name', value: 'Renter' },
    { key: 'site_description', value: 'Find your perfect rental property in India' },
    { key: 'default_country', value: 'India' },
    { key: 'default_currency', value: 'INR' },
    { key: 'default_timezone', value: 'Asia/Kolkata' },
    { key: 'currency_symbol', value: '₹' },
  ]

  for (const config of systemConfigs) {
    await prisma.systemConfig.upsert({
      where: { key: config.key },
      update: { value: config.value },
      create: config,
    })
  }

  // Create sample property listings for demo
  console.log('Creating sample property listings...')
  
  const sampleListings = [
    {
      title: "Spacious 2BHK Apartment in Bandra West",
      description: "Beautiful 2 bedroom apartment in the heart of Bandra West. Close to railway station, schools, and shopping centers. Fully furnished with modern amenities.",
      priceAmount: 45000,
      bedrooms: 2,
      bathrooms: 2,
      state: "Maharashtra",
      city: "Mumbai",
      address: "Hill Road, Bandra West, Mumbai - 400050",
      lat: 19.0544,
      lng: 72.8406,
      status: "APPROVED",
      amenities: ["WiFi", "Air Conditioning", "Parking", "Security", "Elevator"]
    },
    {
      title: "Modern 3BHK Villa in Whitefield",
      description: "Luxurious 3 bedroom villa in Whitefield, Bangalore. Gated community with 24/7 security, swimming pool, and gym. Perfect for families.",
      priceAmount: 35000,
      bedrooms: 3,
      bathrooms: 3,
      state: "Karnataka",
      city: "Bangalore",
      address: "ITPL Road, Whitefield, Bangalore - 560066",
      lat: 12.9698,
      lng: 77.7500,
      status: "APPROVED",
      amenities: ["WiFi", "Parking", "Security", "Pool", "Gym", "Garden"]
    },
    {
      title: "Cozy 1BHK Studio in Connaught Place",
      description: "Compact and well-designed 1 bedroom studio in the heart of Delhi. Walking distance to metro station and major shopping areas.",
      priceAmount: 25000,
      bedrooms: 1,
      bathrooms: 1,
      state: "Delhi",
      city: "New Delhi",
      address: "Connaught Place, New Delhi - 110001",
      lat: 28.6315,
      lng: 77.2167,
      status: "APPROVED",
      amenities: ["WiFi", "Air Conditioning", "Security", "Furnished"]
    },
    {
      title: "Heritage Bungalow in Civil Lines",
      description: "Charming heritage bungalow in Civil Lines, Pune. High ceilings, wooden floors, and a beautiful garden. Perfect for those who appreciate vintage architecture.",
      priceAmount: 40000,
      bedrooms: 3,
      bathrooms: 2,
      state: "Maharashtra",
      city: "Pune",
      address: "Civil Lines, Pune - 411001",
      lat: 18.5204,
      lng: 73.8567,
      status: "APPROVED",
      amenities: ["Garden", "Parking", "Security", "Furnished", "Balcony"]
    },
    {
      title: "Luxury Penthouse in Banjara Hills",
      description: "Stunning penthouse with panoramic city views in Banjara Hills, Hyderabad. Modern amenities, private terrace, and premium location.",
      priceAmount: 60000,
      bedrooms: 4,
      bathrooms: 4,
      state: "Telangana",
      city: "Hyderabad",
      address: "Banjara Hills, Hyderabad - 500034",
      lat: 17.4065,
      lng: 78.4772,
      status: "APPROVED",
      amenities: ["WiFi", "Air Conditioning", "Parking", "Security", "Elevator", "Terrace", "Gym"]
    },
    {
      title: "Budget-Friendly 1BHK in Koramangala",
      description: "Affordable 1 bedroom apartment in Koramangala, Bangalore. Close to IT companies, restaurants, and public transport. Great for working professionals.",
      priceAmount: 18000,
      bedrooms: 1,
      bathrooms: 1,
      state: "Karnataka",
      city: "Bangalore",
      address: "Koramangala, Bangalore - 560034",
      lat: 12.9352,
      lng: 77.6245,
      status: "APPROVED",
      amenities: ["WiFi", "Security", "Furnished"]
    },
    {
      title: "Family Home in Salt Lake City",
      description: "Spacious 3 bedroom family home in Salt Lake City, Kolkata. Quiet neighborhood, good schools nearby, and excellent connectivity.",
      priceAmount: 22000,
      bedrooms: 3,
      bathrooms: 2,
      state: "West Bengal",
      city: "Kolkata",
      address: "Salt Lake City, Kolkata - 700064",
      lat: 22.5726,
      lng: 88.3639,
      status: "APPROVED",
      amenities: ["Parking", "Security", "Garden", "Furnished"]
    },
    {
      title: "Modern Apartment in Gurgaon",
      description: "Contemporary 2 bedroom apartment in Gurgaon with modern amenities. Close to metro station and corporate offices.",
      priceAmount: 32000,
      bedrooms: 2,
      bathrooms: 2,
      state: "Haryana",
      city: "Gurgaon",
      address: "Sector 29, Gurgaon - 122001",
      lat: 28.4595,
      lng: 77.0266,
      status: "PENDING",
      amenities: ["WiFi", "Air Conditioning", "Parking", "Security", "Elevator"]
    },
    {
      title: "Beach House in Goa",
      description: "Charming beach house just 200m from the beach in North Goa. Perfect for beach lovers and vacation rentals.",
      priceAmount: 28000,
      bedrooms: 2,
      bathrooms: 2,
      state: "Goa",
      city: "Panaji",
      address: "Calangute Beach Road, North Goa - 403516",
      lat: 15.4909,
      lng: 73.8278,
      status: "APPROVED",
      amenities: ["WiFi", "Parking", "Garden", "Furnished", "Balcony"]
    },
    {
      title: "Studio Apartment in Cyber City",
      description: "Compact studio apartment in Cyber City, Gurgaon. Perfect for working professionals. Fully furnished and ready to move in.",
      priceAmount: 20000,
      bedrooms: 1,
      bathrooms: 1,
      state: "Haryana",
      city: "Gurgaon",
      address: "Cyber City, Gurgaon - 122002",
      lat: 28.5022,
      lng: 77.0955,
      status: "APPROVED",
      amenities: ["WiFi", "Air Conditioning", "Security", "Furnished"]
    }
  ]

  for (const listingData of sampleListings) {
    const listing = await prisma.listing.create({
      data: {
        ownerId: testUser.id,
        title: listingData.title,
        description: listingData.description,
        priceAmount: listingData.priceAmount,
        currency: "INR",
        bedrooms: listingData.bedrooms,
        bathrooms: listingData.bathrooms,
        state: listingData.state,
        city: listingData.city,
        address: listingData.address,
        lat: listingData.lat,
        lng: listingData.lng,
        status: listingData.status,
        amenities: {
          create: listingData.amenities.map(amenityName => ({
            amenity: {
              connect: { name: amenityName }
            }
          }))
        }
      }
    })

    // Create sample images for each listing
    const sampleImages = [
      {
        url: "/uploads/sample/bedroom-1.jpg",
        isPrimary: true,
        width: 800,
        height: 600
      },
      {
        url: "/uploads/sample/living-room-1.jpg",
        isPrimary: false,
        width: 800,
        height: 600
      },
      {
        url: "/uploads/sample/kitchen-1.jpg",
        isPrimary: false,
        width: 800,
        height: 600
      }
    ]

    for (const imageData of sampleImages) {
      await prisma.listingImage.create({
        data: {
          listingId: listing.id,
          url: imageData.url,
          isPrimary: imageData.isPrimary,
          width: imageData.width,
          height: imageData.height
        }
      })
    }
  }

  console.log('Database seeded successfully!')
  console.log('Super Admin:', superAdmin.email, '(password: admin123)')
  console.log('Admin:', admin.email, '(password: admin123)')
  console.log('Test User:', testUser.email, '(password: user123)')
  console.log('Sample Listings: 10 properties created across major Indian cities')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
