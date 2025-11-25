'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight, FaLongArrowAltRight } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'

type TSideDrawerProps = {
  list: { label: string; name: string; icon: React.ReactNode }[]
  className: string
}

const SideDrawer = ({ list, className }: TSideDrawerProps) => {
  const [openSideBar, setOpenSideBar] = useState(false)

  const p = usePathname()

  return (
    <>
      {/* mobile desin */}
      <ul
        className={twMerge(
          'bg-bg-primary border-primary-700 z-20 flex flex-1 items-start justify-around gap-2 rounded-md border px-2 py-3 text-gray-50 shadow-md md:hidden',
          className
        )}
      >
        {list.map((e, index) => (
          <li key={e.name}>
            <Link
              onClick={() => {
                setOpenSideBar(false)
              }}
              href={e.name}
              className={twMerge(
                'hover:text-accent-400 relative flex cursor-pointer gap-2 p-1 text-xs transition-colors duration-200 last:border-none',
                p === '/' + e.name && 'text-accent-400 border-0'
              )}
            >
              {e.icon}
              <span> {e.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <ul
        className={twMerge(
          'bg-bg-primary border-primary-900 hidden flex-col items-end justify-start border-l-2 text-gray-50 md:flex',
          className
        )}
      >
        {list.map((e, index) => (
          <li className="" key={e.name}>
            <Link
              href={e.name}
              className={twMerge(
                'hover:text-accent-400 relative mx-2 my-0.5 flex cursor-pointer justify-between gap-2 rounded-md px-2 py-3 text-white transition-colors duration-200 last:border-none',
                openSideBar ? 'min-w-[200px] text-sm' : 'w-fit text-xl',
                p === '/' + e.name && 'bg-bg-secondary text-accent-400 border-0'
              )}
            >
              {openSideBar && <span className="font-normal"> {e.label}</span>}
              <span className={twMerge(openSideBar ? 'text-base' : 'text-lg')}>
                {e.icon}
              </span>
            </Link>
          </li>
        ))}
        <li className="px-2 py-3 text-sm">
          {openSideBar ? (
            <FaArrowRight
              className="hover:text-primary-400 mx-2 cursor-pointer"
              onClick={() => setOpenSideBar(!openSideBar)}
            />
          ) : (
            <FaArrowLeft
              className="hover:text-primary-400 mx-2 cursor-pointer"
              onClick={() => setOpenSideBar(!openSideBar)}
            />
          )}
        </li>
      </ul>
    </>
  )
}

export default SideDrawer
