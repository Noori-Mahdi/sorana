import { getCar } from '@/features/admin-panel/action/car/action'
import CarList from '../carList'

const CarManagementPage = async () => {
  const cars = await getCar()

  if (cars.type === 'success') {
    return (
      <div>
        <CarList list={cars.data} />
      </div>
    )
  }
}

export default CarManagementPage
