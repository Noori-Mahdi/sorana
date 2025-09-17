import Image from 'next/image'
import Link from 'next/link'

type TLogoProps = {
  height: number
  width: number
  className?: string
}

const Logo = ({ width, height, className }: TLogoProps) => {
  return (
    <Link
      href={'/'}
      className="flex justify-center items-center gap-1 select-none cursor-pointer"
    >
      <span className="font-semibold">SOREN</span>
      <Image
        src={'/logo/logo.png'}
        alt="logo"
        width={width}
        height={height}
        className={className}
      />
    </Link>
  )
}

export default Logo
