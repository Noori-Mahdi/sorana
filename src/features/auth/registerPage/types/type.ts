import { TFormInputState } from '@/shared/types/types'

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

export type TRegiesterInputKeys =
  | 'userPhone'
  | 'password'
  | 'userName'
  | 'confirmPassword'
export type TRegiesterFormValues = Record<TRegiesterInputKeys, TFormInputState>
