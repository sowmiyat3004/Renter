import { Users, Home, MapPin, Star } from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: '10,000+',
    label: 'Active Users',
    description: 'Happy renters and property owners',
  },
  {
    icon: Home,
    value: '5,000+',
    label: 'Properties Listed',
    description: 'Verified rental properties',
  },
  {
    icon: MapPin,
    value: '50+',
    label: 'Cities Covered',
    description: 'Across major metropolitan areas',
  },
  {
    icon: Star,
    value: '4.9/5',
    label: 'User Rating',
    description: 'Based on user reviews',
  },
]

export function Stats() {
  return (
    <section className="py-16 bg-primary-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-primary-100">
            Join our growing community of satisfied users
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4 group-hover:bg-opacity-30 transition-all duration-300">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              
              <div className="text-4xl font-bold text-white mb-2">
                {stat.value}
              </div>
              
              <div className="text-lg font-semibold text-white mb-2">
                {stat.label}
              </div>
              
              <div className="text-primary-100 text-sm">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
