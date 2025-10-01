import { NextRequest, NextResponse } from 'next/server'

export class PerformanceMonitor {
  private static startTimes = new Map<string, number>()

  static startTimer(label: string): void {
    this.startTimes.set(label, performance.now())
  }

  static endTimer(label: string): number {
    const startTime = this.startTimes.get(label)
    if (!startTime) {
      console.warn(`Timer '${label}' was not started`)
      return 0
    }
    
    const duration = performance.now() - startTime
    this.startTimes.delete(label)
    return duration
  }

  static measureAsync<T>(
    label: string,
    fn: () => Promise<T>
  ): Promise<T> {
    this.startTimer(label)
    return fn().finally(() => {
      const duration = this.endTimer(label)
      console.log(`⏱️  ${label}: ${duration.toFixed(2)}ms`)
    })
  }

  static measureSync<T>(
    label: string,
    fn: () => T
  ): T {
    this.startTimer(label)
    const result = fn()
    const duration = this.endTimer(label)
    console.log(`⏱️  ${label}: ${duration.toFixed(2)}ms`)
    return result
  }
}

// Database query optimization utilities
export class QueryOptimizer {
  static getListingWithDetails() {
    return {
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        images: {
          select: {
            id: true,
            url: true,
            isPrimary: true,
            width: true,
            height: true,
          }
        },
        amenities: {
          include: {
            amenity: {
              select: {
                id: true,
                name: true,
              }
            }
          }
        }
      }
    }
  }

  static getListingSummary() {
    return {
      select: {
        id: true,
        title: true,
        priceAmount: true,
        bedrooms: true,
        bathrooms: true,
        state: true,
        city: true,
        lat: true,
        lng: true,
        status: true,
        createdAt: true,
        images: {
          select: {
            url: true,
            isPrimary: true,
          },
          take: 1,
        }
      }
    }
  }
}

// Image optimization utilities
export class ImageOptimizer {
  static getOptimizedImageUrl(
    originalUrl: string,
    width?: number,
    height?: number,
    quality: number = 85
  ): string {
    // In production, this would generate CDN URLs with optimization parameters
    // For now, return the original URL
    return originalUrl
  }

  static getResponsiveImageUrls(originalUrl: string): {
    thumbnail: string
    medium: string
    large: string
    original: string
  } {
    return {
      thumbnail: this.getOptimizedImageUrl(originalUrl, 300, 300, 80),
      medium: this.getOptimizedImageUrl(originalUrl, 600, 600, 85),
      large: this.getOptimizedImageUrl(originalUrl, 1200, 1200, 90),
      original: originalUrl
    }
  }
}

// Caching utilities
export class CacheManager {
  private static cache = new Map<string, { data: any; expiry: number }>()

  static set(key: string, data: any, ttlMs: number = 5 * 60 * 1000): void {
    this.cache.set(key, {
      data,
      expiry: Date.now() + ttlMs
    })
  }

  static get(key: string): any | null {
    const item = this.cache.get(key)
    if (!item) return null

    if (Date.now() > item.expiry) {
      this.cache.delete(key)
      return null
    }

    return item.data
  }

  static clear(): void {
    this.cache.clear()
  }

  static cleanup(): void {
    const now = Date.now()
    for (const [key, item] of Array.from(this.cache.entries())) {
      if (now > item.expiry) {
        this.cache.delete(key)
      }
    }
  }
}

// Performance middleware
export function withPerformanceMonitoring(
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const startTime = performance.now()
    
    try {
      const response = await handler(req)
      
      const duration = performance.now() - startTime
      response.headers.set('X-Response-Time', `${duration.toFixed(2)}ms`)
      
      // Log slow requests
      if (duration > 1000) {
        console.warn(`🐌 Slow request: ${req.url} took ${duration.toFixed(2)}ms`)
      }
      
      return response
    } catch (error) {
      const duration = performance.now() - startTime
      console.error(`❌ Request failed: ${req.url} took ${duration.toFixed(2)}ms`, error)
      throw error
    }
  }
}

// Database connection pooling optimization
export class DatabaseOptimizer {
  static getConnectionConfig() {
    return {
      // SQLite doesn't support connection pooling, but this would be used for PostgreSQL
      connectionLimit: 10,
      acquireTimeout: 60000,
      timeout: 60000,
      reconnect: true,
    }
  }

  static getQueryConfig() {
    return {
      // Enable query logging in development
      log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
      // Optimize for read-heavy workloads
      datasources: {
        db: {
          url: process.env.DATABASE_URL
        }
      }
    }
  }
}
