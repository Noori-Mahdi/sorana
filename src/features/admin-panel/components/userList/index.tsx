'use client'

import {
  blockUserAction,
  deleteUserAction,
  getUsers,
  TUser,
} from '@/features/admin-panel/action/userAction'
import UserCard from '../userCard'
import { useEffect, useState, useRef } from 'react'
import { loadNextPageIfShort, setupInfiniteScroll } from '@/shared/utils/scroll'
import UserCardSkeleton from './UserCardSkeleton'
import { twMerge } from 'tailwind-merge'
import Modal from '@/shared/components/Modal'
import Button from '@/shared/components/button'

type TUserListProps = {
  list: TUser[] | []
  className?: string
}

const UserList = ({ list, className }: TUserListProps) => {
  const [users, setUsers] = useState(list)
  const [page, setPage] = useState(2)
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [userSelected, setUserSelected] = useState<TUser | null>(null)
  const [mode, setMode] = useState<'view' | 'delete' | 'block' | null>(null)
  const isLoading = useRef(false)

  const handleAction = async () => {
    try {
      setLoading2(true)
      if (userSelected) {
        if (mode === 'block') {
          const res = await blockUserAction(
            userSelected?.id,
            !userSelected?.ban
          )
        }
        if (mode === 'delete') {
          const res = await deleteUserAction(userSelected.id)
        }
      }
      setupInfiniteScroll(page, setUsers, setPage, isLoading, fetchUsers)
    } catch (error) {
    } finally {
      setLoading2(false)
    }
  }

  const fetchUsers = async (page: number) => {
    setLoading(true)
    isLoading.current = true

    try {
      const res = await getUsers(page)
      if (res.type === 'success') return res.data
      return []
    } catch (err) {
      console.error(err)
      return []
    } finally {
      isLoading.current = false
      setLoading(false)
    }
  }

  useEffect(() => {
    loadNextPageIfShort(page, setUsers, setPage, isLoading, fetchUsers)
  }, [])

  useEffect(() => {
    const cleanup = setupInfiniteScroll(
      page,
      setUsers,
      setPage,
      isLoading,
      fetchUsers
    )
    return cleanup
  }, [page])

  return (
    <ul className={className}>
      {users.map((user) => (
        <li key={user.id}>
          <UserCard
            info={user}
            loading={loading}
            onClick={(e) => {
              setUserSelected(user)
              setMode(e)
            }}
          />
        </li>
      ))}

      {loading &&
        Array.from({ length: 4 }).map((_, i) => (
          <li key={`skeleton-${i}`}>
            <UserCardSkeleton />
          </li>
        ))}
      <Modal
        isOpen={mode != null}
        label={
          mode === 'block'
            ? 'بلاک کردن کاربر'
            : mode === 'delete'
              ? 'حذف کاربر'
              : 'نمایش مشخصات'
        }
        onClose={() => {
          if (!loading2) setMode(null)
        }}
      >
        {mode === 'block' ? (
          <div className="flex flex-col gap-3">
            <div>{`آیا از بلاک کردن کاربر ${userSelected?.userName} مطمئن هستید؟`}</div>
            <div className="flex gap-2">
              <Button
                disabled={loading2}
                type="button"
                label="انصراف"
                color="secandery"
                onClick={() => setMode(null)}
              />
              <Button
                disabled={loading2}
                type="button"
                label="بلاک"
                color="primary"
                onClick={handleAction}
              />
            </div>
          </div>
        ) : mode === 'delete' ? (
          <div className="flex flex-col gap-3">
            <div>{`آیا از حذف کردن کاربر ${userSelected?.userName} مطمئن هستید؟`}</div>
            <div className="flex gap-2">
              <Button
                disabled={loading2}
                type="button"
                label="انصراف"
                color="secandery"
                onClick={() => setMode(null)}
              />
              <Button
                disabled={loading2}
                type="button"
                label="حذف"
                color="primary"
                onClick={handleAction}
              />
            </div>
          </div>
        ) : (
          'نمایش مشخصات'
        )}
      </Modal>
    </ul>
  )
}

export default UserList
