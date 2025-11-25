import Image from 'next/image'
import { getCountry } from '../../action/CountryAction'
import BrandAdd from '../../components/Brand/BrandAdd'
import { getBrand } from '../../action/BrandAction'

const BrandManagementPage = async () => {
  const country = await getCountry()
  const brand = await getBrand()
  return (
    <div className="flex flex-col gap-4 p-3">
      <BrandAdd
        data={
          country.type === 'success' && country.data ? country.data : undefined
        }
      />
      <ul className="flex items-center">
        {brand.type === 'success' && brand.data ? (
          brand.data.map((e) => (
            <li key={e.id} className="h-full w-1/4 p-2">
              <div className="bg-bg-primary border-primary-700 relative flex h-full w-full flex-col items-center justify-center rounded-md border p-2">
                <Image
                  alt={e.name}
                  src={e.image ?? ''}
                  width={120}
                  height={120}
                />
                <span>{e.name}</span>
              </div>
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
    </div>
  )
}

export default BrandManagementPage
