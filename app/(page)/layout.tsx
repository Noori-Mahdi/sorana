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
    <Container
      className="flex h-full flex-col"
      removeSpaceBottom
      removeSpaceLeft
      removeSpaceRight
      removeSpaceTop
    >
      <Header />
      <div className="h-full flex-1">{children}</div>
      <MobileNav className={'flex md:hidden'} />
    </Container>
  )
}
