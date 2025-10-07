import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Toaster } from 'react-hot-toast'
import { FixedHeader } from '@/components/fixed-header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Broker360 - Professional Property Management Platform',
  description: 'Professional property management platform with comprehensive listing management, user verification, and advanced search capabilities.',
  keywords: ['property management', 'real estate', 'broker', 'property listings', 'rental management', 'property search'],
  authors: [{ name: 'Broker360 Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Broker360 - Professional Property Management Platform',
    description: 'Professional property management with comprehensive listing management.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Broker360 - Professional Property Management Platform',
    description: 'Professional property management with comprehensive listing management.',
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
          <FixedHeader />
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
