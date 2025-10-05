import Container from '../../components/container'
import Logo from '../logo'
import NavBar from '../navBar'
import LoginButton from '../loginButton'
import { verifyUser } from '@/shared/action/action'
import Link from 'next/link'
import ReturnButton from '../ReturnButton'

const Header = async () => {
  const hasUser = await verifyUser()

  return (
    <div className="flex justify-between items-center gap-3 pb-4 sticky top-0 z-10 bg-bg-secondary">
      <div className="hidden md:flex items-center justify-start flex-1 gap-3">
        <LoginButton hasUser={hasUser} />
        <NavBar />
      </div>
      <ReturnButton className={'md:hidden flex'} />
      <Logo height={35} width={35} />
    </div>
  )
}

export default Header
