import Container from '@/shared/components/container'
import Link from 'next/link'
import RegisterForm from '../components/RegisterForm'
import Image from 'next/image'

const RegisterPage = () => {
  return (
    <>
      <div className=" text-center text-xl md:text-2xl text-gray-50  font-bold">
        ساختن اکانت جدید
      </div>
      <RegisterForm className={'md:flex-1 my-4'} />
      <div>
        <div className="text-center my-4 text-xs md:text-sm text-gray-50">
          <span>قبلاً حساب کاربری ساختید؟</span>
          <Link
            className=" font-medium text-accent-400 cursor-pointer hover:text-accent-500 ml-1"
            href={'/login'}
          >
            وارد شوید
          </Link>
        </div>
        <div className="text-center my-4 text-xs md:text-sm text-gray-50 mt-2 flex justify-center gap-1">
          <span>رمز عبور خود را فراموش کرده‌اید؟</span>
          <Link
            className=" font-medium text-accent-400  cursor-pointer hover:text-accent-500"
            href="/resetPassword"
          >
            بازیابی کنید
          </Link>
        </div>
      </div>
    </>
  )
}

export default RegisterPage
