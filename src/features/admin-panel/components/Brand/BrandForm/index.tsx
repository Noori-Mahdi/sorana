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
import DropDown from '@/shared/components/DropDown'
import { FaFlag } from 'react-icons/fa'
import {
  createBrand,
  editBrand,
  TModelBrand,
} from '@/features/admin-panel/action/BrandAction'

type TBrandFormProps = TModelBrand & {
  optoin?: TModelCountry[]
  mode: TModeForm
  onCancel: () => void
}

export type TBrandFormKeys = 'brandName' | 'countryId' | 'brandImage'
export type TBrandFormValues = Record<TBrandFormKeys, TFormInputState>

const BrandForm = ({
  mode,
  id,
  countryId,
  name,
  optoin,
  image,
  onCancel,
}: TBrandFormProps) => {
  const router = useRouter()

  const initial: TBrandFormValues = {
    brandName: { value: name ?? '' },
    brandImage: { value: image ?? '' },
    countryId: { value: countryId ?? '' },
  }

  const [formValue, setFormValue] = useState<TBrandFormValues>(initial)
  const [loading, setLoading] = useState(false)

  const options = optoin?.map((c) => ({
    id: c.id,
    title: c.countryName,
    image: c.flagImage,
  }))

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | TFakeEvent
      | TFakeEventFile
      | { target: { name: string; value: string | string[] } }
  ) => {
    const { name, value, files } = e.target as any

    setFormValue((prev) => ({
      ...prev,
      [name]: { value: files ? files[0] : value, error: null },
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (mode === 'view') return

    setLoading(true)

    const formData = new FormData()

    // --- Append required fields ---
    formData.append('name', formValue.brandName.value || '')
    formData.append('countryId', formValue.countryId.value || '')

    // --- Append optional file ---
    const brandImage = formValue.brandImage.value as
      | File
      | string
      | null
      | undefined

    if (brandImage instanceof File) {
      formData.append('image', brandImage)
    }

    // --- Include ID in edit mode ---
    if (mode === 'edit' && id) {
      formData.append('id', id)
    }

    try {
      if (mode === 'create') {
        await createBrand(formData)
      } else if (mode === 'edit' && id) {
        await editBrand(id, formData)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
      router.refresh()
      onCancel()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        type="text"
        name="brandName"
        value={formValue.brandName.value}
        onChange={handleChange}
        label="نام برند"
        readOnly={mode === 'view'}
        required
      />
      <DropDown
        name="countryId"
        value={formValue.countryId.value}
        readOnly={mode === 'view'}
        label="کشور برند"
        onChange={handleChange}
        required
        icon={<FaFlag />}
        options={options ?? []}
      />
      <ImageUploader
        name="brandImage"
        value={formValue.brandImage.value ?? ''}
        onChange={handleChange}
        onClickTrash={() =>
          setFormValue((prev) => ({ ...prev, brandImage: { value: '' } }))
        }
        label="عکس برند"
      />
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

export default BrandForm
