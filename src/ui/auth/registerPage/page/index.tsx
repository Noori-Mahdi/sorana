import Container from '@/shared/components/Container'
import Link from 'next/link'
import RegisterForm from '../components/RegisterForm'

const RegisterPage = () => {
  return (
    <Container className="flex flex-col gap-4 justify-start">
      <div className="text-center text-2xl font-bold">ساختن اکانت جدید</div>
      <RegisterForm />
      <div className="text-center">
        <Link
          className="text-sm font-medium  text-primary-500 cursor-pointer hover:text-primary-700"
          href={'/login'}
        >
          ورود با حساب دیگر
        </Link>
      </div>
      <div className="text-center">
        <Link
          className="text-sm font-medium text-center text-primary-500 cursor-pointer hover:text-primary-700"
          href={'/resetPassword'}
        >
          بازیابی رمز ورود
        </Link>
      </div>
    </Container>
  )
}

export default RegisterPage
