'use client'

import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { TDropDownProps } from './type'
import { IoIosArrowDown } from 'react-icons/io'
import { TiWarningOutline } from 'react-icons/ti'

type TOption = { id: string; title: string }

interface Props extends TDropDownProps {
  value?: string | null
}

const DropDown = ({
  name,
  label,
  options,
  value,
  required = false,
  error,
  readOnly = false,
  className,
  classNameIcon,
  icon,
  onChange,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const selectedOption = options.find((opt) => opt.id === value)

  const handleSelect = (val: string) => {
    onChange?.({
      target: {
        name,
        value: val,
      },
    })
    setIsOpen(false)
  }

  return (
    <div
      ref={wrapperRef}
      className={twMerge('w-full relative my-3', className)}
    >
      <div
        className={twMerge(
          'flex items-center shadow-md text-base font-medium h-13 border border-transparent rounded-xl w-full cursor-pointer transition-colors p-1',
          !readOnly ? 'bg-primary-900 ' : 'bg-primary-700 cursor-not-allowed',
          error && 'border-red-400'
        )}
        onClick={() => !readOnly && setIsOpen(!isOpen)}
      >
        <div className={twMerge('px-2 text-neutral-500', classNameIcon)}>
          {icon}
        </div>

        <div className="grow h-fit relative text-sm ">
          {label && (
            <div
              className={twMerge(
                'absolute w-fit h-2 pb-2 select-none capitalize tracking-wide font-medium text-sm flex items-center justify-between px-1',
                (value !== undefined && value !== null) || isOpen
                  ? 'top-0 -translate-y-4 translate-x-2'
                  : 'top-1/2 -translate-y-1/2 translate-x-2',
                error && 'text-error-300'
              )}
            >
              {label}
              {required && <span className="text-red-400">*</span>}
            </div>
          )}

          <div className="text-gray-50 text-base">
            {selectedOption ? selectedOption.title : ''}
          </div>
        </div>

        <div className="px-2 text-gray-50">
          <IoIosArrowDown
            className={`transition-transform ease-in ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </div>

      {isOpen && !readOnly && (
        <div className="absolute mt-1 w-full bg-primary-900 border border-gray-200 rounded-xl shadow-lg max-h-60 z-20 overflow-y-auto">
          {options.map((opt) => (
            <div
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              className={twMerge(
                'px-4 py-2 text-sm hover:bg-primary-800 cursor-pointer',
                opt.id === value && 'bg-primary-800 font-medium'
              )}
            >
              {opt.title}
            </div>
          ))}
        </div>
      )}

      {/* اینجاست: مقدار انتخاب‌شده رو داخل فرم نگه می‌داره */}
      {!readOnly && (
        <input type="hidden" name={name} value={value ?? ''} />
      )}

      {error && (
        <div className="text-red-400 flex gap-1 pl-3 items-center text-sm font-normal mt-1">
          <TiWarningOutline />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}

export default DropDown
