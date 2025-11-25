'use client'

import { ReactNode, useRef, useState, MouseEvent, TouchEvent } from 'react'

interface HorizontalSliderProps {
  children: ReactNode
  title?: string
}

const HorizontalSlider: React.FC<HorizontalSliderProps> = ({
  children,
  title,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -200 : 200, // حرکت ثابت
        behavior: 'smooth',
      })
    }
  }

  const startDrag = (
    e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
  ) => {
    setIsDragging(true)
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX
    setStartX(pageX)
    if (sliderRef.current) setScrollLeft(sliderRef.current.scrollLeft)
  }

  const stopDrag = () => setIsDragging(false)

  const onDrag = (
    e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>
  ) => {
    if (!isDragging || !sliderRef.current) return
    e.preventDefault()
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX
    const walk = startX - pageX
    sliderRef.current.scrollLeft = scrollLeft + walk
  }

  return (
    <div className="bg-bg-primary relative w-full rounded-xl px-5">
      <button
        onClick={() => scroll('left')}
        className="bg-bg-secondary absolute top-1/2 left-0 z-10 -translate-y-1/2 rounded-tr-xl rounded-br-xl p-2 shadow-md"
      >
        &#8592;
      </button>
      {title && <div className="text-base font-bold p-1">{title}:</div>}

      <div
        ref={sliderRef}
        className="flex cursor-grab space-x-4 overflow-x-hidden py-4 px-3"
        onMouseDown={startDrag}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onMouseMove={onDrag}
        onTouchStart={startDrag}
        onTouchEnd={stopDrag}
        onTouchMove={onDrag}
      >
        {children}
      </div>

      <button
        onClick={() => scroll('right')}
        className="bg-bg-secondary absolute top-1/2 right-0 z-10 -translate-y-1/2 rounded-tl-xl rounded-bl-xl p-2 shadow-md"
      >
        &#8594;
      </button>
    </div>
  )
}

export default HorizontalSlider
