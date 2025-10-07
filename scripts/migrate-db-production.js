const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function runMigration() {
  try {
    console.log('Starting database migration...')

    // Add contactViewCount column if it doesn't exist
    await prisma.$executeRaw`
      ALTER TABLE listings ADD COLUMN IF NOT EXISTS contact_view_count INTEGER DEFAULT 0
    `

    // Add direction column if it doesn't exist
    await prisma.$executeRaw`
      ALTER TABLE listings ADD COLUMN IF NOT EXISTS direction TEXT
    `

    // Add rent_type column if it doesn't exist
    await prisma.$executeRaw`
      ALTER TABLE listings ADD COLUMN IF NOT EXISTS rent_type TEXT
    `

    // Add property_type column if it doesn't exist
    await prisma.$executeRaw`
      ALTER TABLE listings ADD COLUMN IF NOT EXISTS property_type TEXT
    `

    // Add furnishing column if it doesn't exist
    await prisma.$executeRaw`
      ALTER TABLE listings ADD COLUMN IF NOT EXISTS furnishing TEXT
    `

    // Add posted_by column if it doesn't exist
    await prisma.$executeRaw`
      ALTER TABLE listings ADD COLUMN IF NOT EXISTS posted_by TEXT
    `

    // Add floor_number column if it doesn't exist
    await prisma.$executeRaw`
      ALTER TABLE listings ADD COLUMN IF NOT EXISTS floor_number TEXT
    `

    // Add available_from column if it doesn't exist
    await prisma.$executeRaw`
      ALTER TABLE listings ADD COLUMN IF NOT EXISTS available_from TIMESTAMP
    `

    // Add sharing_type column if it doesn't exist
    await prisma.$executeRaw`
      ALTER TABLE listings ADD COLUMN IF NOT EXISTS sharing_type TEXT
    `

    // Add ac_room column if it doesn't exist
    await prisma.$executeRaw`
      ALTER TABLE listings ADD COLUMN IF NOT EXISTS ac_room BOOLEAN
    `

    // Add gender column if it doesn't exist
    await prisma.$executeRaw`
      ALTER TABLE listings ADD COLUMN IF NOT EXISTS gender TEXT
    `

    // Add bhk column if it doesn't exist
    await prisma.$executeRaw`
      ALTER TABLE listings ADD COLUMN IF NOT EXISTS bhk TEXT
    `

    // Add comments column if it doesn't exist
    await prisma.$executeRaw`
      ALTER TABLE listings ADD COLUMN IF NOT EXISTS comments TEXT
    `

    // Create contact_views table if it doesn't exist
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS contact_views (
        id TEXT PRIMARY KEY,
        listing_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (listing_id, user_id),
        FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `

    console.log('✅ Database migration completed successfully')
  } catch (error) {
    console.error('❌ Migration failed:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

runMigration()
  .then(() => {
    console.log('Migration completed successfully')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Migration failed:', error)
    process.exit(1)
  })
