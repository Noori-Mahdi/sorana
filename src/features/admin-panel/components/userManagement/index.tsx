'use client'

import { useEffect, useState } from 'react'
import {
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from '../../action/user/action'
import Table from '@/shared/ui/table'
import Modal from '@/shared/components/Modal'
import Button from '@/shared/components/button'
import Input from '@/shared/components/input'

type TUser = {
  id: number
  phone: string
  name: string | null
}

const UserManagementPage = () => {
  const [users, setUsers] = useState<TUser[]>([])
  const [userSelected, setUserSelected] = useState<null | TUser>(null)
  const [modalType, setModalType] = useState<'edit' | 'delete' | 'view' | null>(
    null
  )
  const handleGetUser = async () => {
    try {
      const res = await getUsers()
      if (res.type === 'success') {
        setUsers(res.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async () => {
    try {
      if (userSelected) {
        const res = await deleteUser(userSelected.id)
        handleGetUser()
        setModalType(null)
      }
    } catch (error) {}
  }

  const handleEdit = async () => {
    try {
      if (userSelected) {
        // const res = updateUser(userSelected,data)
      }
    } catch (error) {}
  }

  useEffect(() => {
    handleGetUser()
  }, [])

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="mb-4 font-bold">مدیریت کاربران</h2>
        <span className="text-xs px-2 font-medium">
          تعداد کاربران : {users.length}{' '}
        </span>
      </div>
      <Table
        data={users}
        onChange={(e, user) => {
          setModalType(e), setUserSelected(user)
        }}
      />
      <Modal
        isOpen={modalType !== null}
        label={modalType}
        onClose={() => {
          setModalType(null)
        }}
      >
        {modalType !== 'delete' && (
          <form>
            <div>{userSelected?.id}</div>
            <Input
              value={userSelected?.name ?? ''}
              readOnly={modalType === 'view'}
              name="userName"
              type="text"
              onChange={(e) => {
                if (!userSelected) return
                setUserSelected({
                  ...userSelected,
                  name: e.target.value,
                })
              }}
            />
            <Input
              value={userSelected?.phone ?? ''}
              readOnly={modalType === 'view'}
              name="phone"
              type="text"
              onChange={(e) => {
                if (!userSelected) return
                setUserSelected({
                  ...userSelected,
                  phone: e.target.value,
                })
              }}
            />
            {/* <Input name='role' type=''/> */}
            <div className="flex justify-between gap-3 items-center">
              {modalType === 'edit' && (
                <Button
                  type="button"
                  label="ویررایش"
                  color="primary"
                  onClick={() => {
                    handleEdit()
                  }}
                />
              )}
              <Button
                type="button"
                label="انصراف"
                color="warning"
                onClick={() => {
                  setModalType(null)
                }}
              />
            </div>
          </form>
        )}
        {modalType === 'delete' && (
          <div className="flex flex-col gap-3">
            <div>آیا از حذف این کاربر مطمئن هستید ؟</div>
            <div className="flex gap-2">
              <Button
                type="button"
                label="بله"
                color="danger"
                onClick={() => {
                  handleDelete()
                }}
              />
              <Button
                type="button"
                label="خیر"
                color="warning"
                onClick={() => {
                  setModalType(null)
                }}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default UserManagementPage
