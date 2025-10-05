
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
    <div className="flex flex-col md:flex-row h-full  overflow-y-s">
      <SideDrawer
        list={[
          { label: ' کاربران', name: 'userManagement',icon:<FaUsers className='w-4 h-4' />},
          { label: 'فروش', name: 'soldManagement',icon:<MdOutlineAttachMoney className='w-4 h-4' /> },
          { label: 'کالاها', name: 'productManagement',icon:<FaBoxes className='w-4 h-4' /> },
          { label: 'ماشین ها', name: 'carManagement',icon:<IoCarSportSharp className='w-4 h-4' /> },
        ]}
      />
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  )
}
