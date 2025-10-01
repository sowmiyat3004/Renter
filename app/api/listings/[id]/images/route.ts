import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import sharp from 'sharp'

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

    const listingId = params.id

    // Check if listing exists and user owns it
    const listing = await prisma.listing.findFirst({
      where: {
        id: listingId,
        ownerId: session.user.id
      }
    })

    if (!listing) {
      return NextResponse.json(
        { success: false, error: 'Listing not found or unauthorized' },
        { status: 404 }
      )
    }

    const formData = await request.formData()
    const files = formData.getAll('images') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No images provided' },
        { status: 400 }
      )
    }

    // Check if listing already has maximum number of images
    const existingImagesCount = await prisma.listingImage.count({
      where: { listingId }
    })

    const maxImages = 10 // From system config
    if (existingImagesCount + files.length > maxImages) {
      return NextResponse.json(
        { success: false, error: `Maximum ${maxImages} images allowed per listing` },
        { status: 400 }
      )
    }

    const uploadedImages = []

    for (const file of files) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        return NextResponse.json(
          { success: false, error: 'Only image files are allowed' },
          { status: 400 }
        )
      }

      // Validate file size (1MB limit)
      const maxSize = 1 * 1024 * 1024 // 1MB
      if (file.size > maxSize) {
        return NextResponse.json(
          { success: false, error: 'Image size must be less than 1MB' },
          { status: 400 }
        )
      }

      // Create uploads directory if it doesn't exist
      const uploadsDir = join(process.cwd(), 'public', 'uploads', listingId)
      if (!existsSync(uploadsDir)) {
        await mkdir(uploadsDir, { recursive: true })
      }

      // Generate unique filename
      const timestamp = Date.now()
      const randomString = Math.random().toString(36).substring(2, 15)
      const fileExtension = file.name.split('.').pop()
      const filename = `${timestamp}_${randomString}.${fileExtension}`
      const filepath = join(uploadsDir, filename)

      // Convert file to buffer
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Compress and optimize image
      const optimizedBuffer = await sharp(buffer)
        .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 85 })
        .toBuffer()

      // Write file
      await writeFile(filepath, optimizedBuffer)

      // Get image dimensions
      const metadata = await sharp(optimizedBuffer).metadata()

      // Save to database
      const imageUrl = `/uploads/${listingId}/${filename}`
      const isPrimary = existingImagesCount === 0 // First image is primary

      const savedImage = await prisma.listingImage.create({
        data: {
          listingId,
          url: imageUrl,
          isPrimary,
          width: metadata.width,
          height: metadata.height,
        }
      })

      uploadedImages.push(savedImage)
    }

    return NextResponse.json({
      success: true,
      data: uploadedImages,
      message: 'Images uploaded successfully'
    })

  } catch (error) {
    console.error('Image upload error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to upload images' },
      { status: 500 }
    )
  }
}

// DELETE /api/listings/[id]/images/[imageId] - Delete an image
export async function DELETE(
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
    const { searchParams } = new URL(request.url)
    const imageId = searchParams.get('imageId')

    if (!imageId) {
      return NextResponse.json(
        { success: false, error: 'Image ID is required' },
        { status: 400 }
      )
    }

    // Check if listing exists and user owns it
    const listing = await prisma.listing.findFirst({
      where: {
        id: listingId,
        ownerId: session.user.id
      }
    })

    if (!listing) {
      return NextResponse.json(
        { success: false, error: 'Listing not found or unauthorized' },
        { status: 404 }
      )
    }

    // Check if image exists and belongs to listing
    const image = await prisma.listingImage.findFirst({
      where: {
        id: imageId,
        listingId
      }
    })

    if (!image) {
      return NextResponse.json(
        { success: false, error: 'Image not found' },
        { status: 404 }
      )
    }

    // Delete image from database
    await prisma.listingImage.delete({
      where: { id: imageId }
    })

    // TODO: Delete physical file from filesystem
    // This would be implemented with a file cleanup service

    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully'
    })

  } catch (error) {
    console.error('Image delete error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete image' },
      { status: 500 }
    )
  }
}
