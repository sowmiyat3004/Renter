import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Test database connection
    const userCount = await prisma.user.count();
    
    // Test if we can find the test users
    const adminUser = await prisma.user.findFirst({
      where: { email: 'admin@renter.com' }
    });
    
    const testUser = await prisma.user.findFirst({
      where: { email: 'user@renter.com' }
    });

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      data: {
        totalUsers: userCount,
        adminUser: adminUser ? { email: adminUser.email, role: adminUser.role } : null,
        testUser: testUser ? { email: testUser.email, role: testUser.role } : null,
        databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not set'
      }
    });

  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json({
      success: false,
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not set'
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
