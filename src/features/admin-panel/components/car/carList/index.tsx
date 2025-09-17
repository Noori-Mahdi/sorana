import { TCar, TCarWithCompany } from '@/features/admin-panel/action/car/action'
import Image from 'next/image'
import ActionButtons from '../ActionButtons'
import AddButton from '../addButton'

type TCarListProps = {
  list: TCarWithCompany[]
}
const CarList = ({ list }: TCarListProps) => {
  return (
    <>
      <ul className="flex flex-wrap">
        {list.map((item, index) => (
          <li className=" flex-1 p-2" key={item.id}>
            <div className="bg-bg-primary flex flex-col relative p-2 rounded-lg border border-primary-800 shadow-lg hover:border-accent-400 cursor-pointer">
              {true && (
                <div className="absolute left-2">
                  <Image src={''} alt="" width={40} height={40} />
                </div>
              )}
              <div className="w-full flex justify-center items-center border-b py-2 border-primary-800">
                <Image src={''} alt="" width={120} height={100} />
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
