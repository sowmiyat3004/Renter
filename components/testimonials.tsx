import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Renter',
    location: 'New York, NY',
    content: 'Renter made finding my apartment so easy! The search filters helped me find exactly what I was looking for, and the property details were accurate.',
    rating: 5,
    image: '/images/testimonial-1.jpg',
  },
  {
    name: 'Michael Chen',
    role: 'Property Owner',
    location: 'Los Angeles, CA',
    content: 'Listing my property on Renter was straightforward. The admin approval process ensures quality, and I\'ve had great tenants through the platform.',
    rating: 5,
    image: '/images/testimonial-2.jpg',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Renter',
    location: 'Chicago, IL',
    content: 'The location-based search is fantastic! I found my current apartment just 2 blocks from my office. The photos and descriptions were spot-on.',
    rating: 5,
    image: '/images/testimonial-3.jpg',
  },
  {
    name: 'David Thompson',
    role: 'Property Owner',
    location: 'Austin, TX',
    content: 'As a landlord, I appreciate the verification process. It gives renters confidence, and I get serious inquiries from qualified tenants.',
    rating: 5,
    image: '/images/testimonial-4.jpg',
  },
]

export function Testimonials() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600">
            Don't just take our word for it - hear from our satisfied community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card group hover:shadow-lg transition-shadow duration-300">
              <div className="card-body">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="h-8 w-8 text-primary-600" />
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-gray-600 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-semibold text-sm">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role} • {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Rating */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center bg-white rounded-lg shadow-sm px-6 py-4">
            <div className="flex items-center mr-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-gray-900">4.9 out of 5</div>
              <div className="text-sm text-gray-600">Based on 1,200+ reviews</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
