'use client'
import { FaSearch } from 'react-icons/fa'
import Input from '../input'
import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import Button from '../button'
import { twMerge } from 'tailwind-merge'

type TSearchBoxProps = {
  open?: boolean
  value: string
  className?: string
  onChange: (e: string) => void
}

const SearchBox = ({
  value,
  onChange,
  open = false,
  className,
}: TSearchBoxProps) => {
  const [isOpen, setIsOpen] = useState(false)
  if (!isOpen && !open) {
    return (
      <Button
        className="bg-bg-primary border-primary-800 hover:border-accent-500 hover:bg-bg-secondary flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border p-2"
        onClick={() => setIsOpen(true)}
        buttomIcon={<FaSearch className="rotate-90" size={13} />}
        type="button"
      />
    )
  }
  return (
    <Input
      name="search"
      type="text"
      classNameInput={twMerge('h-10', className)}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      secondaryIcon={
        !open && (
          <IoMdClose
            className="hover:text-accent-400 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        )
      }
    />
  )
}

export default SearchBox
