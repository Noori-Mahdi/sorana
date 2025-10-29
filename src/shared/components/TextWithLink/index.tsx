import Link from 'next/link'

type TextWhitLinkTye = {
  parentClassName?: string
  textContant?: string
  textClassName?: string
  linkContant?: string
  linkHREF?: string
  linkClassName?: string
}

const TextWhitLink = ({
  parentClassName,
  textContant,
  textClassName,
  linkContant,
  linkHREF = '#',
  linkClassName,
}: TextWhitLinkTye) => {
  return (
    <div className={parentClassName}>
      <span className={textClassName}>{textContant}</span>
      <Link href={linkHREF} className={linkClassName}>{linkContant}</Link>
    </div>
  )
}

export default TextWhitLink
