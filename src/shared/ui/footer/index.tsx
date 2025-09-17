'use client'

import Container from '@/shared/components/container'
import Link from 'next/link'
import { MdPhone } from 'react-icons/md'

type TFooterProps = {
  className?: string
}

const Footer = ({ className }: TFooterProps) => {
  const links = [
    { href: '/', label: 'خانه' },
    { href: '/store', label: 'فروشگاه' },
    { href: '/application', label: 'اپلیکیشن' },
    { href: '/aboutUs', label: 'درباره ما' },
    { href: '/adminPanel', label: 'پنل ادمین' },
  ]

  return (
    <footer className={className}>
      <Container className={`bg-gray-950 text-gray-50 `}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-lg font-bold">اسم برند</div>
          <ul className="flex flex-wrap text-center justify-center items-center text-xs gap-4">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="cursor-pointer hover:text-primary-400 transition"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-center md:items-end gap-2 text-xs">
            <div className="flex items-center gap-2">
              <MdPhone /> <a href="tel:+989000000000">+98 900 000 0000</a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
