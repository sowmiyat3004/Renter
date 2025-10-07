import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const listingId = params.id

    // Get the listing with owner details
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          }
        }
      }
    })

    if (!listing) {
      return NextResponse.json(
        { success: false, error: 'Listing not found' },
        { status: 404 }
      )
    }

    // Check if user has already viewed this contact
    const existingView = await prisma.contactView.findUnique({
      where: {
        listingId_userId: {
          listingId: listingId,
          userId: session.user.id
        }
      }
    })

    // If not viewed before, create a new contact view record
    if (!existingView) {
      await prisma.contactView.create({
        data: {
          listingId: listingId,
          userId: session.user.id
        }
      })

      // Increment contact view count for the listing
      await prisma.listing.update({
        where: { id: listingId },
        data: {
          contactViewCount: {
            increment: 1
          }
        }
      })
    }

    // Return the owner's contact information
    return NextResponse.json({
      success: true,
      data: {
        ownerName: listing.owner.name,
        ownerEmail: listing.owner.email,
        ownerPhone: listing.owner.phone,
        isNewView: !existingView
      }
    })

  } catch (error) {
    console.error('Error fetching contact details:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contact details' },
      { status: 500 }
    )
  }
}
