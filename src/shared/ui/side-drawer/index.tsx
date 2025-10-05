'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

type TSideDrawerProps = {
  list: { label: string; name: string; icon: React.ReactNode }[]
}

const SideDrawer = ({ list }: TSideDrawerProps) => {
  const [openSideBar, setOpenSideBar] = useState(false)

  const p = usePathname()

  return (
    <>
      {/* mobile desin */}
      <ul
        className={twMerge(
          'md:hidden bg-bg-primary border border-primary-700 flex  gap-2 py-3 justify-around items-start text-gray-50 px-2 z-20 rounded-md '
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
                'relative flex gap-2 text-xs cursor-pointer p-1 last:border-none hover:text-accent-400 transition-colors duration-200',
                p === '/' + e.name && ' text-accent-400  border-0'
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
          ' bg-bg-primary border w-fit hidden mt-2 border-primary-700 md:flex flex-col justify-start items-start text-gray-50  z-20 rounded-md '
        )}
      >
        {list.map((e, index) => (
          <li className="" key={e.name}>
            <Link
              onClick={() => {
                setOpenSideBar(false)
              }}
              href={e.name}
              className={twMerge(
                'relative flex gap-2 px-2 py-3 min-w-[200px] text-xs cursor-pointer  last:border-none hover:text-accent-400 transition-colors duration-200',
                p === '/' + e.name &&
                  'bg-bg-secondary text-accent-400  border-0'
              )}
            >
              {e.icon}
              <span> {e.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default SideDrawer
