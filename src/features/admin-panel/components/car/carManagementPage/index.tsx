import { getCar } from '@/features/admin-panel/action/car/action'
import CarList from '../carList'
import FilterBox from '@/shared/components/FilterBox'

const CarManagementPage = async () => {
  const cars = await getCar()

  return (
    <>
      <FilterBox />
      <CarList
        list={cars.type === 'success' ? cars.data : []}
        className={'flex-1'}
      />
    </>
  )
}

export default CarManagementPage
