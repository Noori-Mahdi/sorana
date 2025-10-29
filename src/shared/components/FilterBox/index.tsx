'use client'
import { useEffect, useState } from 'react'
import Button from '../button'
import SearchBox from '../search-box'
import { RiFilter3Line } from 'react-icons/ri'
import DropDown from '../DropDown'
import { getCompany } from '@/features/admin-panel/action/car/action'

type CompanyInfo = { name: string; id: string; image: string }

const FilterBox = () => {
  const [searchValue, setSearchValue] = useState<string | null>(null)
  const [isOpenFilterBox, setIsOpenFilterBox] = useState(false)
  const [listCompany, setListCompany] = useState<CompanyInfo[]>([])

  const getCompanyAsync = async () => {
    try {
      const res = await getCompany()
      if (res.data) {
        setListCompany(res.data)
      }
    } catch (error) {}
  }

  useEffect(() => {
    getCompanyAsync()
  }, [])
  console.log(listCompany)
  return (
    <>
      <div className="mt-3 flex items-center justify-between gap-3">
        <Button
          type="button"
          className="bg-bg-primary border-primary-800 hover:border-accent-500 hover:bg-bg-secondary flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border p-2"
          color="muted"
          buttomSecondIcon={<RiFilter3Line />}
          onClick={() => setIsOpenFilterBox(!isOpenFilterBox)}
        />
        <SearchBox
          onChange={(e) => {
            setSearchValue(e)
          }}
          value={searchValue ?? ''}
        />
      </div>
      {isOpenFilterBox && (
        <ul className="bg-bg-primary relative my-2 h-fit w-full rounded-md p-3 shadow-lg">
          <div className="bg-bg-primary absolute  top-0 right-0 h-4 w-4 -translate-1/2 rotate-45"></div>
          <span className="text-sm"> فیلترها :</span>
          <li>
            <DropDown
              multiple
              label="کمپانی‌ها"
              name="company"
              options={listCompany.map((c) => ({
                id: c.id,
                title: c.name,
                image: c.image,
              }))}
            />
          </li>
        </ul>
      )}
    </>
  )
}

export default FilterBox
