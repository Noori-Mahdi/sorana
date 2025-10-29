'use client'
import {
  getCar,
  TCar,
  TCarWithCompany,
} from '@/features/admin-panel/action/car/action'
import Image from 'next/image'
import ActionButtons from '../ActionButtons'
import AddButton from '../addButton'
import { twMerge } from 'tailwind-merge'
import { useState } from 'react'
import Modal from '@/shared/components/Modal'
import Button from '@/shared/components/button'
import CarManagementForm from '../carManagementForm'

type TCarListProps = {
  list: TCarWithCompany[]
  className?: string
}
const CarList = ({ list, className }: TCarListProps) => {
  const [selectCar, setSelectCar] = useState({})

  const [mode, setMode] = useState<'view' | 'edit' | 'delete' | null>(null)

  const handleAction = async (id: string, mode: 'view' | 'edit' | 'delete') => {
    try {
      if (mode != 'delete') {
        const res = await getCar(id)
        if (res.type == 'success') {
          setSelectCar(res.data[0])
        }
      }
    } catch (error) {}
  }

  return (
    <>
      <ul className={twMerge('mb-24 flex w-full flex-wrap', className)}>
        {list.map((item, index) => (
          <li className="w-full p-2 sm:w-1/2 lg:w-1/3" key={item.id}>
            <div className="bg-bg-primary border-primary-800 hover:border-accent-400 relative flex w-full cursor-pointer flex-col rounded-lg border p-2 shadow-lg">
              {item.imageCar && (
                <div className="absolute left-2">
                  <Image src={item.image} alt="" width={40} height={40} />
                </div>
              )}
              <div className="border-primary-800 flex h-[100px] w-full items-center justify-center border-b py-2">
                <Image
                  src={item.imageCar ?? item.image}
                  alt=""
                  width={120}
                  height={120}
                />
              </div>
              <div className="flex flex-col gap-2 p-2 text-sm">
                <div className="flex justify-between">
                  <span>اسم کمپانی:</span>
                  <span>{item.companyName}</span>
                </div>
                <div className="flex justify-between">
                  <span>اسم مدل:</span>
                  <span>{item.series}</span>
                </div>
                <div className="flex justify-between">
                  <span>شماره بدنه:</span>
                  <span>{item.body}</span>
                </div>
              </div>
              <ActionButtons
                onClick={(mode) => {
                  ;(setMode(mode), handleAction(item.id, mode))
                }}
              />
            </div>
          </li>
        ))}
      </ul>
      <AddButton />
      <Modal
        label={mode}
        isOpen={mode != null}
        onClose={() => setMode(null)}
        children={
          mode === 'delete' ? (
            <div>
              <span>از حذف کردن این خودرو مطمئنید ؟</span>
              <div className="my-3 flex gap-3">
                <Button type="button" label="تایید" color="danger" />
                <Button type="button" label="انصراف" color="secandery" />
              </div>
            </div>
          ) : (
            <CarManagementForm />
          )
        }
      />
    </>
  )
}

export default CarList
