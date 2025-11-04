import { TFormInputState } from '@/shared/types/types'

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

// Register Respone

export type TRegisterResponse =
  | {
      type: 'success'
      message?: string
      data?: {
        name: string
        id: string
        image: string
      }[]
    }
  | {
      type: 'error'
      errors: Partial<Record<TRegiesterInputKeys | 'general', string[]>>
    }

// Regiester Request
export type TRegiesterInputKeys =
  | 'userPhone'
  | 'password'
  | 'userName'
  | 'confirmPassword'
export type TRegiesterFormValues = Record<TRegiesterInputKeys, TFormInputState>
