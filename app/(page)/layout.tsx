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
  className="flex h-full flex-col overflow-hidden"
  removeSpaceBottom
  removeSpaceLeft
  removeSpaceRight
  removeSpaceTop
>
  <Header />
  <div className="flex-1 overflow-hidden">{children}</div>
  <MobileNav className={'flex md:hidden'} />
</Container>

  )
}
