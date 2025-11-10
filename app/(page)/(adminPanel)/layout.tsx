import SideDrawer from '@/shared/ui/side-drawer'
import { FaBoxes, FaUsers } from 'react-icons/fa'
import { IoCarSportSharp, IoEar } from 'react-icons/io5'
import { MdOutlineAttachMoney } from 'react-icons/md'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex h-full">
      <SideDrawer
        list={[
          {
            label: ' کاربران',
            name: 'userManagement',
            icon: <FaUsers />,
          },
          {
            label: 'فروش',
            name: 'soldManagement',
            icon: <MdOutlineAttachMoney />,
          },
          {
            label: 'کالاها',
            name: 'productManagement',
            icon: <FaBoxes />,
          },
          {
            label: 'ماشین ها',
            name: 'carManagement',
            icon: <IoCarSportSharp />,
          },
        ]}
      />
      <div className="flex h-full flex-1 flex-col">{children}</div>
    </div>
  )
}
