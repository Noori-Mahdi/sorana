import { TCar, TCarWithCompany } from '@/features/admin-panel/action/car/action'
import Image from 'next/image'
import ActionButtons from '../ActionButtons'
import AddButton from '../addButton'
import { twMerge } from 'tailwind-merge'

type TCarListProps = {
  list: TCarWithCompany[]
  className?: string
}
const CarList = ({ list, className }: TCarListProps) => {
  return (
    <>
      <ul className={twMerge('flex flex-wrap w-full mb-24', className)}>
        {list.map((item, index) => (
          <li className="p-2 lg:w-1/3 sm:w-1/2  w-full" key={item.id}>
            <div className="bg-bg-primary flex flex-col relative p-2 w-full rounded-lg border border-primary-800 shadow-lg hover:border-accent-400 cursor-pointer">
              {item.imageCar && (
                <div className="absolute left-2">
                  <Image src={item.image} alt="" width={40} height={40} />
                </div>
              )}
              <div className="w-full flex justify-center h-[100px] items-center border-b py-2 border-primary-800">
                <Image
                  src={item.imageCar ?? item.image}
                  alt=""
                  width={120}
                  height={120}
                />
              </div>
              <div className="text-sm flex flex-col gap-2 p-2">
                <div className="flex justify-between">
                  <span>اسم کمپانی:</span>
                  <span>{item.companyName}</span>
                </div>
                <div className="flex justify-between">
                  <span>اسم مدل:</span>
                  <span>{item.series}</span>
                </div>
                <div className="flex justify-between">
                  <span>شماره بدنه:</span>
                  <span>{item.body}</span>
                </div>
              </div>
              <ActionButtons />
            </div>
          </li>
        ))}
      </ul>
      <AddButton />
    </>
  )
}

export default CarList
