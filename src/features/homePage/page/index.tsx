import Footer from '@/shared/ui/footer'
import Header from '@/shared/ui/header'
import MobileNav from '@/shared/ui/mobileNav'

const HomePage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1"></div>
      <MobileNav className={'md:hidden flex'} />
      <Footer className="hidden md:block bg-red-500" />
    </div>
  )
}

export default HomePage
