'use client'

import { IoEye, IoTrash } from 'react-icons/io5'
import Button from '../../components/button'
import { MdEdit } from 'react-icons/md'
import { TUser } from '@/features/admin-panel/action/user/action'

type TableProps = {
  data: TUser[]
  onChange: (action: 'edit' | 'delete' | 'view' | null, user: TUser) => void
}

export default function Table({ data, onChange }: TableProps) {
  if (data.length === 0) {
    return <p className="p-4">داده‌ای موجود نیست</p>
  }

  // گرفتن ستون‌ها از روی اولین آبجکت
  const columns = Object.keys(data[0]) as (keyof TUser)[]

  return (
    <div className="overflow-auto">
      <table className="border-collapse border border-gray-300 w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((key) => (
              <th
                key={String(key)}
                className="border border-gray-300 px-4 py-2 resize-x overflow-auto min-w-[100px] text-center"
              >
                {String(key).toUpperCase()}
              </th>
            ))}
            <th className="border border-gray-300 px-2 py-2 w-fit overflow-auto text-center">
              عملیات‌های دیگر
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {columns.map((key) => (
                <td
                  key={String(key)}
                  className="border border-gray-300 px-4 py-2 text-center"
                >
                  {String(row[key] ?? '—')}
                </td>
              ))}
              <td className="flex justify-center gap-2 border border-gray-300 px-2 py-2 text-center">
                <Button
                  className="bg-green-700"
                  type="button"
                  rounded="full"
                  size="small"
                  buttomIcon={<MdEdit />}
                  onClick={() => onChange('edit', row)}
                />
                <Button
                  color="warning"
                  type="button"
                  rounded="full"
                  size="small"
                  buttomIcon={<IoEye />}
                  onClick={() => onChange('view', row)}
                />
                <Button
                  color="danger"
                  type="button"
                  rounded="full"
                  size="small"
                  buttomIcon={<IoTrash />}
                  onClick={() => onChange('delete', row)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
