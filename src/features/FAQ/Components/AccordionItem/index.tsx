'use client'

import React, { useState, useRef, useEffect } from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { twMerge } from 'tailwind-merge'

export type TAccordionItemProps = {
  id: string
  header: string
  body: string
  option: React.ReactNode
}

const AccordionItem = ({ id, header, body, option }: TAccordionItemProps) => {
  const [open, setOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const [height, setHeight] = useState('0px')

  useEffect(() => {
    if (contentRef.current) {
      setHeight(open ? `${contentRef.current.scrollHeight}px` : '0px')
    }
  }, [open])

  return (
    <div
      className="border-primary-700 bg-bg-primary cursor-pointer rounded-md border p-3"
      onClick={() => setOpen(!open)}
    >
      <div
        className={twMerge(
          'hover:text-accent-500 flex items-center justify-between transition-colors',
          open && 'border-primary-700 border-b pb-3'
        )}
      >
        <span className="text-md font-bold text-gray-100 flex gap-2">
          {option ? <span>{option}</span> : null}
          <span>{header}</span>
        </span>

        <span className="text-xl">
          {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </span>
      </div>

      {/* BODY — AUTO HEIGHT ANIMATION */}
      <div
        ref={contentRef}
        style={{ maxHeight: height }}
        className={twMerge(
          'overflow-hidden transition-all duration-500 ease-[cubic-bezier(.25,.1,.25,1)]',
          open ? 'mt-3 opacity-100' : 'opacity-0'
        )}
      >
        <p className="pr-6 text-sm leading-relaxed text-gray-300">{body}</p>
      </div>
    </div>
  )
}

export default AccordionItem
