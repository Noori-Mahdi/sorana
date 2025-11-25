'use client'

import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { IoIosArrowDown } from 'react-icons/io'
import { TiWarningOutline } from 'react-icons/ti'
import Image from 'next/image'
import CustomCheckbox from '../CheckBox'
import SearchBox from '../search-box'

type TOption = { id: string; title: string; image?: string }

interface Props {
  name: string
  label?: string
  options: TOption[] | null
  value?: string | string[] | null
  required?: boolean
  error?: string
  readOnly?: boolean
  multiple?: boolean
  className?: string
  classNameIcon?: string
  empty?: boolean
  disable?: boolean
  loading?: boolean
  icon?: React.ReactNode
  onChange?: (e: { target: { name: string; value: string | string[] } }) => void
}

const DropDown = ({
  name,
  label,
  options,
  value,
  required = false,
  error,
  readOnly = false,
  multiple = false,
  className,
  classNameIcon,
  icon,
  loading,
  disable = false,
  empty,
  onChange,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // برای حالت multiple
  const [selected, setSelected] = useState<string[]>(
    Array.isArray(value) ? value : []
  )

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

  // ---------------------- حالت تک انتخابی ----------------------
  if (!multiple) {
    const selectedOption = options?.find((opt) => opt.id === value) || null

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
        className={twMerge('relative flex items-center my-3 w-full', className)}
      >
        <div
          className={twMerge(
            'border-primary-700 flex h-14 w-full cursor-pointer items-center rounded-md border-2 p-1 text-base font-medium shadow-md transition-colors',
            !readOnly ? 'bg-primary-900' : 'bg-primary-700 cursor-not-allowed',
            error && 'border-red-400'
          )}
          onClick={() => !readOnly && !disable && setIsOpen(!isOpen)}
        >
          <div className={twMerge('px-2 text-neutral-500', classNameIcon)}>
            {icon}
          </div>

          <div className="relative h-fit grow text-sm">
            {label && (
              <div
                className={twMerge(
                  'absolute flex h-2 w-fit items-center justify-between px-1 pb-2 text-sm font-medium tracking-wide capitalize transition-all duration-300 ease-in-out select-none',
                  (value !== undefined && value !== null) || isOpen
                    ? 'top-0 translate-x-2 -translate-y-10'
                    : 'top-1/2 translate-x-2 -translate-y-1/2',
                  error && 'text-error-300'
                )}
              >
                {label}
                {required && <span className="text-red-400">*</span>}
              </div>
            )}

            <div className="text-base text-gray-50">
              {selectedOption ? selectedOption.title : ''}
            </div>
          </div>

          <div className="px-2 text-gray-50">
            <IoIosArrowDown
              className={`transition-transform ease-in ${
                isOpen && !disable && !readOnly ? 'rotate-180' : ''
              }`}
            />
          </div>
        </div>

        {isOpen && !disable && !readOnly && (
          <div className="bg-primary-900 absolute -top-2 translate-y-1/2 z-20 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border border-gray-200 shadow-lg">
            {
              options ? (
                options.map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => handleSelect(opt.id)}
                    className={twMerge(
                      'hover:bg-primary-800 cursor-pointer px-4 py-2 text-sm',
                      opt.id === value && 'bg-primary-800 font-medium'
                    )}
                  >
                    {opt.title}
                  </div>
                ))
              ) : empty ? (
                <div>هیچ موردی یافت نشد</div>
              ) : (
                <></>
              )
              //Loading
            }
          </div>
        )}

        {!readOnly && <input type="hidden" name={name} value={value ?? ''} />}

        {error && (
          <div className="mt-1 flex items-center gap-1 pl-3 text-sm font-normal text-red-400">
            <TiWarningOutline />
            <span>{error}</span>
          </div>
        )}
      </div>
    )
  }

  // ---------------------- حالت چند انتخابی ----------------------
  const [searchValue, setSearchValue] = useState<string | null>(null)
  const toggleOption = (val: string) => {
    setSelected((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
    )
  }

  useEffect(() => {
    onChange?.({
      target: {
        name,
        value: selected,
      },
    })
  }, [selected])

  return (
    <div ref={wrapperRef} className="relative my-3 w-full">
      <button
        type="button"
        onClick={() => !readOnly && !disable && setIsOpen(!isOpen)}
        className={twMerge(
          'bg-bg-secondary flex w-full items-center justify-between rounded-md border p-2 text-sm',
          isOpen ? 'border-accent-600' : 'border-primary-800'
        )}
      >
        {selected.length > 0 && (
          <span className="absolute -top-6">{label}</span>
        )}
        <span>
          {selected.length > 0 && options
            ? options
                .filter((o) => selected.includes(o.id))
                .map((o) => o.title)
                .join(', ')
            : label}
        </span>
        <IoIosArrowDown
          className={`h-4 w-4 text-gray-500 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && !disable && !readOnly && (
        <div className="bg-bg-primary absolute z-10 mt-1 flex h-[250px] w-full flex-col gap-1 overflow-auto rounded-md border p-3 shadow-lg">
          <div className="flex items-center justify-center gap-2">
            <SearchBox
              open
              placeholder="جستجو ..."
              onChange={(e) => setSearchValue(e)}
              value={searchValue ?? ''}
              className="rounded-md"
              classNameParent="w-5/6"
            />
          </div>
          {options ? (
            options
              .filter((opt) =>
                !searchValue
                  ? true
                  : opt.title.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((opt) => (
                <label
                  key={opt.id}
                  className="hover:bg-bg-secondary flex w-full cursor-pointer items-center justify-between p-2"
                >
                  <CustomCheckbox
                    checked={selected.includes(opt.id)}
                    onChange={() => toggleOption(opt.id)}
                  />
                  <div className="flex items-center gap-2 capitalize">
                    {opt.title}
                    {opt.image && (
                      <Image alt="" src={opt.image} width={20} height={20} />
                    )}
                  </div>
                </label>
              ))
          ) : empty ? (
            <div>هیچ موردی یافت نشد</div>
          ) : (
            <></>
          )}
        </div>
      )}

      {/* نگهداری مقادیر برای فرم */}
      {!readOnly &&
        selected.map((val) => (
          <input key={val} type="hidden" name={name} value={val} />
        ))}

      {error && (
        <div className="mt-1 flex items-center gap-1 pl-3 text-sm font-normal text-red-400">
          <TiWarningOutline />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}

export default DropDown
