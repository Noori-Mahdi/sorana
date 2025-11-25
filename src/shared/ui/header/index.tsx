import Container from '../../components/container'
import Logo from '../../components/ImageBox'
import NavBar from '../navBar'
import LoginButton from '../loginButton'
import { verifyUser } from '@/shared/action/action'
import Link from 'next/link'
import ReturnButton from '../ReturnButton'
import ImageBox from '../../components/ImageBox'
import SearchBox from '@/shared/components/search-box'
import Button from '@/shared/components/button'
import { GrBasket } from 'react-icons/gr'
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa'
import { BiCategory } from 'react-icons/bi'
import { IoIosArrowDown } from 'react-icons/io'

const Header = async () => {
  const hasUser = await verifyUser()

  return (
    <Container className="bg-bg-primary border-primary-900 border-b-2 shadow-lg md:px-26 md:py-3">
      <div className="mb-6 flex items-center justify-between">
        <ReturnButton className={'flex md:hidden'} />
        <ImageBox
          imageAlt="logo"
          imageURL="/logo/logo.png"
          imageWeight={40}
          imageHidth={40}
          imageClassName="order-2"
          parentClassName="flex items-center justify-center gap-1"
          labelClassName="order-2 font-semibold md:text-xl "
          labelContent="لنت سورنا"
        />
        <SearchBox
          open
          value=""
          placeholder="به دنبال چه می‌گردید؟"
          classNameParent="w-[500px]"
        />
        <div className="flex justify-between gap-6">
          <Button buttomIcon={<GrBasket />} type="button" className="h-8 w-8" />
          <LoginButton hasUser={hasUser} />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6 text-sm">
          <div className='flex items-center gap-1'>
            <span>دسته بندی‌ها</span>
            <IoIosArrowDown />
          </div>
          <NavBar />
        </div>
        <div className="flex items-center justify-between gap-6">
          <div>
            <div className="mb-1 text-xs">با ما تماس بگیرید</div>
            <div className="text-xs">09051112233</div>
          </div>
          <div>
            <FaInstagram className="h-4 w-4" />
          </div>
          <div>
            <FaFacebookSquare className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Header
