#!/usr/bin/env node

/**
 * Manual Database Migration Script
 * Run this to set up the database and create test users
 */

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function migrateDatabase() {
  try {
    console.log('🚀 Starting database migration...');
    
    // Create tables using raw SQL
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT,
        google_id TEXT UNIQUE,
        role TEXT DEFAULT 'USER',
        email_verified TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
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
        city TEXT NOT NULL,
        address TEXT,
        lat REAL NOT NULL,
        lng REAL NOT NULL,
        status TEXT DEFAULT 'PENDING',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS listing_images (
        id TEXT PRIMARY KEY,
        listing_id TEXT NOT NULL,
        url TEXT NOT NULL,
        is_primary BOOLEAN DEFAULT FALSE,
        width INTEGER,
        height INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
        UNIQUE(listing_id, amenity_id)
      )
    `;

    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS admin_actions (
        id TEXT PRIMARY KEY,
        admin_id TEXT NOT NULL,
        listing_id TEXT NOT NULL,
        action_type TEXT NOT NULL,
        reason TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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

    console.log('\n🎉 Database migration completed successfully!');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

migrateDatabase();
