import { TValidationType } from '../components/input/type'

export type TValidationResult = {
  type: boolean
  message: string | null
}

// تغییر یافته برای فقط یک فیلد
export const validateFormValues = (
  type: TValidationType,
  value: string | number
): TValidationResult => {
  if (type === 'phone') {
    if (!/^\d+$/.test(value.toString())) {
      return { type: false, message: 'فقط اعداد مجاز هستند' }
    }
    if (!value.toString().startsWith('09')) {
      return { type: false, message: 'شماره موبایل باید با 09 شروع شود' }
    }
    if (value.toString().length < 11) {
      return { type: false, message: 'شماره موبایل کوتاه است' }
    }
    if (value.toString().length > 11) {
      return { type: false, message: 'شماره موبایل طولانی است' }
    }
    return { type: true, message: null }
  }

  return { type: true, message: null } // پیش‌فرض معتبر
}
