import { getCar } from '@/features/admin-panel/action/carAction'
import CarList from '../../components/carList'
import FilterBox from '@/features/admin-panel/components/FilterBox'

const CarManagementPage = async () => {
  const cars = await getCar()

  return (
    <>
      <FilterBox />
      <CarList
        list={cars.type === 'success' ? cars.data : []}
        className={'h-[calc(100vh-48px)] flex-1 overflow-y-auto'}
      />
    </>
  )
}

export default CarManagementPage
