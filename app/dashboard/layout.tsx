import Header from '@/shared/ui/header'
import SideDrawer from '@/shared/ui/side-drawer'
import { FaBox, FaBoxes, FaFlag, FaQuestion, FaUsers } from 'react-icons/fa'
import { GiCardboardBoxClosed } from 'react-icons/gi'
import { IoCarSportSharp } from 'react-icons/io5'
import { MdOutlineAttachMoney } from 'react-icons/md'
import { SiBrandfolder } from 'react-icons/si'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex h-screen flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <SideDrawer
          className="h-full overflow-y-auto"
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
              icon: <GiCardboardBoxClosed />,
            },
            {
              label: 'کالا پایه',
              name: 'productBaseManagement',
              icon: <FaBoxes />,
            },
            {
              label: 'ماشین ها',
              name: 'carManagement',
              icon: <IoCarSportSharp />,
            },
            {
              label: 'برند',
              name: 'brandManagement',
              icon: <SiBrandfolder />,
            },
            {
              label: 'کشورها',
              name: 'countryManagement',
              icon: <FaFlag />,
            },
            {
              label: 'سوالات پر تکرار',
              name: 'FAQManagement',
              icon: <FaQuestion />,
            },
          ]}
        />

        <div className="flex flex-1 flex-col overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}
