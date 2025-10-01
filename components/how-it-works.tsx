import { Search, FileText, CheckCircle, Home } from 'lucide-react'

const steps = [
  {
    icon: Search,
    title: 'Browse Properties',
    description: 'Search through thousands of verified rental properties using our advanced filters and location-based search.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    icon: FileText,
    title: 'Create Your Listing',
    description: 'List your property with detailed descriptions, high-quality photos, and all the amenities you offer.',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    icon: CheckCircle,
    title: 'Get Approved',
    description: 'Our admin team reviews and approves all listings to ensure quality and accuracy for our users.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    icon: Home,
    title: 'Find Your Home',
    description: 'Connect with property owners, schedule viewings, and find your perfect rental property.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our simple 4-step process makes finding and listing rental properties 
            easy and secure for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="text-center group">
              {/* Step Number */}
              <div className="relative mb-6">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${step.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className={`h-8 w-8 ${step.color}`} />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-primary-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Join thousands of users who have found their perfect rental property with Renter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/listings"
                className="btn-primary btn-lg"
              >
                Browse Properties
              </a>
              <a
                href="/listings/create"
                className="btn-secondary btn-lg"
              >
                List Your Property
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
