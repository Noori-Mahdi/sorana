'use client'

import Button from '@/shared/components/button'
import { useRouter } from 'next/navigation'
import { IoIosArrowForward } from 'react-icons/io'

type TReturnButtonProps = {
  className?: string
}

const ReturnButton = ({ className }: TReturnButtonProps) => {
  const router = useRouter()

  return (
    <Button
      type="button"
      buttomIcon={<IoIosArrowForward size={20}/>}
      onClick={() => router.back()}
      className={`w-10 h-10 py-1 rounded-full gap-0 text-sm font-medium ${className}`}
      color="secandery"
    ></Button>
  )
}

export default ReturnButton
