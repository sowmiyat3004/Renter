import { Suspense } from 'react'
import { Hero } from '@/components/hero'
import { SearchBar } from '@/components/search-bar'
import { FeaturedListings } from '@/components/featured-listings'
import { HowItWorks } from '@/components/how-it-works'
import { Stats } from '@/components/stats'
import { Testimonials } from '@/components/testimonials'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <Hero />
        <SearchBar />
        <Suspense fallback={<div className="h-96 bg-gray-200 animate-pulse" />}>
          <FeaturedListings />
        </Suspense>
        <HowItWorks />
        <Stats />
        <Testimonials />
      </main>
      
      <Footer />
    </div>
  )
}
