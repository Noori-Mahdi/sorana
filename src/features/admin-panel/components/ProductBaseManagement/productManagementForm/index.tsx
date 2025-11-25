'use client'

import Button from '@/shared/components/button'
import DropDown from '@/shared/components/DropDown'
import { ImageUploader } from '@/shared/components/ImageUploader'
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
  Radius: TField
  BrakeSystem: TField
  PcsInSet: TField
  Thickness: TField
  StructureMaterial: TField
  Height: TField
  Drum: TField
  Outter: TField
  PitchCircle: TField
  CenteringDiameter: TField
  DiscThicknessMin: TField
  NumOfHoles: TField
  DiscThicknessMax: TField
  DicsType: TField
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
    Radius: { value: null, error: null },
    BrakeSystem: { value: null, error: null },
    PcsInSet: { value: null, error: null },
    Thickness: { value: null, error: null },
    StructureMaterial: { value: null, error: null },
    Height: { value: null, error: null },
    Drum: { value: null, error: null },
    Outter: { value: null, error: null },
    PitchCircle: { value: null, error: null },
    CenteringDiameter: { value: null, error: null },
    DiscThicknessMin: { value: null, error: null },
    NumOfHoles: { value: null, error: null },
    DiscThicknessMax: { value: null, error: null },
    DicsType: { value: null, error: null },
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
      // const res = await createProduct(formData)
    } catch (err) {
      console.error('Submit error:', err)
      alert('خطای غیرمنتظره رخ داد.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      className="flex h-full flex-col justify-between"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-wrap">
        {/* TYPE */}
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
          className="w-1/3 px-2"
        />

        {/* NAME */}
        <Input
          value={formValue.name.value ?? ''}
          onChange={handleChange}
          name="name"
          label="نام"
          type="text"
          classNameBox="w-1/3 px-2"
        />

        {/* LENGTH */}
        <Input
          value={formValue.length.value ?? ''}
          onChange={handleChange}
          name="length"
          label="طول"
          type="text"
          classNameBox="w-1/3 px-2"
        />

        {/* WIDTH */}
        <Input
          value={formValue.width.value ?? ''}
          onChange={handleChange}
          name="width"
          type="text"
          label="عرض"
          classNameBox="w-1/3 px-2"
        />

        {/* MAIN CODE */}
        <Input
          value={formValue.mainTechnicalCode.value ?? ''}
          onChange={handleChange}
          name="mainTechnicalCode"
          type="text"
          label="کد فنی اصلی"
          classNameBox="w-1/3 px-2"
        />

        {/* FMSI */}
        <Input
          value={formValue.FMSITechnicalCode.value ?? ''}
          onChange={handleChange}
          name="FMSITechnicalCode"
          type="text"
          label="کد فنی FMSI"
          classNameBox="w-1/3 px-2"
        />

        {/* HIQ */}
        <Input
          value={formValue.HIQTechnicalCode.value ?? ''}
          onChange={handleChange}
          name="HIQTechnicalCode"
          type="text"
          label="کد فنی HIQ"
          classNameBox="w-1/3 px-2"
        />

        {/* WVA */}
        <Input
          value={formValue.WVATechnicalCode.value ?? ''}
          onChange={handleChange}
          name="WVATechnicalCode"
          type="text"
          label="کد فنی WVA"
          classNameBox="w-1/3 px-2"
        />

        {/* --- ادامه فیلدهای مدل --- */}

        <DropDown
          value={formValue.DicsType.value ?? ''}
          name="DicsType"
          label="نوع دیسک"
          className="w-1/3 px-2"
          options={[
            { id: 'Solid', title: 'سالید (توپر)' },
            { id: 'Vented', title: 'ونتیله' },
            { id: 'Drilled', title: 'سوراخ‌دار' },
            { id: 'Slotted', title: 'شیار‌دار' },
            { id: 'Floating', title: 'شناور' },
            { id: 'Carbon', title: 'کربنی' },
          ]}
        />

        <Input
          value={formValue.DiscThicknessMax.value ?? ''}
          onChange={handleChange}
          name="DiscThicknessMax"
          type="text"
          label="حداکثر ضخامت دیسک"
          classNameBox="w-1/3 px-2"
        />

        <Input
          value={formValue.DiscThicknessMin.value ?? ''}
          onChange={handleChange}
          name="DiscThicknessMin"
          type="text"
          label="حداقل ضخامت دیسک"
          classNameBox="w-1/3 px-2"
        />

        <Input
          value={formValue.NumOfHoles.value ?? ''}
          onChange={handleChange}
          name="NumOfHoles"
          type="text"
          label="تعداد سوراخ"
          classNameBox="w-1/3 px-2"
        />

        <Input
          value={formValue.CenteringDiameter.value ?? ''}
          onChange={handleChange}
          name="CenteringDiameter"
          label="قطر مرکز"
          type="text"
          classNameBox="w-1/3 px-2"
        />

        <Input
          value={formValue.PitchCircle.value ?? ''}
          onChange={handleChange}
          name="PitchCircle"
          type="text"
          label="فاصله پیچ‌ها (P.C.D)"
          classNameBox="w-1/3 px-2"
        />

        <Input
          value={formValue.Outter.value ?? ''}
          onChange={handleChange}
          name="Outter"
          label="قطر بیرونی"
          type="text"
          classNameBox="w-1/3 px-2"
        />

        <Input
          value={formValue.Drum.value ?? ''}
          onChange={handleChange}
          name="Drum"
          type="text"
          label="قطر کاسه"
          classNameBox="w-1/3 px-2"
        />

        <Input
          value={formValue.Height.value ?? ''}
          onChange={handleChange}
          type="text"
          name="Height"
          label="ارتفاع"
          classNameBox="w-1/3 px-2"
        />

        <Input
          value={formValue.StructureMaterial.value ?? ''}
          onChange={handleChange}
          name="StructureMaterial"
          type="text"
          label="جنس"
          classNameBox="w-1/3 px-2"
        />

        <Input
          value={formValue.Thickness.value ?? ''}
          onChange={handleChange}
          name="Thickness"
          type="text"
          label="ضخامت"
          classNameBox="w-1/3 px-2"
        />

        <Input
          value={formValue.PcsInSet.value ?? ''}
          onChange={handleChange}
          name="PcsInSet"
          type="text"
          label="تعداد در هر ست"
          classNameBox="w-1/3 px-2"
        />

        <Input
          value={formValue.BrakeSystem.value ?? ''}
          onChange={handleChange}
          name="BrakeSystem"
          type="text"
          label="سیستم ترمز"
          classNameBox="w-1/3 px-2"
        />

        <Input
          value={formValue.Radius.value ?? ''}
          onChange={handleChange}
          type="text"
          name="Radius"
          label="شعاع"
          classNameBox="w-1/3 px-2"
        />
        {/* Image */}
        <ImageUploader
          value={formValue.image?.value ?? ''}
          onClickTrash={() => {}}
          onChange={handleChange}
          label="عکس کالا"
          name="image"
        />
      </div>

      {/* <File name="FMSITechnicalCode" type="text"/> */}
      <div className="flex justify-end gap-2 py-2">
        <Button
          type="button"
          label="انصراف"
          rounded="small"
          color="secandery"
        />
        <Button type="submit" label="ثبت کردن" rounded="small" />
      </div>
    </form>
  )
}

export default ProductManagementForm
