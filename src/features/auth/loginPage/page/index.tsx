import Container from '@/shared/components/container'
import LoginForm from '../components/loginForm'
import Link from 'next/link'

const LoginPage = () => {
  return (
    <>
      <div className=" text-center text-xl md:text-2xl text-gray-50  font-bold">
        ورود به حساب کاربری
      </div>
      <LoginForm />
      <div className='flex flex-col'>
        <div className="text-center my-4 text-xs md:text-sm text-gray-50">
          <span> حساب کاربری فعال نداری؟ </span>
          <Link
            className=" font-medium text-accent-400 cursor-pointer hover:text-accent-500 ml-1"
            href={'/register'}
          >
            ساختن حساب کاربری
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

export default LoginPage
