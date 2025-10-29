import { TFakeEvent } from '@/shared/types/types'

export type TValidationType = 'phone'

export type TInputProps = {
  type: 'text' | 'textarea' | 'password'
  validationType?: TValidationType
  name: string
  value?: string | number |null
  label?: string
  required?: boolean
  error?: string[] | null
  className?: string
  readOnly?: boolean
  inputIcon?: React.ReactNode
  hiddenBorder?: boolean
  classNameInput?: string
  classNameIcon?: string
  secondaryIcon?: React.ReactNode
  classNameSecondaryIcon?: string
  labelClassName?: string
  placeholder?: string
  multiline?: boolean
  rows?: number
  classNameBox?: string
  maxLength?: number
  inputMode?: 'text' | 'numeric'
  onClickSecondaryIcon?: () => void
  onKeyDown?: (e: any) => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement> | TFakeEvent) => void
  onClick?: () => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement> | TFakeEvent) => void
  disabled?: boolean
}
