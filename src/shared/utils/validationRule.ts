export type TValidationResult = {
  type: boolean
  message: string | null
}

// تغییر یافته برای فقط یک فیلد
export const validateFormValues = (
  type: string,
  value: string
): TValidationResult => {
  if (type === 'phone') {
    if (!/^\d+$/.test(value)) {
      return { type: false, message: 'فقط اعداد مجاز هستند' }
    }
    if (!value.startsWith('09')) {
      return { type: false, message: 'شماره موبایل باید با 09 شروع شود' }
    }
    if (value.length < 11) {
      return { type: false, message: 'شماره موبایل کوتاه است' }
    }
    if (value.length > 11) {
      return { type: false, message: 'شماره موبایل طولانی است' }
    }
    return { type: true, message: null }
  }

  return { type: true, message: null } // پیش‌فرض معتبر
}
