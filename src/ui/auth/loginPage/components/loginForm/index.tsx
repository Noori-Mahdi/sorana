'use client'
import Input from '@/shared/components/input'
import Button from '@/shared/components/button'
import { useState } from 'react'
import { TFakeEvent } from '@/shared/types/types'
import { loginUser } from '../../action/action'
import { runValidation } from '@/shared/utils/validation'
import { useRouter } from 'next/navigation'

type TField = { value: string; error: string | null }
type TFormValue = Record<string, TField>

const LoginForm = () => {
  const [formValue, setFormValue] = useState<TFormValue>({
    phone: { value: '', error: null },
    password: { value: '', error: null },
  })
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | TFakeEvent
  ) => {
    const { name, value } = e.target
    setFormValue((prev) => ({
      ...prev,
      [name]: { value, error: null },
    }))
  }

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement> | TFakeEvent) => {
    const { name, value } = e.target
    const result = runValidation(name, value)
    setFormValue((prev) => ({
      ...prev,
      [name]: result,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)

    try {
      const res = await loginUser(formData)
      if (res.type === 'error' && res.errors) {
        setFormValue((prev) => {
          const updated: TFormValue = { ...prev }

          Object.keys(res.errors ?? {}).forEach((key) => {
            if (key in updated) {
              updated[key as keyof TFormValue].error = res.errors![key]
            }
          })

          return updated
        })
      } else {
        setFormValue({
          phone: { value: '', error: null },
          password: { value: '', error: null },
        })
        router.push('/')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="phone"
        type="text"
        label="شماره همراه"
        value={formValue?.['phone'].value}
        error={formValue?.['phone'].error}
        maxLength={11}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />
      <Input
        name="password"
        type="text"
        label="رمز ورود"
        value={formValue?.['password'].value ?? null}
        error={formValue?.['password'].error}
        onChange={handleChange}
        required
      />
      <Button type="submit" label="ورود" disabled={loading} loading={loading} />
    </form>
  )
}

export default LoginForm
