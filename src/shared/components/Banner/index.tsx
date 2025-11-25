'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

// Type definitions
interface BannerImage {
  src: string
  alt?: string
}

interface BannerSliderProps {
  images: BannerImage[]
  interval?: number
  showDots?: boolean
  showArrows?: boolean
  height?: string
}

export default function BannerSlider({
  images,
  interval = 4000,
  showDots = true,
  showArrows = true,
  height = 'h-64 md:h-96',
}: BannerSliderProps) {
  const [index, setIndex] = useState<number>(0)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-play
  useEffect(() => {
    if (!images || images.length <= 1) return
    if (isPaused) return

    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, interval)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [index, isPaused, images, interval])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, images.length])

  const next = () => setIndex((i) => (i + 1) % images.length)
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length)

  if (!images || images.length === 0) return null

  return (
    <div
      className={`relative overflow-hidden ${height} w-full bg-gradient-to-b from-gray-900 to-black`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
    >
      {/* Slides container */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img, i) => (
          <div key={i} className="relative h-full w-full flex-shrink-0">
            <Image
              src={img.src}
              alt={img.alt || `slide-${i}`}
              fill
              style={{ objectFit: 'cover' }}
              sizes="100vw"
              priority={i === 0}
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}
      </div>

      {/* Arrows */}
      {showArrows && images.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute top-1/2 left-3 z-20 -translate-y-1/2 rounded-full bg-black/40 p-2 ring-1 ring-white/10 transition hover:bg-black/60"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute top-1/2 right-3 z-20 -translate-y-1/2 rounded-full bg-black/40 p-2 ring-1 ring-white/10 transition hover:bg-black/60"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 w-8 rounded-full transition-all ${
                i === index ? 'w-8 bg-white' : 'bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
