'use client'
import { TUser } from '@/features/admin-panel/action/user/action'
import Image from 'next/image'
import { useState } from 'react'
import { CiWarning } from 'react-icons/ci'
import { IoIosArrowDown } from 'react-icons/io'
import { IoPerson } from 'react-icons/io5'

type TUserCardProps = {
  info: TUser
}

const UserCard = ({ info }: TUserCardProps) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <div
        className=" flex justify-between items-center"
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        <div className="flex gap-2 items-center flex-1">
          <div>
            {info.image ? (
              <Image alt="" src={info.image} width={10} height={10} />
            ) : (
              <IoPerson />
            )}
          </div>
          <div>{info.userName}</div>
          <div>{`(${info.companyName})`}</div>
        </div>
        <div className="flex gap-2 items-center">
          {info.ban && <CiWarning size={10} className="text-error" />}
          <span>{info.role}</span>
          <IoIosArrowDown
            className={`transition-transform ease-in ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </div>
      {isOpen && (
        <div>
          <div className="flex justify-between items-center">
            <div>شماره تلفن کاربر :</div>
            <div>{info.userPhone}</div>
          </div>
          <div className="flex justify-between items-center">
            <div>شماره تلفن کمپانی :</div>
            <div>{info.companyphone}</div>
          </div>
          <div className="flex justify-between items-center">
            <div>آدرس:</div>
            <div>{info.addrace}</div>
          </div>
          <div className="flex justify-between items-center">
            <div>ایمیل:</div>
            <div>{info.email}</div>
          </div>
          <div className="flex justify-between items-center">
            <div>تعداد خریدهای انجام شده:</div>
            <div>{info.buy}</div>
          </div>
          <div className="flex justify-between items-center">
            <div>تعداد کامنت ها:</div>
            <div>{info.comments}</div>
          </div>
          <div className="flex justify-between items-center">
            <div>تاریخ عضویت:</div>
            <div>{info.createdAt.toString()}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserCard
