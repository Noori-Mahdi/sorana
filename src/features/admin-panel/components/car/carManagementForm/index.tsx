'use client'
import { createCar } from '@/features/admin-panel/action/car/action'
import { getCompany } from '@/features/admin-panel/action/company/action'
import Button from '@/shared/components/button'
import DropDown from '@/shared/components/DropDown'
import ImageUploader from '@/shared/components/ImageUploader'
import Input from '@/shared/components/input'
import { TFakeEvent, TFakeEventFile } from '@/shared/types/types'
import { useEffect, useState } from 'react'

type TField = { value: string | null; error: string | null }

type TFormValue = {
  companyId: TField
  series: TField
  body: TField
  frontRotor: TField
  frontBrake: TField
  rearRotor: TField
  rearBrake: TField
  parkingShoe: TField
  image: TField
}

const CarManagementForm = () => {
  const [formValue, setFormValue] = useState<TFormValue>({
    companyId: { value: null, error: null },
    series: { value: null, error: null },
    body: { value: null, error: null },
    frontRotor: { value: null, error: null },
    frontBrake: { value: null, error: null },
    rearRotor: { value: null, error: null },
    rearBrake: { value: null, error: null },
    parkingShoe: { value: null, error: null },
    image: { value: null, error: null },
  })
  const [loading, setLoading] = useState(false)
  const [listCompany, setListCompany] = useState<
    { name: string; id: string }[]
  >([])

  const handleGetCompany = async () => {
    try {
      const res = await getCompany()
      if (res.data) {
        setListCompany(res.data)
      }
    } catch (error) {}
  }

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
      const res = await createCar(formData)
    } catch (err) {
      console.error('Submit error:', err)
      alert('خطای غیرمنتظره رخ داد.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleGetCompany()
  }, [])

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-between h-full overflow-sc"
    >
      <div className="flex flex-wrap ">
        <DropDown
          options={listCompany.map((c) => ({
            id: c.id,
            title: c.name,
          }))}
          label="نام کمپانی"
          name="companyId"
          value={formValue.companyId.value ?? ''}
          onChange={handleChange}
        />

        <Input
          label="نام مدل"
          name="series"
          type="text"
          classNameBox="w-full md:w-1/4"
          onChange={handleChange}
          value={formValue.series.value ?? ''}
        />

        <Input
          label="شماره بدنه"
          name="body"
          type="text"
          classNameBox="w-full md:w-1/4"
          onChange={handleChange}
          value={formValue.body.value ?? ''}
        />

        <div className="w-full">
          <ImageUploader
            onChange={handleChange}
            name="image"
            label="عکس ماشین"
          />
        </div>

        <DropDown
          label="ترمز جلو"
          name="frontRotor"
          options={[]}
          className="w-full md:w-1/4"
          value={formValue.frontRotor.value ?? ''}
          onChange={handleChange}
        />
        <DropDown
          label="لنت جلو"
          name="frontBrake"
          options={[]}
          className="w-full md:w-1/4"
          value={formValue.frontBrake.value ?? ''}
          onChange={handleChange}
        />
        <DropDown
          label="ترمز عقب"
          name="rearRotor"
          options={[]}
          className="w-full md:w-1/4"
          value={formValue.rearRotor.value ?? ''}
          onChange={handleChange}
        />
        <DropDown
          label="لنت عقب"
          name="rearBrake"
          options={[]}
          className="w-full md:w-1/4"
          value={formValue.rearBrake.value ?? ''}
          onChange={handleChange}
        />
        <DropDown
          label="لنت ترمز دستی"
          name="parkingShoe"
          options={[]}
          className="w-full md:w-1/4"
          value={formValue.parkingShoe.value ?? ''}
          onChange={handleChange}
        />
      </div>
      <div className="flex gap-2 ">
        <Button type="submit" label="ثبت کردن" disabled={loading} />
      </div>
    </form>
  )
}

export default CarManagementForm
