'use client'

import { twMerge } from 'tailwind-merge'
import { useRef, useState } from 'react'
import { TInputProps } from './type'
import { CiWarning } from 'react-icons/ci'

const Input = ({
  type,
  label,
  name,
  required,
  value = '',
  inputIcon,
  secondaryIcon,
  error,
  readOnly,
  hiddenBorder = false,
  className,
  classNameInput,
  classNameIcon,
  classNameSecondaryIcon,
  classNameBox,
  labelClassName,
  maxLength,
  placeholder,
  inputMode = 'text',
  onClickSecondaryIcon,
  onChange,
  onClick,
  onBlur,
  onKeyDown,
  multiline = false,
  rows = 4,
  disabled = false,
}: TInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [inputType, setInputType] = useState(type)

  return (
    <div
      className={twMerge(`w-full relative `, label && 'my-5', classNameBox)}
      onClick={() => {
        onClick?.()
        if (multiline) {
          textareaRef.current?.focus()
        } else {
          inputRef.current?.focus()
        }
      }}
    >
      <div
        className={twMerge(
          'relative flex items-stretch text-sm md:text-base  border-transparent font-medium border px-2   rounded-3xl w-full cursor-text shadow-md shadow-primary-950',
          !readOnly ? 'bg-primary-900 ' : 'bg-primary-700 cursor-not-allowed',
          type === 'textarea' ? 'items-start h-fit p-4' : 'h-14 items-center',
          classNameInput
        )}
      >
        <div className="w-full h-full relative">
          {label && (
            <label
              className={twMerge(
                'absolute select-none capitalize tracking-wide font-medium text-gray-100 bg-transparent text-sm md:text-base flex items-center justify-between cursor-text w-fit px-1 transition-all duration-400',

                (value !== null && value !== undefined && value !== '') ||
                  isFocused
                  ? multiline
                    ? '-top-4 -translate-y-3 -translate-x-2 scale-90 text-xs md:text-sm'
                    : 'top-0 -translate-y-3 -translate-x-2 scale-90 text-xs md:text-sm'
                  : multiline
                  ? 'top-6 -translate-y-1'
                  : 'top-1/2 -translate-y-1/2 p-2',
                labelClassName
              )}
              htmlFor={name}
            >
              {label}
            </label>
          )}

          {multiline ? (
            <textarea
              ref={textareaRef}
              id={name}
              readOnly={readOnly}
              name={name}
              required={required}
              rows={rows}
              className={twMerge(
                'grow text-gray-500 w-full text-right border-gray-500 outline-0 text-lg transition-all duration-300 ease-in-out resize-y rounded-md px-2 py-1',
                className
              )}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              maxLength={maxLength}
              inputMode={inputMode}
              onKeyDown={onKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={(e) => {
                setIsFocused(false)
                onBlur?.(e)
              }}
            />
          ) : (
            <input
              disabled={disabled}
              ref={inputRef}
              id={name}
              readOnly={readOnly}
              name={name}
              type={inputType}
              required={required}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              maxLength={maxLength}
              inputMode={inputMode}
              className={twMerge(
                'grow text-gray-50 pr-3 selection:text-accent-500 placeholder:select-none w-full text-right h-full  outline-0 text-sm md:text-base transition-all duration-300 ease-in-out',
                className
              )}
              onKeyDown={onKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={(e) => {
                setIsFocused(false)
                onBlur?.(e)
              }}
            />
          )}
        </div>
        {secondaryIcon && (
          <div
            className={twMerge(
              'flex justify-center items-center p-4',
              classNameSecondaryIcon
            )}
            onClick={(e) => {
              if (type !== 'password') {
                e.stopPropagation()
                onClickSecondaryIcon?.()
              } else {
                if (inputType === 'password') {
                  setInputType('text')
                } else {
                  setInputType('password')
                }
              }
            }}
          >
            {secondaryIcon}
          </div>
        )}
      </div>
      {error && (
        <div className=" select-none  text-accent-500 w-full flex gap-1 pr-3 items-center text-xs md:text-sm font-normal mt-2">
          <CiWarning />
          <span className="whitespace-normal truncate break-words">
            {error}
          </span>
        </div>
      )}
    </div>
  )
}

export default Input
