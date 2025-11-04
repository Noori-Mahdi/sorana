export type TButtonProps = {
  key?:string | number
  buttomSecondIcon?: React.ReactNode
  label?: string
  buttomIcon?: React.ReactNode
  type: 'submit' | 'button'
  color?:
    | 'primary'
    | 'primaryOutline'
    | 'secandery'
    | 'secanderyOutline'
    | 'danger'
    | 'dangerOutline'
    | 'warningOutline'
    | 'warning'
    | 'muted'
    | 'mutedOutline'
    | 'transparent'
  size?: 'full' | 'small' | 'fit'
  rounded?: 'full' | 'normal' | 'small' | 'none' | 'custome'
  disabled?: boolean
  className?: string
  animation?: boolean
  loading?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}
