import Footer from '@/shared/ui/footer'
import Header from '@/shared/ui/header'
import MobileNav from '@/shared/ui/mobileNav'
import SideDrawer from '@/shared/ui/side-drawer'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col h-screen overflow-y-s">
      <SideDrawer
        list={[
          { label: ' کاربران', name: 'userManagement' },
          { label: 'فروش', name: 'soldManagement' },
          { label: 'کالاها', name: 'productManagement' },
          { label: 'ماشین ها', name: 'carManagement' },
        ]}
      />
      <div className="flex-1 pb-24 pt-2">{children}</div>
    </div>
  )
}
