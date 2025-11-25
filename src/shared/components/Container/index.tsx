import { twMerge } from 'tailwind-merge'
import { TContainerProps } from './type'

const Container = ({
  children,
  className,
  removeSpaceBottom = false,
  removeSpaceTop = false,
  removeSpaceRight = false,
  removeSpaceLeft = false,
}: TContainerProps) => {
  return (
    <div
      className={twMerge(
        'p-3 py-5 md:px-24',
        className,
        removeSpaceBottom && 'pb-0 md:pb-0',
        removeSpaceTop && 'pt-0 md:pt-0',
        removeSpaceRight && 'pr-0 md:pr-0',
        removeSpaceLeft && 'pl-0 md:pl-0'
      )}
    >
      {children}
    </div>
  )
}

export default Container
