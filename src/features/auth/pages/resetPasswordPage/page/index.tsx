import ResetPasswordForm from '@/features/auth/components/ResetPasswordForm'
import Link from 'next/link'

const ResetPasswordPage = () => {
  return (
    <>
      <div className=" text-center text-xl md:text-2xl text-gray-50  font-bold">
        بازیابی رمز ورود
      </div>
      <ResetPasswordForm className={'flex-1'}/>
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
        <div className="text-center my-4 text-xs md:text-sm text-gray-50">
          <span> حساب کاربری فعال نداری؟ </span>
          <Link
            className=" font-medium text-accent-400 cursor-pointer hover:text-accent-500 ml-1"
            href={'/register'}
          >
            ساختن حساب کاربری
          </Link>
        </div>
      </div>
    </>
  )
}

export default ResetPasswordPage
