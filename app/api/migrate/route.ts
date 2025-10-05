import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function runMigration() {
  // Create tables using raw SQL
  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT,
      password_hash TEXT,
      google_id TEXT UNIQUE,
      role TEXT DEFAULT 'USER' CHECK (role IN ('USER', 'SUPER_ADMIN')),
      email_verified TIMESTAMP,
      last_login_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  // Add phone column if it doesn't exist
  await prisma.$executeRaw`
    ALTER TABLE users ADD COLUMN IF NOT EXISTS phone TEXT
  `;

  // Add last_login_at column if it doesn't exist
  await prisma.$executeRaw`
    ALTER TABLE users ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMP
  `;

  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS listings (
      id TEXT PRIMARY KEY,
      owner_id TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      price_amount REAL NOT NULL,
      currency TEXT DEFAULT 'INR',
      bedrooms INTEGER NOT NULL,
      bathrooms INTEGER NOT NULL,
      state TEXT NOT NULL,
      district TEXT,
      city TEXT NOT NULL,
      locality TEXT,
      address TEXT,
      lat REAL NOT NULL,
      lng REAL NOT NULL,
      status TEXT DEFAULT 'PENDING',
      view_count INTEGER DEFAULT 0,
      inquiry_count INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `;

  // Add analytics columns if they don't exist
  await prisma.$executeRaw`
    ALTER TABLE listings ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0
  `;

  await prisma.$executeRaw`
    ALTER TABLE listings ADD COLUMN IF NOT EXISTS inquiry_count INTEGER DEFAULT 0
  `;

  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS listing_images (
      id TEXT PRIMARY KEY,
      listing_id TEXT NOT NULL,
      url TEXT NOT NULL,
      is_primary BOOLEAN DEFAULT FALSE,
      width INTEGER,
      height INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
    )
  `;

  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS amenities (
      id TEXT PRIMARY KEY,
      name TEXT UNIQUE NOT NULL
    )
  `;

  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS listing_amenities (
      id TEXT PRIMARY KEY,
      listing_id TEXT NOT NULL,
      amenity_id TEXT NOT NULL,
      UNIQUE(listing_id, amenity_id),
      FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,
      FOREIGN KEY (amenity_id) REFERENCES amenities(id) ON DELETE CASCADE
    )
  `;

  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS admin_actions (
      id TEXT PRIMARY KEY,
      admin_id TEXT NOT NULL,
      listing_id TEXT NOT NULL,
      action_type TEXT NOT NULL,
      reason TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
    )
  `;

  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS notifications (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      type TEXT NOT NULL,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      listing_id TEXT,
      is_read BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `;

  // Create property views table
  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS property_views (
      id TEXT PRIMARY KEY,
      listing_id TEXT NOT NULL,
      user_id TEXT,
      ip_address TEXT,
      user_agent TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    )
  `;

  // Create property inquiries table
  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS property_inquiries (
      id TEXT PRIMARY KEY,
      listing_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      message TEXT,
      phone TEXT,
      email TEXT,
      status TEXT DEFAULT 'PENDING',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `;

  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS system_config (
      id TEXT PRIMARY KEY,
      key TEXT UNIQUE NOT NULL,
      value TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  console.log('✅ Database tables created successfully');

  // Create test users
  const bcrypt = require('bcryptjs');
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  // Create super admin
  await prisma.user.upsert({
    where: { email: 'admin@renter.com' },
    update: {},
    create: {
      id: 'admin-001',
      name: 'Super Admin',
      email: 'admin@renter.com',
      passwordHash: hashedPassword,
      role: 'SUPER_ADMIN',
      emailVerified: new Date()
    }
  });

  // Create regular user
  await prisma.user.upsert({
    where: { email: 'user@renter.com' },
    update: {},
    create: {
      id: 'user-001',
      name: 'Test User',
      email: 'user@renter.com',
      passwordHash: userPassword,
      role: 'USER',
      emailVerified: new Date()
    }
  });

  // Create moderator
  await prisma.user.upsert({
    where: { email: 'moderator@renter.com' },
    update: {},
    create: {
      id: 'mod-001',
      name: 'Moderator',
      email: 'moderator@renter.com',
      passwordHash: hashedPassword,
      role: 'ADMIN',
      emailVerified: new Date()
    }
  });

  console.log('✅ Test users created successfully');
  console.log('📧 Admin: admin@renter.com / admin123');
  console.log('📧 User: user@renter.com / user123');
  console.log('📧 Moderator: moderator@renter.com / admin123');
}

export async function GET(request: NextRequest) {
  try {
    console.log('Starting database migration via GET request...');
    
    // Run database migration
    await runMigration();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database migration completed successfully via GET request' 
    });

  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json({ 
      error: 'Migration failed', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: NextRequest) {
  try {
    // Security: Only allow in development or with proper authentication
    const authHeader = request.headers.get('authorization');
    const expectedToken = process.env.MIGRATION_TOKEN || 'your-migration-token';
    
    if (authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Run database migration
    console.log('Starting database migration...');
    
    // This will create tables if they don't exist
    await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT,
      google_id TEXT UNIQUE,
      role TEXT DEFAULT 'USER',
      email_verified TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

    await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS listings (
      id TEXT PRIMARY KEY,
      owner_id TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      price_amount REAL NOT NULL,
      currency TEXT DEFAULT 'INR',
      bedrooms INTEGER NOT NULL,
      bathrooms INTEGER NOT NULL,
      state TEXT NOT NULL,
      city TEXT NOT NULL,
      address TEXT,
      lat REAL NOT NULL,
      lng REAL NOT NULL,
      status TEXT DEFAULT 'PENDING',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
    )`;

    await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS listing_images (
      id TEXT PRIMARY KEY,
      listing_id TEXT NOT NULL,
      url TEXT NOT NULL,
      is_primary BOOLEAN DEFAULT FALSE,
      width INTEGER,
      height INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
    )`;

    await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS amenities (
      id TEXT PRIMARY KEY,
      name TEXT UNIQUE NOT NULL
    )`;

    await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS listing_amenities (
      id TEXT PRIMARY KEY,
      listing_id TEXT NOT NULL,
      amenity_id TEXT NOT NULL,
      UNIQUE(listing_id, amenity_id),
      FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,
      FOREIGN KEY (amenity_id) REFERENCES amenities(id) ON DELETE CASCADE
    )`;

    await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS admin_actions (
      id TEXT PRIMARY KEY,
      admin_id TEXT NOT NULL,
      listing_id TEXT NOT NULL,
      action_type TEXT NOT NULL,
      reason TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
    )`;

    await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS notifications (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      type TEXT NOT NULL,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      listing_id TEXT,
      is_read BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`;

    await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS system_config (
      id TEXT PRIMARY KEY,
      key TEXT UNIQUE NOT NULL,
      value TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

    console.log('Database migration completed successfully');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database migration completed successfully' 
    });

  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json({ 
      error: 'Migration failed', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
