'use client'
import Button from '@/shared/components/button'
import Modal from '@/shared/components/Modal'
import { useState } from 'react'
import { BiPlus } from 'react-icons/bi'
import { twMerge } from 'tailwind-merge'
import ProductManagementForm from '../productManagementForm'

const AddButton2 = () => {
  const [show, setShow] = useState(false)

  return (
    <>
      <Button
        buttomIcon={<BiPlus />}
        type="button"
        rounded="full"
        className="w-10 h-10 right-4 fixed bottom-24"
        onClick={() => setShow(true)}
      />
      <Modal
        isOpen={show}
        onClose={() => setShow(false)}
        label="اضافه کردن کمپانی / ماشین"
      >
        <ProductManagementForm />
      </Modal>
    </>
  )
}
export default AddButton2
