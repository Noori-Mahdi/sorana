import Container from '@/shared/components/container'
import Link from 'next/link'
import Image from 'next/image'
import ImageBox from '@/shared/components/ImageBox'
import TextWhitLink from '@/shared/components/TextWithLink'
import RegisterForm from '@/features/auth/components/RegisterForm'

const RegisterPage = () => {
  return (
    <>
      <ImageBox
        imageAlt="Logo"
        imageHidth={80}
        imageWeight={80}
        imageClassName="flex items-center justify-center gap-1 select-none"
        imageURL="/logo/logo.png"
        labelContent="ساختن اکانت جدید"
        labelClassName="font-semibold text-xl"
        parentClassName="flex flex-col cursor-auto items-center justify-center gap-2"
      />
      <RegisterForm className={'my-4 md:flex-1'} />
      <TextWhitLink
        linkContant="وارد شوید"
        linkHREF="/login"
        linkClassName="text-accent-400 hover:text-accent-500 ml-1 cursor-pointer font-medium"
        parentClassName="flex items-center justify-center my-4 text-center text-xs text-gray-50 md:text-sm"
        textContant="قبلاً حساب کاربری ساختید؟"
      />
    </>
  )
}

export default RegisterPage
