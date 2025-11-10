'use client'
import { TUser } from '@/features/admin-panel/action/userAction'
import Button from '@/shared/components/button'
import Image from 'next/image'
import { useState } from 'react'
import { CiWarning } from 'react-icons/ci'
import { ImBlocked } from 'react-icons/im'
import { IoIosArrowDown } from 'react-icons/io'
import { IoEye, IoPerson, IoTrash } from 'react-icons/io5'
import { twMerge } from 'tailwind-merge'

type TUserCardProps = {
  info: TUser
  loading: boolean
  onClick: (e: 'view' | 'delete' | 'block') => void
}

const UserCard = ({ info, loading, onClick }: TUserCardProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className={twMerge(
        'bg-bg-primary rounded-xl p-4 shadow-md transition-all duration-300',
        'hover:shadow-lg'
      )}
    >
      {/* Header */}
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gray-100">
            {info.image ? (
              <Image
                alt={info.userName}
                src={info.image}
                width={48}
                height={48}
              />
            ) : (
              <IoPerson size={24} className="text-gray-400" />
            )}
          </div>
          <div>
            <div className="font-semibold">{info.userName}</div>
            <div className="text-sm text-gray-500">{info.companyName}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {info.ban && <CiWarning size={20} className="text-red-500" />}
          <span className="text-sm font-medium">{info.role}</span>
          <IoIosArrowDown
            className={`transition-transform duration-300 ease-in-out ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </div>

      {/* Expanded info */}
      <div
        className={`mt-4 overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div className="flex justify-between">
            <span className="font-medium">شماره تلفن کاربر:</span>
            <span>{info.userPhone ?? '-'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">شماره تلفن کمپانی:</span>
            <span>{info.companyphone ?? '-'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">آدرس:</span>
            <span>{info.addrace ?? '-'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">ایمیل:</span>
            <span>{info.email ?? '-'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">تعداد خریدهای انجام شده:</span>
            <span>{info.buy ?? 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">تعداد کامنت‌ها:</span>
            <span>{info.comments ?? 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">تاریخ عضویت:</span>
            <span>{new Date(info.createdAt).toLocaleDateString('fa-IR')}</span>
          </div>
        </div>
        <div className="my-3 flex items-center justify-end gap-2">
          <Button
            type="button"
            buttomIcon={<IoTrash />}
            color="danger"
            disabled={loading}
            onClick={() => onClick('delete')}
            rounded="small"
            size="small"
          />
          <Button
            type="button"
            buttomIcon={<ImBlocked />}
            color="warning"
            disabled={loading}
            onClick={() => onClick('block')}
            rounded="small"
            size="small"
          />
          <Button
            type="button"
            buttomIcon={<IoEye />}
            color="secandery"
            disabled={loading}
            onClick={() => onClick('view')}
            rounded="small"
            size="small"
          />
        </div>
      </div>
    </div>
  )
}

export default UserCard
