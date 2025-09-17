'use client'
import Button from '@/shared/components/button'
import { IoEye, IoTrash } from 'react-icons/io5'
import { BiEdit } from 'react-icons/bi'

const ActionButtons = () => {
  return (
    <div className="flex justify-between items-center gap-2 pt-3">
      <div className="flex gap-3">
        <Button
          buttomIcon={<IoEye />}
          color="secandery"
          size="small"
          rounded="full"
          type="button"
        />
        <Button
          buttomIcon={<BiEdit />}
          color="warning"
          size="small"
          rounded="full"
          type="button"
        />
      </div>

      <Button
        buttomIcon={<IoTrash />}
        color="danger"
        size="small"
        rounded="full"
        type="button"
      />
    </div>
  )
}

export default ActionButtons
