import Container from '@/shared/components/container'
import Image from 'next/image'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Container className="bg-bg-secondary h-full w-full ">
      <Container className="flex flex-col md:flex-row h-full p-2 gap-4 justify-center items-center bg-bg-primary shadow-lg shadow-primary-900 rounded-4xl ">
        <Container className="flex flex-col justify-between bg-bg-secondary h-full order-2 md:order-1 w-full md:w-1/2  shadow rounded-4xl">
          {children}
        </Container>
        <div className="flex order-1 md:order-2 text-text-secondary space-y-4 text-center flex-1  flex-col justify-center items-center">
          <Image src={'/logo/logo.png'} alt="logo" width={110} height={110} />
          <h2 className="md:text-2xl text-xl font-bold text-text-primary ">
            به دنیای لنت <span className="text-accent-400">سورنا</span> خوش
            آمدید
          </h2>
          <p className="hidden md:flex px-12 text-sm">
            شرکت دنیای لنت سورنا با تمرکز بر کیفیت و ایمنی خودرو، بهترین لنت‌های
            ترمز و قطعات مرتبط را برای شما فراهم می‌کند. با ما، تجربه‌ای مطمئن و
            حرفه‌ای در نگهداری و مراقبت از خودروتان خواهید داشت.
          </p>
          <p className="hidden md:flex px-12 text-sm">
            ثبت‌نام کنید یا وارد شوید تا از خدمات ویژه مشتریان و تخفیف‌های
            اختصاصی بهره‌مند شوید.
          </p>
        </div>
      </Container>
    </Container>
  )
}
