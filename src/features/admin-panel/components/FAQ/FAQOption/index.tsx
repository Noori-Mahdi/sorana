'use client'

import Modal from '@/shared/components/Modal'
import { useState } from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { IoTrashBinSharp } from 'react-icons/io5'
import { MdEdit } from 'react-icons/md'
import FAQForm from '../FAQForm'
import { TAccordionItemProps } from '@/features/FAQ/Components/AccordionItem'
import { TModeForm } from '@/shared/types/types'
import { FaEye } from 'react-icons/fa'
import Button from '@/shared/components/button'
import { deleteFAQ } from '@/features/admin-panel/action/FAQAction'
import { useRouter } from 'next/navigation'

type TFAQOptionProps = Omit<TAccordionItemProps, 'option'>

const FAQOption = ({ id, body, header }: TFAQOptionProps) => {
  const [showSetting, setShowSetting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [mode, setMode] = useState<Exclude<TModeForm, 'create'>>('edit')
  const router = useRouter()

  const handleDelete = async () => {
    try {
      const res = await deleteFAQ(id)
      setShowModal(false)
      router.refresh()
    } catch (error) {}
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        setShowSetting(!showSetting)
      }}
      className="relative flex items-center justify-center p-1"
    >
      <HiOutlineDotsVertical />
      {showSetting ? (
        <ul className="bg-bg-primary select-none border-primary-700 absolute top-0 right-0 z-10 flex translate-y-1/3 flex-col rounded-md border">
          <li
            onClick={() => {
              setShowModal(true)
              setMode('view')
            }}
            className="hover:bg-bg-secondary hover:text-accent-400 flex items-center justify-between gap-10 p-2 text-sm"
          >
            <span>نمایش</span>
            <FaEye />
          </li>
          <li
            onClick={() => {
              setShowModal(true)
              setMode('edit')
            }}
            className="hover:bg-bg-secondary hover:text-accent-400 flex items-center justify-between gap-10 p-2 text-sm"
          >
            <span>ویرایش</span>
            <MdEdit />
          </li>
          <li
            onClick={() => {
              setShowModal(true)
              setMode('delete')
            }}
            className="hover:bg-bg-secondary hover:text-accent-400 flex items-center justify-between gap-10 p-2 text-sm"
          >
            <span>حذف</span>
            <IoTrashBinSharp />
          </li>
        </ul>
      ) : null}
      <Modal
        onClose={() => setShowModal(false)}
        isOpen={showModal}
        label={'ویرایش سوال'}
      >
        {mode !== 'delete' ? (
          <FAQForm
            id={id}
            answer={body}
            questions={header}
            mode={mode}
            onCancel={() => {
              setShowModal(false)
            }}
          />
        ) : (
          <div>
            <span>از حذف کردن این سوال مطمئن هستید؟</span>
            <div className="my-3 flex gap-3">
              <Button
                onClick={handleDelete}
                type="button"
                label="تایید"
                color="danger"
              />
              <Button
                type="button"
                label="انصراف"
                color="secandery"
                onClick={() => setShowModal(false)}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default FAQOption
