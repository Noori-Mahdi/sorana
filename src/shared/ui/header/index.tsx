import Container from '../../components/container'
import Logo from '../../components/ImageBox'
import NavBar from '../navBar'
import LoginButton from '../loginButton'
import { verifyUser } from '@/shared/action/action'
import Link from 'next/link'
import ReturnButton from '../ReturnButton'

const Header = async () => {
  const hasUser = await verifyUser()

  return (
    <div className="bg-bg-secondary sticky top-0 z-10 flex items-center justify-between gap-3 pb-4">
      <div className="hidden flex-1 items-center justify-start gap-3 md:flex">
        <LoginButton hasUser={hasUser} />
        <NavBar />
      </div>
      <ReturnButton className={'flex md:hidden'} />
      <Logo height={35} width={35} />
    </div>
  )
}

export default Header
