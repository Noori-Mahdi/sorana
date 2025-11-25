'use client'

import {
  getCar,
  TModleCarAndCompany,
} from '@/features/admin-panel/action/carAction'
import Image from 'next/image'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { BiEdit, BiPlus } from 'react-icons/bi'
import { IoEye, IoTrash } from 'react-icons/io5'

import Button from '@/shared/components/button'
import Modal from '@/shared/components/Modal'
import GroupButtons from '@/shared/components/GroupButtons'
import CompanyForm from '../../Copmany/companyForm'
import CarManagementForm from '../carManagementForm'

import { TCarWithCompany } from '../../../types/actionType'
import { TButtonProps } from '@/shared/components/button/type'
import { TButtonMode } from '@/shared/components/GroupButtons/types'
import { FaEdit } from 'react-icons/fa'
import Card from '@/shared/components/card'

type TCarListProps = {
  list: TModleCarAndCompany[]
  className?: string
}

const CarList = ({ list, className }: TCarListProps) => {
  const [cars, setCars] = useState(list)
  const [selectedCar, setSelectedCar] = useState<TCarWithCompany | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [addMode, setAddMode] = useState<'ماشین' | 'کمپانی'>('ماشین')
  const [actionMode, setActionMode] = useState<TButtonMode | null>(null)
  const [loading, setLoading] = useState(false)

  // const handleAction = async (id: string, mode: TButtonMode) => {
  //   setLoading(true)
  //   setActionMode(mode)
  //   try {
  //     if (mode !== 'delete') {
  //       const res = await getCar(id)
  //       if (res.type === 'success') {
  //       setSelectedCar(res.data[0])
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error fetching car:', error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  return (
    <>
      <ul className={twMerge('flex w-full flex-wrap', className)}>
        {cars.map((item) => (
          <li className="w-full p-2 sm:w-1/2 lg:w-1/5" key={item.id}>
            <Card
              id={item.id}
              coverImage={item.image}
              mainImage={item.imageCar ?? undefined}
              infoCard={item.carInfo}
              loading={loading}
              onClick={() => {}}
              className=""
            />
          </li>
        ))}
      </ul>

      <Button
        buttomIcon={<BiPlus />}
        type="button"
        rounded="full"
        className="sticky bottom-22 m-2 h-10 w-10 md:bottom-0"
        onClick={() => setShowAddModal(true)}
      />

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        label="اضافه کردن کمپانی / ماشین"
      >
        <>
          <ul className="flex gap-4">
            {['ماشین', 'کمپانی'].map((item) => (
              <li key={item}>
                <div
                  className={twMerge(
                    'cursor-pointer',
                    addMode === item && 'text-accent-400'
                  )}
                  onClick={() => setAddMode(item as 'ماشین' | 'کمپانی')}
                >
                  {item}
                </div>
              </li>
            ))}
          </ul>
          {addMode === 'کمپانی' && <CompanyForm />}
          {addMode === 'ماشین' && <CarManagementForm />}
        </>
      </Modal>

      <Modal
        label={
          actionMode === 'view'
            ? 'مشاهده ماشین'
            : actionMode === 'edit'
              ? 'ویرایش ماشین'
              : 'حذف ماشین'
        }
        isOpen={actionMode !== null}
        onClose={() => setActionMode(null)}
      >
        {actionMode === 'delete' ? (
          <div>
            <span>از حذف کردن این خودرو مطمئن هستید؟</span>
            <div className="my-3 flex gap-3">
              <Button type="button" label="تایید" color="danger" />
              <Button
                type="button"
                label="انصراف"
                color="secandery"
                onClick={() => setActionMode(null)}
              />
            </div>
          </div>
        ) : (
          <CarManagementForm />
        )}
      </Modal>
    </>
  )
}

export default CarList
