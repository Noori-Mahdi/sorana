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
        'fixed inset-0 z-50 w-full flex  justify-center items-center',
        isDrawer ? 'items-end' : '',
        modalClassName
      )}
    >
      <div className="absolute inset-0 backdrop-blur-xs bg-stone-50/10"></div>
      <div
        className={twMerge(
          `p-5 overflow-y-auto rounded shadow-lg max-h-screen  bg-bg-secondary border border-accent-400 relative drawer is-open`,
          isDrawer ? '!w-full' : '',
          size ? size : 'w-96',
          classNameBox
        )}
        ref={modalRef}
      >
        {type !== 'map' && (
          <div
            className={twMerge(
              'flex justify-end items-start md:text-lg mb-5 text-sm',
              (type != null || label) && 'justify-between'
            )}
          >
            <div className="flex gap-2 items-center">
              {type === 'warning' ? (
                <IoWarningOutline className="text-yellow-500" />
              ) : type === 'info' ? (
                <MdInfoOutline className="text-sky-600" />
              ) : type === 'error' ? (
                <MdOutlineReportGmailerrorred className="text-error-300" />
              ) : null}
              {label ? (
                <span className="capitalize tracking-wide font-semibold">
                  {label}
                </span>
              ) : (
                <span className="capitalize tracking-wide font-semibold">
                  {type}
                </span>
              )}
            </div>
            {!force && (
              <IoIosClose
                className=" cursor-pointer text-2xl hover:text-accent-400 text-gray-300"
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
