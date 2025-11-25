'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Input from '@/shared/components/input'
import Button from '@/shared/components/button'
import { ImageUploader } from '@/shared/components/ImageUploader'

import { createCountry, editCountry } from '../../../action/CountryAction'
import {
  TFormInputState,
  TModeForm,
  TFakeEvent,
  TFakeEventFile,
} from '@/shared/types/types'
import { TModelCountry } from '../../../action/CountryAction'


type TCountryFormProps = TModelCountry & {
  mode: TModeForm
  onCancel: () => void
}

export type TCountryFormKeys = 'countryName' | 'flagImage' | 'countryImage'
export type TCountryFormValues = Record<TCountryFormKeys, TFormInputState>

const CountryForm = ({
  mode,
  id,
  countryName,
  flagImage,
  countryImage,
  onCancel,
}: TCountryFormProps) => {
  const router = useRouter()

  const initial: TCountryFormValues = {
    countryName: { value: countryName ?? '' },
    flagImage: { value: flagImage ?? '' },
    countryImage: { value: countryImage ?? '' },
  }

  const [formValue, setFormValue] = useState<TCountryFormValues>(initial)
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | TFakeEvent | TFakeEventFile
  ) => {
    const { name, value, files } = e.target as any

    setFormValue((prev) => ({
      ...prev,
      [name]: { value: files ? files[0] : value, error: null }, // ← فایل را درست ذخیره می‌کنیم
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (mode === 'view') return

    setLoading(true)

    const formData = new FormData()

    // TEXT
    formData.append('countryName', formValue.countryName.value || '')

    const appendMixed = (fd: FormData, key: string, value: any) => {
      if (value && typeof value === 'object' && value instanceof File) {
        fd.append(key, value)
      } else if (typeof value === 'string') {
        fd.append(key, value)
      }
    }

    appendMixed(formData, 'flagImage', formValue.flagImage.value)
    appendMixed(formData, 'countryImage', formValue.countryImage.value)

    if (mode === 'edit') formData.append('id', id!)

    try {
      if (mode === 'create') {
        await createCountry(formData)
      } else if (mode === 'edit') {
        await editCountry(formData)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
      router.refresh()
      onCancel()
    }
  }

  console.log(formValue,'test')

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        type="text"
        name="countryName"
        value={formValue.countryName.value}
        onChange={handleChange}
        label="نام کشور"
        readOnly={mode === 'view'}
        required
      />
      <div className="flex items-center justify-between">
        <ImageUploader
          name="flagImage"
          value={formValue.flagImage.value ?? ''}
          onChange={handleChange}
          onClickTrash={() =>
            setFormValue((prev) => ({ ...prev, flagImage: { value: '' } }))
          }
          label="پرچم کشور"
        />

        <ImageUploader
          name="countryImage"
          value={formValue.countryImage.value ?? ''}
          onChange={handleChange}
          onClickTrash={() =>
            setFormValue((prev) => ({ ...prev, countryImage: { value: '' } }))
          }
          label="تصویر کشور"
        />
      </div>
      {mode !== 'view' && (
        <div className="flex items-center justify-end gap-2">
          <Button
            type="button"
            size="fit"
            rounded="small"
            loading={loading}
            onClick={onCancel}
            label="انصراف"
          />
          <Button
            type="submit"
            size="fit"
            rounded="small"
            loading={loading}
            label={mode === 'create' ? 'ایجاد' : 'ویرایش'}
          />
        </div>
      )}
    </form>
  )
}

export default CountryForm
