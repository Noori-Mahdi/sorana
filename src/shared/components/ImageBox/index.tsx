import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

type TLogoProps = {
  imageURL: string
  imageWeight: number
  imageHidth: number
  imageAlt: string
  imageClassName?: string

  labelContent?: string
  labelClassName?: string

  parentClassName?: string
  parentHREF?: string
}

const ImageBox = ({
  imageURL,
  imageWeight,
  imageHidth,
  imageAlt,
  imageClassName,
  labelContent,
  labelClassName,
  parentClassName,
  parentHREF = '#',
}: TLogoProps) => {
  return (
    <Link href={parentHREF} className={parentClassName}>
      <Image
        src={imageURL}
        alt={imageAlt}
        width={imageWeight}
        height={imageHidth}
        className={imageClassName}
      />
      <span className={labelClassName}>{labelContent}</span>
    </Link>
  )
}

export default ImageBox
