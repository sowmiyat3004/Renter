import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Toaster } from 'react-hot-toast'
import { EnhancedHeader } from '@/components/enhanced-header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Renter - Find Your Perfect Rental Property',
  description: 'Discover and list rental properties with ease. Browse through verified listings, find properties near you, and manage your own listings.',
  keywords: ['rental', 'property', 'real estate', 'housing', 'apartment', 'house'],
  authors: [{ name: 'Renter Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Renter - Find Your Perfect Rental Property',
    description: 'Discover and list rental properties with ease.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Renter - Find Your Perfect Rental Property',
    description: 'Discover and list rental properties with ease.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <Providers>
          <EnhancedHeader />
          <main className="min-h-screen">
            {children}
          </main>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
