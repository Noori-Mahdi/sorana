'use client'
import Button from '@/shared/components/button'
import { IoEye, IoTrash } from 'react-icons/io5'
import { BiEdit } from 'react-icons/bi'

type TActionButtonsProps = {
  onClick: (mode: 'view' | 'edit' | 'delete') => void
}

const ActionButtons = ({ onClick }: TActionButtonsProps) => {
  return (
    <div className="flex items-center justify-between gap-2 pt-3">
      <div className="flex gap-3">
        <Button
          buttomIcon={<IoEye />}
          color="secandery"
          size="small"
          rounded="full"
          type="button"
          onClick={() => onClick('view')}
        />
        <Button
          buttomIcon={<BiEdit />}
          color="warning"
          size="small"
          rounded="full"
          type="button"
          onClick={() => onClick('edit')}
        />
      </div>

      <Button
        buttomIcon={<IoTrash />}
        color="danger"
        size="small"
        rounded="full"
        type="button"
        onClick={() => onClick('delete')}
      />
    </div>
  )
}

export default ActionButtons
