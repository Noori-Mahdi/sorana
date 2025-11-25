'use client'

import Button from '@/shared/components/button'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { IoPerson } from 'react-icons/io5'

type TLoginButtonProps = {
  hasUser: boolean | null
}

const LoginButton = ({ hasUser }: TLoginButtonProps) => {
  const router = useRouter()

    return (
      <Button
        className="w-8 h-8 py-1 rounded-full gap-0 text-sm font-medium "
        type="button"
        color='secandery'
        buttomIcon={<IoPerson size={16}/>}
      />
    )

}

export default LoginButton
