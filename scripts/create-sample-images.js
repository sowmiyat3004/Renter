#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('🖼️  Creating sample images for demo...')

// Create uploads directory structure
const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'sample')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
  console.log('✅ Created uploads/sample directory')
}

// Create placeholder image files (SVG format for demo)
const sampleImages = [
  {
    filename: 'bedroom-1.jpg',
    title: 'Modern Bedroom',
    description: 'Spacious bedroom with modern furniture'
  },
  {
    filename: 'living-room-1.jpg', 
    title: 'Living Room',
    description: 'Comfortable living room with sofa and TV'
  },
  {
    filename: 'kitchen-1.jpg',
    title: 'Modern Kitchen',
    description: 'Fully equipped kitchen with modern appliances'
  },
  {
    filename: 'bathroom-1.jpg',
    title: 'Bathroom',
    description: 'Clean and modern bathroom'
  },
  {
    filename: 'exterior-1.jpg',
    title: 'Building Exterior',
    description: 'Beautiful building exterior view'
  }
]

// Create SVG placeholder images
sampleImages.forEach((image, index) => {
  const svgContent = `
<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad${index}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#${Math.floor(Math.random()*16777215).toString(16)};stop-opacity:1" />
      <stop offset="100%" style="stop-color:#${Math.floor(Math.random()*16777215).toString(16)};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#grad${index})"/>
  <text x="50%" y="45%" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="24" font-weight="bold">
    ${image.title}
  </text>
  <text x="50%" y="55%" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16">
    ${image.description}
  </text>
  <text x="50%" y="70%" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="14" opacity="0.8">
    Sample Image for Demo
  </text>
</svg>`

  const filePath = path.join(uploadsDir, image.filename)
  fs.writeFileSync(filePath, svgContent)
  console.log(`✅ Created ${image.filename}`)
})

console.log('🎉 Sample images created successfully!')
console.log('📁 Images saved to: public/uploads/sample/')
console.log('🔗 Access via: http://localhost:3001/uploads/sample/[filename]')
