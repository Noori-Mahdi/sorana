'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { RxHamburgerMenu, RxCross2 } from 'react-icons/rx' // آیکون‌ها از react-icons
import Button from '../../components/button'
import Modal from '../../components/Modal'

type TNavBarProps = {
  className?: string
}

const NavBar = ({ className }: TNavBarProps) => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const links = [
    { href: '/', label: 'خانه', subHref: ['/'] },
    { href: '/store', label: 'فروشگاه', subHref: ['/store'] },
    { href: '/application', label: 'اپلیکیشن', subHref: ['/application'] },
    { href: '/aboutUs', label: 'درباره ما', subHref: ['/aboutUs'] },
    {
      href: '/adminPanel',
      label: 'پنل ادمین',
      subHref: [
        '/userManagement',
        '/carManagement',
        '/productManagement',
        '/soldManagement',
      ],
    },
  ]

  const isLinkActive = (subHref: string[], pathname: string) => {
    if (subHref.length === 1 && subHref[0] === '/') {
      return pathname === '/'
    }

    return subHref.some((path) => pathname.startsWith(path))
  }

  return (
    <nav className="relative">
      <ul className={twMerge(`hidden md:flex gap-4 text-sm`, className)}>
        {links.map(({ href, label, subHref }) => (
          <li key={href}>
            <Link
              href={href}
              className={`cursor-pointer border-b-2 p-1 text-gary-50 border-transparent ${
                isLinkActive(subHref, pathname)
                  ? 'border-accent-400 font-bold'
                  : ' hover:border-accent-500'
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavBar
