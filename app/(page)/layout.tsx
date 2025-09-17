import Footer from '@/shared/ui/footer'
import Header from '@/shared/ui/header'
import MobileNav from '@/shared/ui/mobileNav'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col h-screen overflow-y-s">
      <Header />
      <div className="flex-1 pb-24 pt-2">{children}</div>
      <MobileNav className={'md:hidden flex'} />
      <Footer className="hidden md:block" />
    </div>
  )
}
