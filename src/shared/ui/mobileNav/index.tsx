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
      icon: <IoHome className=" w-6 h-6" />,
      label: 'خانه',
      href: '/',
      subHref: [''],
    },
    {
      icon: <FaShoppingBasket className=" w-6 h-6" />,
      label: 'سبد',
      href: '/store',
      subHref: ['/store'],
    },
    {
      icon: <AiOutlineProduct className=" w-6 h-6" />,
      label: 'اپلیکشین',
      href: '/application',
      subHref: ['/application'],
    },
    {
      icon: <IoPerson className=" w-6 h-6" />,
      label: 'پروفایل',
      href: '/userManagement',
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
        'fixed bottom-1 left-1 shadow shadow-primary-900 right-1 z-20 rounded-full bg-bg-primary/90 py-2 backdrop-blur-md px-2 xs:px-4',
        className
      )}
    >
      <ul className="flex justify-center gap-2 xs:gap-3 items-center  w-full">
        {items.map(({ icon, label, href, subHref }) => {
          const active = subHref?.includes(pathname)
          return (
            <li
              key={label}
              onClick={() => router.push(href)}
              className={twMerge(
                'flex flex-col items-center xs:gap-1 p-1 xs:p-2 text-gray-300 cursor-pointer rounded-full  transition-all duration-300',
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
