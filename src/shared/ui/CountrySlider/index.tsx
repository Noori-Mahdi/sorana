'use client'

import Container from '@/shared/components/container'
import HorizontalSlider from '@/shared/components/Slider'
import Image from 'next/image'

const logos = [
  '/country/country1.png',
  '/country/country2.png',
  '/country/country3.png',
  '/country/country4.png',
  '/country/country5.png',
]

export default function CountrySlider() {
  return (
    <Container>
        <ul className='flex justify-between items-center gap-2 bg-bg-primary p-3 rounded-md'>
        {logos.map((src, i) => (
          <div
            key={i}
            className="flex h-[150px] hover:bg-bg-secondary cursor-pointer  p-3 min-w-[150px] items-center justify-center rounded-md transition-transform duration-300 hover:scale-105"
          >
            <Image
              src={src}
              alt={`Logo ${i + 1}`}
              width={100}
              height={100}
              className="object-contain"
            />
          </div>
        ))}</ul>
    </Container>
  )
}
