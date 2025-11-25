'use client'
import Button from '@/shared/components/button'
import Modal from '@/shared/components/Modal'
import { useState } from 'react'
import BrandForm from '../CountryForm'
import { TModelCountry } from '@/features/admin-panel/action/CountryAction'



const CountryAdd = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button
        type="button"
        label="اضافه کردن کشور"
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
        label={'اضافه کردن کشور '}
      >
        <BrandForm
          id=""
          countryImage=""
          countryName=""
          flagImage=""
          
          mode="create"
          onCancel={() => {
            setOpen(false)
          }}
        />
      </Modal>
    </>
  )
}

export default CountryAdd
