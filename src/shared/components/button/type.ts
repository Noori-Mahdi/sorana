export type TButtonProps = {
  buttomSecondIcon?: React.ReactNode
  label?: string
  buttomIcon?: React.ReactNode
  type: 'submit' | 'button'
  color?:
    | 'primary'
    | 'primaryOutline'
    | 'danger'
    | 'dangerOutline'
    | 'warningOutline'
    | 'warning'
    | 'muted'
    | 'mutedOutline'
    | 'transparent'
  size?: 'full' | 'small' | 'fit'
  rounded?: 'full' | 'normal' | 'small' | 'none'
  disabled?: boolean
  className?: string
  animation?: boolean
  loading?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}
