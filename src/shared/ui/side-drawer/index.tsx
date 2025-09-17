'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

type TSideDrawerProps = {
  list: { label: string; name: string }[]
}

const SideDrawer = ({ list }: TSideDrawerProps) => {
  const p = usePathname()
  return (
    <ul className="w-full h-fit flex justify-center items-center text-gray-50 px-2 ">
      {list.map((e, index) => (
        <li key={e.name}>
          <Link
            href={e.name}
            className={twMerge(
              'relative text-xs py-2 px-6 cursor-pointer  last:border-none hover:text-accent-400 transition-colors duration-200',
              p === '/' + e.name &&
                'bg-primary-800 rounded-full text-accent-400 shadow-md border-0'
            )}
          >
            {e.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default SideDrawer
