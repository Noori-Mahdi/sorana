import { getCar, getCompany } from '@/features/admin-panel/action/car/action'
import CarList from '../carList'
import Slider from '@/shared/components/Slider'
import Image from 'next/image'

const CarManagementPage = async () => {
  const cars = await getCar()
  const company = await getCompany()

  return (
    <>
      <Slider
        className="px-2"
        title="کمپانی ها :"
        children={
          <div className="flex justify-center items-center gap-4">
            {company.type === 'success' &&
              company.data?.map((e) => (
                <Image src={e.image} alt="" width={40} height={40} />
              ))}
          </div>
        }
      />
      <CarList
        list={cars.type === 'success' ? cars.data : []}
        className={'flex-1'}
      />
    </>
  )
}

export default CarManagementPage
