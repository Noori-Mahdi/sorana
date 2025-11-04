'use client'

import Button from '@/shared/components/button'
import { twMerge } from 'tailwind-merge'
import { GroupButtonsProps } from './types'

const GroupButtons = ({ listBtn, classParent, onClick }: GroupButtonsProps) => {
  return (
    <div className={twMerge('flex items-center gap-2 pt-3', classParent)}>
      {listBtn.map((btn, index) => (
        <Button
          key={btn.key ?? index} // 
          type={btn.type ?? 'button'}
          buttomIcon={btn.buttomIcon}
          color={btn.color}
          size={btn.size}
          rounded={btn.rounded}
          className={btn.className}
          onClick={() => onClick(btn.mode)} 
        />
      ))}
    </div>
  )
}

export default GroupButtons
