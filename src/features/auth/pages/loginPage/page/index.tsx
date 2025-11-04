import LoginForm from '@/features/auth/components/loginForm'
import ImageBox from '@/shared/components/ImageBox'
import TextWhitLink from '@/shared/components/TextWithLink'

const LoginPage = () => {
  return (
    <>
      <div className=""></div>
      <ImageBox
        imageAlt="Logo"
        imageHidth={80}
        imageWeight={80}
        imageClassName="flex items-center justify-center gap-1 select-none"
        imageURL="/logo/logo.png"
        labelContent="ورود به اکانت"
        labelClassName="font-semibold text-xl"
        parentClassName="flex flex-col items-center cursor-auto  justify-center gap-2"
      />
      <LoginForm />
      <TextWhitLink
        linkContant="ساختن حساب کاربری"
        linkHREF="/register"
        linkClassName="text-accent-400 hover:text-accent-500 ml-1 cursor-pointer font-medium"
        parentClassName="flex items-center justify-center my-4 text-center text-xs text-gray-50 md:text-sm"
        textContant="حساب کاربری فعال نداری؟"
      />
      <TextWhitLink
        linkContant="بازیابی کنید"
        linkHREF="/resetPassword"
        linkClassName="text-accent-400 hover:text-accent-500 ml-1 cursor-pointer font-medium"
        parentClassName="flex items-center justify-center my-4 text-center text-xs text-gray-50 md:text-sm"
        textContant="رمز عبور خود را فراموش کرده‌اید؟"
      />
    </>
  )
}

export default LoginPage
