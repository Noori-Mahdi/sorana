import Container from '@/shared/components/container'
import Footer from '@/shared/ui/footer'
import Header from '@/shared/ui/header'
import MobileNav from '@/shared/ui/mobileNav'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Container className="flex flex-col h-screen overflow-y-s">
      <Header />
      <div className="flex-1 pt-2">{children}</div>
      <MobileNav className={'md:hidden flex'} />
      <Footer className="hidden md:block" />
    </Container>
  )
}
