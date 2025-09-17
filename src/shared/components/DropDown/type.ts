import { TFakeEvent } from "@/shared/types/types"

export type TDropDownProps = {
  name: string
  label?: string
  options: TDropDownOption[]
  defaultValue?: string
  required?: boolean
  error?: string
  readOnly?: boolean
  className?: string
  classNameIcon?: string
  icon?: React.ReactNode
  onChange?: (e: TFakeEvent) => void
}

export type TDropDownOption = {
  id: string
  title: string
}
export type TFakeEventNumber = { target: { name: string; value: number } }
