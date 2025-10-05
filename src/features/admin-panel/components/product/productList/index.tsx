import Image from 'next/image'
import ActionButtons from '../../car/ActionButtons'
import { TProduct } from '@/features/admin-panel/action/product/actoin'
import AddButton2 from '../addButton2'

type TProductListProps = {
  list: TProduct[]
}

const ProductList = ({ list }: TProductListProps) => {
  return (
    <>
      <ul className="flex flex-wrap">
        {list.map((item, index) => (
          <li className=" lg:w-1/3 sm:w-1/2  w-full p-2" key={item.id}>
            <div className="bg-bg-primary flex flex-col relative p-2 rounded-lg border border-primary-800 shadow-lg hover:border-accent-400 cursor-pointer">
              <div className="w-full flex justify-center items-center border-b py-2 border-primary-800">
                <Image src={item.image} alt="" width={120} height={100} />
              </div>
              <div className="text-sm flex flex-col gap-2 p-2">
                <div className="flex justify-between">
                  <span>اسم کالا:</span>
                  <span>{item.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>نوع کالا:</span>
                  <span>{item.type}</span>
                </div>
                <div className="flex justify-between">
                  <span> اندازه طولی:</span>
                  <span>{item.length}</span>
                </div>
                <div className="flex justify-between">
                  <span> اندازه عرضی:</span>
                  <span>{item.width}</span>
                </div>
                <div className="flex justify-between">
                  <span> کد فنی اصلی:</span>
                  <span>{item.mainTechnicalCode}</span>
                </div>{' '}
                <div className="flex justify-between">
                  <span> کد فنی FMSI:</span>
                  <span>{item.FMSITechnicalCode}</span>
                </div>{' '}
                <div className="flex justify-between">
                  <span> کد فنی HIQ:</span>
                  <span>{item.HIQTechnicalCode}</span>
                </div>{' '}
                <div className="flex justify-between">
                  <span> کد فنی WVA:</span>
                  <span>{item.WVATechnicalCode}</span>
                </div>
              </div>
              <ActionButtons />
            </div>
          </li>
        ))}
      </ul>
      <AddButton2 />
    </>
  )
}

export default ProductList
