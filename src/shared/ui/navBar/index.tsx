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
    { href: '/', label: 'خانه' },
    { href: '/store', label: 'فروشگاه' },
    { href: '/application', label: 'اپلیکیشن' },
    { href: '/aboutUs', label: 'درباره ما' },
    { href: '/adminPanel', label: 'پنل ادمین' },
  ]

  const isLinkActive = (href: string, pathname: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <nav className="relative">
      <ul className={twMerge(`hidden md:flex gap-4 text-sm`, className)}>
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={`cursor-pointer border-b-2 p-1 text-gary-50 border-transparent ${
                isLinkActive(href, pathname)
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
