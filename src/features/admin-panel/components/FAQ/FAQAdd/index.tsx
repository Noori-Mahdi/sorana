'use client'
import Button from '@/shared/components/button'
import Modal from '@/shared/components/Modal'
import { useState } from 'react'
import FAQForm from '../FAQForm'

const AddFAQ = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button
        type="button"
        label="ایجاد سوال پر تکرار"
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
        label={'ایجاد سوال جدید'}
      >
        <FAQForm
          id=""
          answer=""
          questions=""
          mode="create"
          onCancel={() => {
            setOpen(false)
          }}
        />
      </Modal>
    </>
  )
}

export default AddFAQ
