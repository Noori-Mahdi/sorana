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
    { href: '/carManagement', label: 'پنل ادمین' },
  ]

  return (
    <footer className={className}>
      <Container className={`bg-gray-950 text-gray-50`}>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-lg font-bold">اسم برند</div>
          <ul className="flex flex-wrap items-center justify-center gap-4 text-center text-xs">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="hover:text-primary-400 cursor-pointer transition"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-center gap-2 text-xs md:items-end">
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
