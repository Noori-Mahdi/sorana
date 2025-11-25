'use client'
import Button from '@/shared/components/button'
import Modal from '@/shared/components/Modal'
import { useState } from 'react'
import FAQForm from '../BrandForm'
import CountryForm from '../BrandForm'
import BrandForm from '../BrandForm'
import { TModelCountry } from '@/features/admin-panel/action/CountryAction'

type TBrandAddProps = {
  data?: TModelCountry[]
}

const BrandAdd = ({ data }: TBrandAddProps) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button
        type="button"
        label="اضافه کردن برند"
        onClick={() => {
          setOpen(true)
        }}
        rounded="normal"
        size="fit"
        className="px-4 py-2"
      />
      <Modal
        onClose={() => setOpen(false)}
        isOpen={open}
        label={'اضافه کردن برند جدید'}
      >
        <BrandForm
          id=""
          countryId=""
          name=""
          optoin={data}
          image=""
          mode="create"
          onCancel={() => {
            setOpen(false)
          }}
        />
      </Modal>
    </>
  )
}

export default BrandAdd
