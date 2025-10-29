import { TFormInputState } from "@/shared/types/types"

// Login Respone
export type TLoginResponse =
  | {
      type: 'success'
      message: string
    }
  | {
      type: 'error'
      errors: Partial<Record<TLoginInputKeys | 'general', string[]>>
    }

// Login Request
export type TLoginInputKeys = 'userPhone' | 'password'
export type TLoginFormValues = Record<TLoginInputKeys, TFormInputState>
