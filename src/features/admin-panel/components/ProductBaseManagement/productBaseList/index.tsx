'use client'

import Image from 'next/image'
import Button from '@/shared/components/button'
import { BiPlus } from 'react-icons/bi'
import { useState } from 'react'
import ProductManagementForm from '../productManagementForm'
import Modal from '@/shared/components/Modal'
import { twMerge } from 'tailwind-merge'
import { FaEdit } from 'react-icons/fa'
import { IoEye, IoTrash } from 'react-icons/io5'
import Card from '@/shared/components/card'
import { TModelProductBase } from '@/features/admin-panel/action/ProductBaseActoin'

type TProductBaseListProps = {
  list?: TModelProductBase[]
  className?: string
}

const ProductBaseList = ({ list, className }: TProductBaseListProps) => {
  const [product, setProduct] = useState(list)
  console.log(list, 'list')
  const [show, setShow] = useState(false)
  return (
    <>
      <ul className={twMerge('flex h-full w-full flex-wrap', className)}>
        {product?.map((item, index) => (
          <li className="w-full p-1 sm:w-1/2 lg:w-1/4" key={item.id}>
            <Card
              coverImage={item.image ?? ''}
              id={item.id}
              onClick={() => {}}
              infoCard={item.productBaseInfo}
              loading={false}
            />
          </li>
        ))}
      </ul>
      <Button
        buttomIcon={<BiPlus />}
        type="button"
        rounded="full"
        className="sticky bottom-22 m-2 h-10 w-10 md:bottom-0"
        onClick={() => setShow(true)}
      />
      <Modal
        isOpen={show}
        onClose={() => setShow(false)}
        label="اضافه کردن کالای پایه"
      >
        <ProductManagementForm />
      </Modal>
    </>
  )
}

export default ProductBaseList
