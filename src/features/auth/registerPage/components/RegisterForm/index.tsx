'use client'
import Input from '@/shared/components/input'
import Button from '@/shared/components/button'
import { useState } from 'react'
import { TFakeEvent } from '@/shared/types/types'
import { registerUser } from '../../action/action'
import { useRouter } from 'next/navigation'
import { IoEye } from 'react-icons/io5'
import { FaPhoneAlt, FaUser } from 'react-icons/fa'
import { useToast } from '@/shared/context/ToastContext'
import { updateFormErrors } from '@/shared/utils/updateFormErrors'
import { TRegiesterFormValues } from '../../types/type'



type TRegisterFormProps = {
  className?: string
}

const RegisterForm = ({ className }: TRegisterFormProps) => {
  const initial = {
    userName: { value: '' },
    userPhone: { value: '' },
    password: { value: '' },
    confirmPassword: { value: '' },
  }

  const [formValue, setFormValue] = useState<TRegiesterFormValues>(initial)
  const [loading, setLoading] = useState(false)
  const {addToast} = useToast()
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

  const handleCheckPassword = (
    e: React.ChangeEvent<HTMLInputElement> | TFakeEvent
  ) => {
    const { name, value } = e.target

    if (
      formValue.confirmPassword.value !== formValue['password'].value &&
      formValue.confirmPassword.value !== ''
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
    const registerData = new FormData(e.currentTarget)

    try {
      const res = await registerUser(registerData)
      if (res.type === 'error') {
        if (res.errors.general) {
          addToast(res.errors.general[0], 'error')
        } else {
          setFormValue((prev) => updateFormErrors(prev, res.errors))
        }
      } else {
        setFormValue(initial)
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
        value={formValue?.userName.value}
        onChange={handleChange}
        required
        inputIcon={<FaUser />}
      />
      <Input
        name="userPhone"
        type="text"
        label="شماره همراه"
        maxLength={11}
        value={formValue?.['userPhone'].value}
        error={formValue?.userPhone.error}
        onChange={handleChange}
        required
        inputIcon={<FaPhoneAlt />}
      />
      <Input
        name="password"
        type="password"
        label="رمز ورود"
        value={formValue?.['password'].value ?? null}
        error={formValue?.password.error}
        secondaryIcon={
          <IoEye className="hover:text-accent-400 cursor-pointer text-gray-50" />
        }
        onChange={handleChange}
        onBlur={(e) => {
          handleCheckPassword(e)
        }}
        required
      />
      <Input
        name="confirmPassword"
        type="password"
        label="تایید رمز ورود"
        value={formValue?.confirmPassword.value ?? null}
        error={formValue?.confirmPassword.error}
        secondaryIcon={
          <IoEye className="hover:text-accent-400 cursor-pointer text-gray-50" />
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
