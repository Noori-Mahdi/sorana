'use client'
import Button from '@/shared/components/button'
import Input from '@/shared/components/input'
import Modal from '@/shared/components/Modal'
import { useState } from 'react'
import { BiPlus } from 'react-icons/bi'
import { twMerge } from 'tailwind-merge'
import CarManagementForm from '../carManagementForm'
import CompanyForm from '../companyForm'

const AddButton = () => {
  const [show, setShow] = useState(false)
  const [mode, setMode] = useState<'ماشین' | 'کمپانی'>('ماشین')

  const options: Array<'ماشین' | 'کمپانی'> = ['ماشین', 'کمپانی']

  return (
    <>
      <Button
        buttomIcon={<BiPlus />}
        type="button"
        rounded="full"
        className="w-10 h-10 m-2  sticky bottom-22 md:bottom-0 "
        onClick={() => setShow(true)}
      />
      <Modal
        isOpen={show}
        onClose={() => setShow(false)}
        label="اضافه کردن کمپانی / ماشین"
      >
        <>
          <ul className="flex  gap-4">
            {options.map((item) => (
              <li key={item}>
                <div
                  className={twMerge(
                    'cursor-pointer',
                    mode === item && 'text-accent-400'
                  )}
                  onClick={() => setMode(item)}
                >
                  {item}
                </div>
              </li>
            ))}
          </ul>
          {mode === 'کمپانی' && <CompanyForm />}
          {mode === 'ماشین' && <CarManagementForm />}
        </>
      </Modal>
    </>
  )
}

export default AddButton
