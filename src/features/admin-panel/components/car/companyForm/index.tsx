'use client'

import Input from '@/shared/components/input'
import Button from '@/shared/components/button'
import ImageUploader from '@/shared/components/ImageUploader'
import { useState } from 'react'
import { TFakeEvent, TFakeEventFile } from '@/shared/types/types'
import { useRouter } from 'next/navigation'
import { createCompany } from '@/features/admin-panel/action/company/action'

type TField = { value: string; error: string | null }
type TFormValue = {
  name: TField
  image: TField
}

const CompanyForm = () => {
  const [formValue, setFormValue] = useState<TFormValue>({
    name: { value: '', error: null },
    image: { value: '', error: null },
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | TFakeEvent | TFakeEventFile
  ) => {
    const { name, value } = e.target
    setFormValue((prev) => ({
      ...prev,
      [name]: { value, error: null },
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)

    try {
      const res = await createCompany(formData) // Server Action
      if (res.type === 'error' && res.errors) {
        // setFormValue((prev) => {
        //   const updated: TFormValue = { ...prev }
        //   Object.keys(res.errors).forEach((key) => {
        //     if (key in updated) {
        //       updated[key as keyof TFormValue].error = res.errors[key]
        //     }
        //   })
        //   return updated
        // })
      } else {
        setFormValue({
          name: { value: '', error: null },
          image: { value: '', error: null },
        })
        router.refresh()
      }
    } catch (err) {
      console.error(err)
      alert('خطایی رخ داد. دوباره تلاش کنید.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <Input
        name="name"
        type="text"
        label="اسم کمپانی"
        value={formValue.name.value}
        error={formValue.name.error}
        onChange={handleChange}
        required
      />
      <ImageUploader name="image" label="لوگو کمپانی" onChange={handleChange} />
      <Button
        type="submit"
        label="ثبت کمپانی"
        disabled={loading}
        loading={loading}
      />
    </form>
  )
}

export default CompanyForm
