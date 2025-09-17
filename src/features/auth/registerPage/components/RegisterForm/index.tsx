'use client'
import Input from '@/shared/components/input'
import Button from '@/shared/components/button'
import { useState } from 'react'
import { TFakeEvent } from '@/shared/types/types'
import { runValidation } from '@/shared/utils/validation'
import { registerUser } from '../../action/action'
import { useRouter } from 'next/navigation'
import { IoEye } from 'react-icons/io5'

type TFormValue = {
  userName: { value: string; error: string | null }
  userPhone: { value: string; error: string | null }
  password: { value: string; error: string | null }
  confirmPassword: { value: string; error: string | null }
}

type TRegisterFormProps = {
  className?: string
}

const RegisterForm = ({ className }: TRegisterFormProps) => {
  const [formValue, setFormValue] = useState<TFormValue>({
    userName: { value: '', error: null },
    userPhone: { value: '', error: null },
    password: { value: '', error: null },
    confirmPassword: { value: '', error: null },
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

  const handleCheckPassword = (
    e: React.ChangeEvent<HTMLInputElement> | TFakeEvent
  ) => {
    const { name, value } = e.target

    if (
      formValue['confirmPassword'].value !== formValue['password'].value &&
      formValue['confirmPassword'].value !== ''
    ) {
      setFormValue((prev) => ({
        ...prev,
        [name]: {
          value: value,
          error: 'با رمزی که وارد کردین یکی نیست !',
        },
      }))
    } else {
      setFormValue((prev) => ({
        ...prev,
        [name]: {
          value: value,
          error: null,
        },
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)

    try {
      const res = await registerUser(formData)
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
          userName: { value: '', error: null },
          userPhone: { value: '', error: null },
          password: { value: '', error: null },
          confirmPassword: { value: '', error: null },
        })
        router.push('/login')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
  return (
    <form className={className} onSubmit={handleSubmit}>
      <Input
        name="userName"
        type="text"
        label="نام کاربری"
        value={formValue?.['userName'].value}
        onChange={handleChange}
        required
      />
      <Input
        name="userPhone"
        type="text"
        label="شماره همراه"
        maxLength={11}
        value={formValue?.['userPhone'].value}
        error={formValue?.['userPhone'].error}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />
      <Input
        name="password"
        type="password"
        label="رمز ورود"
        value={formValue?.['password'].value ?? null}
        error={formValue?.['password'].error}
        secondaryIcon={
          <IoEye className="text-gray-50 cursor-pointer hover:text-accent-400" />
        }
        onChange={handleChange}
        onBlur={(e) => {
          handleBlur(e)
          handleCheckPassword(e)
        }}
        required
      />
      <Input
        name="confirmPassword"
        type="password"
        label="تایید رمز ورود"
        value={formValue?.['confirmPassword'].value ?? null}
        error={formValue?.['confirmPassword'].error}
        secondaryIcon={
          <IoEye className="text-gray-50 cursor-pointer hover:text-accent-400" />
        }
        onChange={handleChange}
        onBlur={handleCheckPassword}
        required
      />
      <Button type="submit" label="ورود" disabled={loading} loading={loading} />
    </form>
  )
}

export default RegisterForm
