'use client'
import Input from '@/shared/components/input'
import Button from '@/shared/components/button'
import { useState } from 'react'
import { TFakeEvent } from '@/shared/types/types'
import { FaPhoneAlt } from 'react-icons/fa'
import { IoEye } from 'react-icons/io5'
import { updateFormErrors } from '@/shared/utils/updateFormErrors'
import { useToast } from '@/shared/context/ToastContext'
import { useRouter } from 'next/navigation'
import { TLoginFormValues } from '../../types/type'
import { loginUser } from '../../action/loginAction'
const LoginForm = () => {
  const initial = {
    userPhone: { value: null },
    password: { value: null },
  }

  const [formValue, setFormValue] = useState<TLoginFormValues>(initial)
  const [loading, setLoading] = useState(false)
  const { addToast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const loginData = new FormData(e.currentTarget)
    try {
      const res = await loginUser(loginData)
      if (res.type === 'error') {
        if (res.errors.general) {
          addToast(res.errors.general[0], 'error')
        } else {
          setFormValue((prev) => updateFormErrors(prev, res.errors))
        }
      } else {
        setFormValue(initial)
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | TFakeEvent
  ) => {
    const { name, value } = e.target
    setFormValue((prev) => ({
      ...prev,
      [name]: { value, error: null },
    }))
  }

  return (
    <form className="my-10" onSubmit={handleSubmit}>
      <Input
        name="userPhone"
        validationType="phone"
        type="text"
        inputIcon={<FaPhoneAlt />}
        label="شماره همراه"
        value={formValue?.userPhone.value}
        error={formValue?.userPhone.error}
        maxLength={11}
        onChange={handleChange}
        required
      />
      <Input
        name="password"
        type="password"
        secondaryIcon={
          <IoEye className="hover:text-accent-400 cursor-pointer text-gray-50" />
        }
        label="رمز ورود"
        value={formValue?.password.value}
        error={formValue?.password.error}
        onChange={handleChange}
        required
      />
      <Button type="submit" label="ورود" disabled={loading} loading={loading} />
    </form>
  )
}

export default LoginForm
