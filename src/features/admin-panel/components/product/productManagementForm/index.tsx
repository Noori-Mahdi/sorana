'use client'

import { createProduct } from '@/features/admin-panel/action/product/actoin'
import Button from '@/shared/components/button'
import DropDown from '@/shared/components/DropDown'
import ImageUploader from '@/shared/components/ImageUploader'
import Input from '@/shared/components/input'
import { TFakeEvent, TFakeEventFile } from '@/shared/types/types'
import { useState } from 'react'

type TField = { value: string | null; error: string | null }

type TFormValue = {
  name: TField
  length: TField
  width: TField
  type: TField
  mainTechnicalCode: TField
  FMSITechnicalCode: TField
  HIQTechnicalCode: TField
  WVATechnicalCode: TField
  image: TField
}

const ProductManagementForm = () => {
  const [formValue, setFormValue] = useState<TFormValue>({
    name: { value: null, error: null },
    length: { value: null, error: null },
    width: { value: null, error: null },
    type: { value: null, error: null },
    mainTechnicalCode: { value: null, error: null },
    FMSITechnicalCode: { value: null, error: null },
    HIQTechnicalCode: { value: null, error: null },
    WVATechnicalCode: { value: null, error: null },
    image: { value: null, error: null },
  })
  const [loading, setLoading] = useState(false)

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

    try {
      const formData = new FormData(e.currentTarget)
      const res = await createProduct(formData)
    } catch (err) {
      console.error('Submit error:', err)
      alert('خطای غیرمنتظره رخ داد.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      className="flex flex-col justify-between h-full"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-wrap gap-2">
        <DropDown
          value={formValue.type.value ?? ''}
          name="type"
          options={[
            { id: 'frontRotor', title: 'دیسک ترمز جلو' },
            { id: 'frontBrake', title: 'لنت ترمز جلو' },
            { id: 'rearRotor', title: 'دیسک ترمز عقب' },
            { id: 'rearBrake', title: 'لنت ترمز عقب' },
            { id: 'parkingShoe', title: 'لنت ترمز دستی' },
          ]}
          label="لنت و دیسک"
          onChange={handleChange}
        />
        <Input
          value={formValue.name.value ?? ''}
          onChange={handleChange}
          name="name"
          type="text"
          label="نام"
        />
        <ImageUploader onChange={handleChange} label="عکس کالا" name="image" />
        <Input
          value={formValue.length.value ?? ''}
          onChange={handleChange}
          name="length"
          type="text"
          label="طول"
        />
        <Input
          value={formValue.width.value ?? ''}
          onChange={handleChange}
          name="width"
          type="text"
          label="عرض"
        />
        <Input
          value={formValue.mainTechnicalCode.value ?? ''}
          onChange={handleChange}
          name="mainTechnicalCode"
          type="text"
          label="کد فنی اصلی"
        />
        <Input
          value={formValue.FMSITechnicalCode.value ?? ''}
          onChange={handleChange}
          name="FMSITechnicalCode"
          type="text"
          label="کد فنی FMSI"
        />
        <Input
          value={formValue.HIQTechnicalCode.value ?? ''}
          onChange={handleChange}
          name="HIQTechnicalCode"
          type="text"
          label="کد فنی HIQ"
        />
        <Input
          value={formValue.WVATechnicalCode.value ?? ''}
          onChange={handleChange}
          name="WVATechnicalCode"
          type="text"
          label="کد فنی WVA"
        />
      </div>
      {/* <File name="FMSITechnicalCode" type="text"/> */}
      <div className="flex gap-2 justify-end">
        <Button type="submit" label="ثبت کردن" />
      </div>
    </form>
  )
}

export default ProductManagementForm
