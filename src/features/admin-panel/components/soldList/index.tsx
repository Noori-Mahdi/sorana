'use client'

import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { BiPlus } from 'react-icons/bi'

import Button from '@/shared/components/button'
import Modal from '@/shared/components/Modal'
import CompanyForm from '../Copmany/companyForm'
import CarManagementForm from '../Car/carManagementForm'

import { TButtonMode } from '@/shared/components/GroupButtons/types'
import { TModelSold } from '../../action/soldAction'
import Table from '@/shared/components/Table'

export type TSoldListProps = {
  className?: string
  list?: TModelSold[]
}

const SoldList = ({ list, className }: TSoldListProps) => {
  const [sold, setSold] = useState(list)
  // const [selectedSold, setSelectetSold] = useState<TCarWithCompany | null>(null)
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
  //         setSelectedCar(res.data[0])
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error fetching car:', error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  const formattedSoldData = sold?.map((item) => {
    const totalPrice = item.products.reduce(
      (sum, p) => sum + p.price * p.quantity,
      0
    )

    return {
      id: item.id,
      user: item.user?.userName ?? '-',
      product: item.products.map((p) => p.product.name).join(', '),
      price: isClient
        ? totalPrice.toLocaleString() + ' تومان' // فقط روی کلاینت
        : totalPrice + ' تومان', // SSR مقدار خام
      time: isClient
        ? new Date(item.createdAt).toLocaleDateString() // فقط روی کلاینت
        : new Date(item.createdAt).toISOString(), // SSR مقدار ISO
    }
  })

  return (
    <>
      <Table
        headers={['id', 'user', 'product', 'price', 'time']}
        data={formattedSoldData ?? []}
        info={sold ?? []}
        className="m-2"
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

export default SoldList
