
import CountryAdd from '../../components/Brand/BrandAdd'
import { getCountry } from '../../action/CountryAction'
import Image from 'next/image'

const CountryManagement = async () => {
  const countryData = await getCountry()
  return (
    <div className="flex flex-col gap-4 p-3">
      <CountryAdd />
      <ul className="flex items-center">
        {countryData.type === 'success' && countryData.data ? (
          countryData.data.map((e) => (
            <li key={e.id} className='w-1/4 h-full p-2'>
              <div className="relative flex flex-col h-full w-full items-center justify-center bg-bg-primary rounded-md border p-2 border-primary-700">
                <Image
                  alt={e.countryName}
                  src={e.flagImage}
                  width={30}
                  height={30}
                  className="absolute top-0 left-0 translate-1/2"
                />
                <Image
                  alt={e.countryName}
                  src={e.countryImage}
                  width={120}
                  height={120}
                />
                <span>{e.countryName}</span>
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

export default CountryManagement
