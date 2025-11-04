import Container from '../../components/container'
import Logo from '../../components/ImageBox'
import NavBar from '../navBar'
import LoginButton from '../loginButton'
import { verifyUser } from '@/shared/action/action'
import Link from 'next/link'
import ReturnButton from '../ReturnButton'
import ImageBox from '../../components/ImageBox'

const Header = async () => {
  const hasUser = await verifyUser()

  return (
    <Container className="bg-bg-primary border-primary-900 flex justify-between border-b-2 shadow-lg md:py-3">
      <div className="hidden flex-1 items-center justify-start gap-6 md:flex">
        <LoginButton hasUser={hasUser} />
        <NavBar />
      </div>
      <ReturnButton className={'flex md:hidden'} />
      <ImageBox
        imageAlt="logo"
        imageURL="/logo/logo.png"
        imageWeight={40}
        imageHidth={40}
        imageClassName="order-2"
        parentClassName="flex items-center justify-center gap-1"
        labelClassName="order-1 font-semibold md:text-xl "
        labelContent="SOREN"
      />
    </Container>
  )
}

export default Header
