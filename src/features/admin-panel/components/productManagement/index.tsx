import Button from '@/shared/components/button'
import DropDown from '@/shared/components/DropDown'
import Input from '@/shared/components/input'

const ProductManagementPage = () => {
  return (
    <form className="flex flex-col justify-between h-full">
      <div className="flex flex-wrap gap-2">
        <Input name="name" type="text" label="نام" classNameBox="w-1/4" />
        <Input name="length" type="text" label="طول" classNameBox="w-1/4" />
        <Input name="width" type="text" label="عرض" classNameBox="w-1/4" />
        <Input
          name="mainTechnicalCode"
          type="text"
          label="کد فنی اصلی"
          classNameBox="w-1/4"
        />
        <Input
          name="FMSITechnicalCode"
          type="text"
          label="کد فنی FMSI"
          classNameBox="w-1/4"
        />
        <Input
          name="HIQTechnicalCode"
          type="text"
          label="کد فنی HIQ"
          classNameBox="w-1/4"
        />
        <Input
          name="WVATechnicalCode"
          type="text"
          label="کد فنی WVA"
          classNameBox="w-1/4"
        />
        <DropDown
          name="brakes"
          options={[]}
          label="لنت و دیسک"
          className="w-1/4"
        />{' '}
      </div>
      {/* <File name="FMSITechnicalCode" type="text"/> */}
      <div className="flex gap-2 justify-end">
        <Button type="button" label="انصراف" className="w-[150px]" />
        <Button type="submit" label="ثبت کردن" className="w-[150px]" />
      </div>
    </form>
  )
}

export default ProductManagementPage
