import Container from '@/shared/components/Container'
import Link from 'next/link'
import RegisterForm from '../components/ResetPasswordForm'
import ResetPasswordForm from '../components/ResetPasswordForm'

const ResetPasswordPage = () => {
  return (
    <Container className="flex flex-col gap-4 justify-start">
      <div className="text-center text-2xl font-bold">بازیابی رمز ورود</div>
      <ResetPasswordForm />
      <Link
        className="text-sm font-medium text-center text-primary-500 cursor-pointer hover:text-primary-700"
        href={'/login'}
      >
        ورود با حساب دیگر
      </Link>
      <Link
        className="text-sm font-medium text-center text-primary-500 cursor-pointer hover:text-primary-700"
        href={'/register'}
      >
        ساختن اکانت
      </Link>
    </Container>
  )
}

export default ResetPasswordPage
