'use client'

import Container from '@/shared/components/container'
import ImageBox from '@/shared/components/ImageBox'
import Link from 'next/link'
import { FaFacebookSquare, FaInstagram, FaPhone } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { IoMdMail } from 'react-icons/io'
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
      <Container
        className={`border-primary-900 border-t-2 bg-gray-950 text-gray-50 shadow-2xl`}
      >
        <div className="mb-6 flex items-center justify-between">
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex items-center gap-2">
              <FaLocationDot />
              <span>دفتر مرکزی:</span>
              <span>مشهد- خیابان خبیری - خبیری 23</span>
            </div>
            <div className="flex items-center gap-2">
              <FaPhone />
              <span> تلفن :</span>
              <span>05138320000</span>
            </div>
            <div className="flex items-center gap-2">
              <IoMdMail />
              <span> کدپستی :</span>
              <span>023154323</span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <ImageBox
              imageHidth={50}
              imageWeight={50}
              imageAlt="enamad"
              imageURL="/logo/enamad-3.png"
            />
            <div className="flex gap-4">
              <div>
                <FaInstagram className="h-6 w-6" />
              </div>
              <div>
                <FaFacebookSquare className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
        <div className="w= text-center text-sm">
          {' '}
          تمامی حقوق فروشگاه سرونا لنت برای شرکت فرانتیک محفوظ می‌باشد و هرگونه
          کپی‌برداری مستلزم کسب اجازۀ کتبی بوده و پیگرد قانونی خواهد داشت.
        </div>
      </Container>
    </footer>
  )
}

export default Footer
