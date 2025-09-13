import Container from '@/shared/components/Container'
import LoginForm from '../components/loginForm'
import Link from 'next/link'

const LoginPage = () => {
  return (
    <Container className="flex flex-col gap-4 justify-start">
      <div className="text-center text-2xl font-bold">ورود به حساب کاربری</div>
      <LoginForm />
      <Link
        className="text-sm font-medium text-center text-primary-500 cursor-pointer hover:text-primary-700"
        href={'/register'}
      >
        ساختن اکانت جدید
      </Link>
      <Link
        className="text-sm font-medium text-center text-primary-500 cursor-pointer hover:text-primary-700"
        href={'/resetPassword'}
      >
        بازیابی رمز ورود
      </Link>
    </Container>
  )
}

export default LoginPage
