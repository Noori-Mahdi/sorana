'use client'

import Container from '@/shared/components/container'
import HorizontalSlider from '@/shared/components/Slider'
import Image from 'next/image'

const logos = [
  '/uploads/company/1758177272938-5ec3e2db58550c0004427740 (1).png',
  '/uploads/company/1758177310388-5ec3e1ee58550c0004427739.png',
  '/uploads/company/1758177543431-5ec3e3ad58550c0004427746.png',
  '/uploads/company/1758177992853-5ec3e3d458550c0004427747.png',
  '/uploads/company/1758178802280-5ec3e25258550c000442773c.png',
  '/uploads/company/1758179010593-580b57fcd9996e24bc43c4a5.png',
  '/uploads/company/1758177272938-5ec3e2db58550c0004427740 (1).png',
  '/uploads/company/1758177310388-5ec3e1ee58550c0004427739.png',
  '/uploads/company/1758177543431-5ec3e3ad58550c0004427746.png',
  '/uploads/company/1758177992853-5ec3e3d458550c0004427747.png',
  '/uploads/company/1758178802280-5ec3e25258550c000442773c.png',
  '/uploads/company/1758179010593-580b57fcd9996e24bc43c4a5.png',
  '/uploads/company/1758177272938-5ec3e2db58550c0004427740 (1).png',
  '/uploads/company/1758177310388-5ec3e1ee58550c0004427739.png',
  '/uploads/company/1758177543431-5ec3e3ad58550c0004427746.png',
  '/uploads/company/1758177992853-5ec3e3d458550c0004427747.png',
  '/uploads/company/1758178802280-5ec3e25258550c000442773c.png',
  '/uploads/company/1758179010593-580b57fcd9996e24bc43c4a5.png',
  '/uploads/company/1758177272938-5ec3e2db58550c0004427740 (1).png',
  '/uploads/company/1758177310388-5ec3e1ee58550c0004427739.png',
  '/uploads/company/1758177543431-5ec3e3ad58550c0004427746.png',
  '/uploads/company/1758177992853-5ec3e3d458550c0004427747.png',
  '/uploads/company/1758178802280-5ec3e25258550c000442773c.png',
  '/uploads/company/1758179010593-580b57fcd9996e24bc43c4a5.png',
  '/uploads/company/1758177272938-5ec3e2db58550c0004427740 (1).png',
  '/uploads/company/1758177310388-5ec3e1ee58550c0004427739.png',
  '/uploads/company/1758177543431-5ec3e3ad58550c0004427746.png',
  '/uploads/company/1758177992853-5ec3e3d458550c0004427747.png',
  '/uploads/company/1758178802280-5ec3e25258550c000442773c.png',
  '/uploads/company/1758179010593-580b57fcd9996e24bc43c4a5.png',
  '/uploads/company/1758177272938-5ec3e2db58550c0004427740 (1).png',
  '/uploads/company/1758177310388-5ec3e1ee58550c0004427739.png',
  '/uploads/company/1758177543431-5ec3e3ad58550c0004427746.png',
  '/uploads/company/1758177992853-5ec3e3d458550c0004427747.png',
  '/uploads/company/1758178802280-5ec3e25258550c000442773c.png',
  '/uploads/company/1758179010593-580b57fcd9996e24bc43c4a5.png',
]

export default function LogoSlider() {
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
