'use client'
import { createCar } from '@/features/admin-panel/action/carAction'
import {
  getCompany,
  TModelComapny,
} from '@/features/admin-panel/action/companyAction'
import Button from '@/shared/components/button'
import DropDown from '@/shared/components/DropDown'
import { ImageUploader } from '@/shared/components/ImageUploader'
import Input from '@/shared/components/input'
import {
  TFakeEvent,
  TFakeEventFile,
  TFormInputState,
} from '@/shared/types/types'
import { useEffect, useState } from 'react'
import { FaBarcode } from 'react-icons/fa'
import { IoMdBarcode } from 'react-icons/io'

export type TCarMangementInputKeys =
  | 'companyId'
  | 'series'
  | 'body'
  | 'frontRotor'
  | 'frontBrake'
  | 'rearBrake'
  | 'rearRotor'
  | 'parkingShoe'
  | 'image'
export type TCarMangementFormValues = Record<
  TCarMangementInputKeys,
  TFormInputState
>

const CarManagementForm = () => {
  const initial = {
    companyId: { value: null },
    series: { value: null },
    body: { value: null },
    frontRotor: { value: null },
    frontBrake: { value: null },
    rearRotor: { value: null },
    rearBrake: { value: null },
    parkingShoe: { value: null },
    image: { value: null },
  }
  const [formValue, setFormValue] = useState<TCarMangementFormValues>(initial)
  const [loading, setLoading] = useState(false)
  const [listCompany, setListCompany] = useState<TModelComapny[]>([])

  const getCompanyAsync = async () => {
    setLoading(true)
    try {
      const res = await getCompany()
      if (res.type === 'success' && res.data) {
        setListCompany(res.data)
      }
    } catch (error) {
    } finally {
      setLoading(true)
    }
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
    getCompanyAsync()
  }, [])

  return (
    <form
      onSubmit={handleSubmit}
      className="overflow-sc flex h-full flex-col justify-between gap-6"
    >
      <div className="flex flex-wrap items-center justify-center">
        <DropDown
          name="companyId"
          label="کمپانی‌ها"
          loading={loading}
          empty={!loading && !listCompany}
          options={
            listCompany
              ? listCompany.map((c) => ({
                  id: c.id,
                  title: c.name,
                }))
              : []
          }
          className="w-full p-1 md:w-1/2"
        />

        <Input
          name="series"
          type="text"
          inputIcon={<FaBarcode />}
          label="نام مدل"
          value={formValue?.series.value}
          error={formValue?.series.error}
          onChange={handleChange}
          classNameBox="md:w-1/2 w-full p-1 my-3"
        />
        <Input
          name="body"
          type="text"
          inputIcon={<IoMdBarcode />}
          label="شماره بدنه"
          value={formValue?.body.value}
          error={formValue?.body.error}
          onChange={handleChange}
          classNameBox="md:w-1/2 w-full p-1 my-3"
        />
        <DropDown
          name="frontRotor"
          label="ترمز جلو"
          loading={loading}
          empty={!loading && !listCompany}
          options={
            listCompany
              ? listCompany.map((c) => ({
                  id: c.id,
                  title: c.name,
                }))
              : []
          }
          className="w-full p-1 md:w-1/2"
        />

        <DropDown
          label="لنت جلو"
          name="frontBrake"
          loading={loading}
          empty={!loading && !listCompany}
          options={
            listCompany
              ? listCompany.map((c) => ({
                  id: c.id,
                  title: c.name,
                }))
              : []
          }
          className="w-full p-1 md:w-1/2"
        />
        <DropDown
          label="ترمز عقب"
          name="rearRotor"
          loading={loading}
          empty={!loading && !listCompany}
          options={
            listCompany
              ? listCompany.map((c) => ({
                  id: c.id,
                  title: c.name,
                }))
              : []
          }
          className="w-full p-1 md:w-1/2"
        />
        <DropDown
          label="لنت عقب"
          name="rearBrake"
          loading={loading}
          empty={!loading && !listCompany}
          options={
            listCompany
              ? listCompany.map((c) => ({
                  id: c.id,
                  title: c.name,
                }))
              : []
          }
          className="w-full p-1 md:w-1/2"
        />
        <DropDown
          label="لنت ترمز دستی"
          name="parkingShoe"
          loading={loading}
          empty={!loading && !listCompany}
          options={
            listCompany
              ? listCompany.map((c) => ({
                  id: c.id,
                  title: c.name,
                }))
              : []
          }
          className="w-full p-1 md:w-1/2"
        />
        <ImageUploader
          onChange={handleChange}
          name="image"
          label="عکس ماشین"
          onClickTrash={() => {}}
          value={''}
        />
      </div>
      <div className="flex w-full justify-end gap-4">
        <Button
          type="button"
          label="انصراف"
          color="secandery"
          disabled={loading}
          rounded="small"
          className="w-full md:w-1/2"
        />
        <Button
          type="submit"
          label="ثبت کردن"
          disabled={loading}
          rounded="small"
          className="w-full md:w-1/2"
        />
      </div>
    </form>
  )
}

export default CarManagementForm
