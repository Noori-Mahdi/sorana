'use client'

import { useEffect, useRef, useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import { IoWarningOutline } from 'react-icons/io5'
import { MdInfoOutline, MdOutlineReportGmailerrorred } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'
import { TModalProps } from './type'

const Modal = ({
  type = null,
  isOpen = false,
  onClose,
  modalClassName,
  classNameBox,
  children,
  size,
  label,
  force = false,
  isDrawer,
}: TModalProps) => {
  const [show, setShow] = useState(isOpen)

  // refs
  const modalRef = useRef<HTMLDivElement>(null)

  // effect

  // handlers
  const closeModalHandler = () => {
    onClose?.()
    setShow(false)
  }

  useEffect(() => {
    setShow(isOpen)
  }, [isOpen])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose && onClose()
        setShow(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  if (!show) return null
  return (
    <div
      className={twMerge(
        'fixed inset-0 z-50 flex w-full items-center justify-center ',
        isDrawer ? 'items-end' : '',
        modalClassName
      )}
    >
      <div className="absolute inset-0 bg-stone-50/10 backdrop-blur-xs"></div>
      <div
        className={twMerge(
          `bg-bg-secondary border-accent-400 drawer my-3 is-open relative max-h-11/12 overflow-y-auto rounded border p-5 shadow-lg`,
          isDrawer ? '!w-full' : '',
          size ? size : ' w-full md:w-7/12',
          classNameBox
        )}
        ref={modalRef}
      >
        {type !== 'map' && (
          <div
            className={twMerge(
              'mb-5 flex items-start justify-end text-sm md:text-lg',
              (type != null || label) && 'justify-between'
            )}
          >
            <div className="flex items-center gap-2">
              {type === 'warning' ? (
                <IoWarningOutline className="text-yellow-500" />
              ) : type === 'info' ? (
                <MdInfoOutline className="text-sky-600" />
              ) : type === 'error' ? (
                <MdOutlineReportGmailerrorred className="text-error-300" />
              ) : null}
              {label ? (
                <span className="font-semibold tracking-wide capitalize">
                  {label}
                </span>
              ) : (
                <span className="font-semibold tracking-wide capitalize">
                  {type}
                </span>
              )}
            </div>
            {!force && (
              <IoIosClose
                className="hover:text-accent-400 cursor-pointer text-2xl text-gray-300"
                onClick={closeModalHandler}
              />
            )}
          </div>
        )}

        {children}
      </div>
    </div>
  )
}

export default Modal
