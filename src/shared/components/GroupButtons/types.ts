import { TButtonProps } from '@/shared/components/button/type'

export type TButtonMode = 'view' | 'edit' | 'delete'

export type GroupButtonsProps = {
  listBtn: (TButtonProps & { mode: TButtonMode })[]
  classParent?: string
  onClick: (mode: TButtonMode) => void
}
