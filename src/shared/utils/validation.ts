import { validateFormValues } from '@/shared/utils/validationRule'

export const runValidation = (typeValidation: string, value: string) => {
  const { type, message } = validateFormValues(typeValidation, value)

  return {
    value,
    error: type ? null : message,
  }
}
