import { IoEye, IoTrash } from 'react-icons/io5'
import Button from '../button'
import { FaEdit } from 'react-icons/fa'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

export type TInfoCardItem = Record<string, string | number | Date | null>

export type TCardProps = {
  id: string
  loading?: boolean
  className?: string
  mainImage?: string
  coverImage: string
  infoCard?: TInfoCardItem
  onClick: (e: 'view' | 'edit' | 'delete') => void
}

const Card = ({
  id,
  loading,
  className,
  mainImage,
  coverImage,
  infoCard,
  onClick,
}: TCardProps) => {
  return (
    <div
      className={twMerge(
        'bg-bg-primary border-primary-800 hover:bordder-accent-400 relative flex h-[320px] w-full cursor-pointer flex-col gap-6 rounded-lg border p-2 shadow-lg',
        className
      )}
    >
      {mainImage && (
        <div className="absolute left-2">
          <Image src={coverImage} alt="car logo" width={40} height={40} />
        </div>
      )}

      <div className="border-primary-800 flex h-[100px] w-full items-center justify-center border-b py-2">
        <Image
          src={mainImage ?? coverImage}
          alt={''}
          width={120}
          height={120}
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 overflow-hidden p-2 text-sm">
        {infoCard &&
          Object.entries(infoCard).map(
            ([key, value]) =>
              value && (
                <div key={key} className="flex justify-between">
                  <span>{value.toString()}</span>
                  <span>: {key}</span>
                </div>
              )
          )}
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          buttomIcon={<IoEye />}
          color="secandery"
          disabled={loading}
          onClick={() => onClick('view')}
          rounded="small"
          size="small"
        />
        <Button
          type="button"
          buttomIcon={<FaEdit />}
          color="warning"
          disabled={loading}
          onClick={() => onClick('edit')}
          rounded="small"
          size="small"
        />
        <Button
          type="button"
          buttomIcon={<IoTrash />}
          color="danger"
          disabled={loading}
          onClick={() => onClick('delete')}
          rounded="small"
          size="small"
        />
      </div>
    </div>
  )
}

export default Card
