'use client'
import Input from '@/shared/components/input'
import Button from '@/shared/components/button'
import { useState } from 'react'
import { TFakeEvent } from '@/shared/types/types'
import { validateFormValues } from '@/shared/utils/validationRule'
import { error } from 'console'

type TFormValue = {
  phone: { value: string; error: string | null }
}

const ResetPasswordForm = () => {
  const [formValue, setFormValue] = useState<TFormValue>({
    phone: { value: '', error: null },
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | TFakeEvent,
    typeValidation?: string
  ) => {
    const { name, value } = e.target
    if (typeValidation) {
      // اگر خالی باشه
      if (value === '') {
        setFormValue((prev) => ({
          ...prev,
          [name]: { value: '', error: null },
        }))
        return
      }

      const validationResult = validateFormValues(typeValidation, value)
      // اگر ولیدیشن مشکل بخوره
      if (!validationResult.type) {
        setFormValue((prev) => ({
          ...prev,
          [name]: { value: value, error: validationResult.message },
        }))
        return
      }
    }
    // اگر محدودیتی نباشه
    setFormValue((prev) => ({ ...prev, [name]: { value: value, error: null } }))
  }

  return (
    <form>
      <Input
        name="phone"
        type="text"
        label="شماره همراه"
        value={formValue?.['phone'].value}
        onChange={handleChange}
      />

      <Button type="submit" label="ورود" />
    </form>
  )
}

export default ResetPasswordForm
