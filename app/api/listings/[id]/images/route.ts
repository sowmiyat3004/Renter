import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// POST /api/listings/[id]/images - Upload images for a listing
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

    // Check if listing exists and user owns it
    const listing = await prisma.listing.findUnique({
      where: { id: params.id }
    })

    if (!listing) {
      return NextResponse.json(
        { success: false, error: 'Listing not found' },
        { status: 404 }
      )
    }

    if (listing.ownerId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized to upload images for this listing' },
        { status: 403 }
      )
    }

    const formData = await request.formData()
    const images = formData.getAll('images') as File[]

    if (!images || images.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No images provided' },
        { status: 400 }
      )
    }

    // For now, we'll store image URLs as placeholder
    // In production, you'd upload to a service like Cloudinary, AWS S3, etc.
    const imageUrls: string[] = []
    
    for (const image of images) {
      // Create a placeholder URL - in production, upload to cloud storage
      const imageUrl = `/uploads/placeholder-${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`
      imageUrls.push(imageUrl)
    }

    // Save image records to database
    const imageRecords = await Promise.all(
      imageUrls.map(url => 
        prisma.listingImage.create({
          data: {
            listingId: params.id,
            url: url
          }
        })
      )
    )

    return NextResponse.json({
      success: true,
      data: imageRecords,
      message: 'Images uploaded successfully'
    })

  } catch (error) {
    console.error('Upload images error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to upload images' },
      { status: 500 }
    )
  }
}

// DELETE /api/listings/[id]/images/[imageId] - Delete a specific image
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; imageId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if listing exists and user owns it
    const listing = await prisma.listing.findUnique({
      where: { id: params.id }
    })

    if (!listing) {
      return NextResponse.json(
        { success: false, error: 'Listing not found' },
        { status: 404 }
      )
    }

    if (listing.ownerId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized to delete images for this listing' },
        { status: 403 }
      )
    }

    // Delete the image record
    await prisma.listingImage.delete({
      where: { id: params.imageId }
    })

    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully'
    })

  } catch (error) {
    console.error('Delete image error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete image' },
      { status: 500 }
    )
  }
}