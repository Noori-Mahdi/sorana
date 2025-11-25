'use client'

import Container from '@/shared/components/container'
import HorizontalSlider from '@/shared/components/Slider'
import Image from 'next/image'

const logos = [
  '/uploads/provider/provider1.png',
  '/uploads/provider/provider1.png',
  '/uploads/provider/provider1.png',
  '/uploads/provider/provider1.png',
  '/uploads/provider/provider1.png',
  '/uploads/provider/provider1.png',
  '/uploads/provider/provider1.png',
  '/uploads/provider/provider1.png',
]

export default function ProviderSlider() {
  return (
    <Container>
      <HorizontalSlider>
        {logos.map((src, i) => (
          <div
            key={i}
            className="flex h-[120px] min-w-[120px] items-center justify-center rounded-md transition-transform duration-300 hover:scale-105"
          >
            <Image
              src={src}
              alt={`Logo ${i + 1}`}
              width={100}
              height={100}
              className="object-contain"
            />
          </div>
        ))}
      </HorizontalSlider>
    </Container>
  )
}
