'use client'

import { AiOutlineProduct } from 'react-icons/ai'
import { FaShoppingBasket } from 'react-icons/fa'
import { IoHome, IoPerson } from 'react-icons/io5'
import { twMerge } from 'tailwind-merge'
import { usePathname, useRouter } from 'next/navigation'

type TMobileNavProps = {
  className?: string
}

const MobileNav = ({ className }: TMobileNavProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const items = [
    {
      icon: <IoHome className="h-6 w-6" />,
      label: 'خانه',
      href: '/',
      subHref: [''],
    },
    {
      icon: <FaShoppingBasket className="h-6 w-6" />,
      label: 'سبد',
      href: '/store',
      subHref: ['/store'],
    },
    {
      icon: <AiOutlineProduct className="h-6 w-6" />,
      label: 'اپلیکشین',
      href: '/application',
      subHref: ['/application'],
    },
    {
      icon: <IoPerson className="h-6 w-6" />,
      label: 'پروفایل',
      href: '/carManagement',
      subHref: [
        '/userManagement',
        '/carManagement',
        '/productManagement',
        '/soldManagement',
      ],
    },
  ]

  return (
    <nav
      className={twMerge(
        'shadow-primary-900 bg-bg-primary/90 xs:px-4 fixed right-1 bottom-1 left-1 z-20 rounded-full px-2 py-2 shadow backdrop-blur-md',
        className
      )}
    >
      <ul className="xs:gap-3 flex w-full items-center justify-center gap-2">
        {items.map(({ icon, label, href, subHref }) => {
          const active = subHref?.includes(pathname)
          return (
            <li
              key={label}
              onClick={() => router.push(href)}
              className={twMerge(
                'xs:gap-1 xs:p-2 flex cursor-pointer flex-col items-center rounded-full p-1 text-gray-300 transition-all duration-300',
                active && 'text-accent-400'
              )}
            >
              <div className={twMerge('p-3')}>{icon}</div>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default MobileNav
