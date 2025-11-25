'use client'

import { twMerge } from 'tailwind-merge'
import { useEffect, useRef, useState } from 'react'
import { TInputProps, TValidationType } from './type'
import { CiWarning } from 'react-icons/ci'
import {
  TValidationResult,
  validateFormValues,
} from '@/shared/utils/validationRule'

const Input = ({
  type,
  validationType,
  label,
  name,
  required = false,
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

  const [isValid, setIsValid] = useState<TValidationResult>({
    type: true,
    message: null,
  })

  useEffect(() => {
    if (!isFocused && validationType && value != null) {
      setIsValid(validateFormValues(validationType, value))
      console.log('hi', validateFormValues(validationType, value))
    } else if (!validationType) {
      setIsValid({ type: true, message: null })
    }
  }, [isFocused, validationType, value])
  console.log(error, 'er')

  return (
    <div
      className={twMerge(`relative w-full`, label && 'my-10', classNameBox)}
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
          'shadow-primary-950 relative flex w-full cursor-text items-stretch rounded-lg border-2 px-2 text-sm font-medium shadow-sm md:text-base',
          (error && error?.length > 0) || !isValid.type
            ? 'border-accent-300'
            : 'border-primary-700 focus-within:border-blue-500',
          !readOnly ? 'bg-primary-900' : 'bg-primary-700 cursor-not-allowed',
          type === 'textarea' ? 'h-fit items-start p-4' : 'h-14 items-center',
          classNameInput
        )}
      >
        <div className="relative h-full w-full">
          {label && (
            <label
              className={twMerge(
                'absolute flex w-full cursor-text items-center justify-between bg-transparent text-xs font-medium tracking-wide text-gray-100 capitalize transition-all duration-400 select-none md:text-sm',

                (value !== null && value !== undefined && value !== '') ||
                  isFocused
                  ? multiline
                    ? '-top-4 translate-x-0 -translate-y-7 text-xs'
                    : 'top-0 translate-x-0 -translate-y-7 text-xs'
                  : multiline
                    ? 'top-6 -translate-y-1 text-xs'
                    : 'top-1/2 -translate-y-1/2 p-2 text-xs',
                labelClassName
              )}
              htmlFor={name}
            >
              {label}
              {inputIcon}
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
                'w-full grow resize-y rounded-lg border-gray-500 px-2 py-1 text-right text-lg text-gray-500 outline-0 transition-all duration-300 ease-in-out',
                className
              )}
              value={value ?? ''}
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
              value={value ?? ''}
              onChange={onChange}
              placeholder={placeholder}
              maxLength={maxLength}
              inputMode={inputMode}
              className={twMerge(
                'selection:text-accent-500 h-full w-full grow pr-3 text-right text-sm text-gray-50 outline-0 transition-all duration-300 ease-in-out placeholder:select-none md:text-base',
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
              'flex items-center justify-center p-4',
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
      {((error && error.length > 0) || !isValid.type) && (
        <ul className="text-accent-500 mt-2 flex w-full flex-col gap-1 pr-3 text-xs font-normal select-none md:text-sm">
          {/* ارورهای بک اند */}
          {error?.map((e, i) => (
            <li key={i} className="flex items-center gap-2">
              <CiWarning className='text-sm' />
              <span className="truncate break-words whitespace-normal">
                {e}
              </span>
            </li>
          ))}

          {!isValid.type && (
            <li className="flex items-center gap-2">
              <CiWarning className='text-sm' />
              <span className="truncate break-words whitespace-normal">
                {isValid.message}
              </span>
            </li>
          )}
        </ul>
      )}
    </div>
  )
}

export default Input
