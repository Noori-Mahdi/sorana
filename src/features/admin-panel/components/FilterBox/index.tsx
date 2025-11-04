'use client'
import { useEffect, useState } from 'react'
import Button from '../../../../shared/components/button'
import SearchBox from '../../../../shared/components/search-box'
import { RiFilter3Line } from 'react-icons/ri'
import DropDown from '../../../../shared/components/DropDown'
import { getCompany } from '@/features/admin-panel/action/carAction'
import Input from '../../../../shared/components/input'
import { IoBarcodeOutline } from 'react-icons/io5'
import { CompanyInfo, TCompany, TCompanyResponse } from '../../types/actionType'

const FilterBox = () => {
  const [searchValue, setSearchValue] = useState<string | null>(null)
  const [isOpenFilterBox, setIsOpenFilterBox] = useState(false)
  const [listCompany, setListCompany] = useState<TCompany[] | null>(null)
  const [bodySearch, setBodySearch] = useState('')
  const [loading, setLoading] = useState(false)

  const getCompanyAsync = async () => {
    setLoading(true)
    try {
      const res = await getCompany(1)
      if (res.type === 'success') {
        setListCompany(res.data)
      }
    } catch (error) {
    } finally {
      setLoading(true)
    }
  }

  useEffect(() => {
    getCompanyAsync()
  }, [])

  return (
    <div className="p-2">
      <div className="mt-3 flex flex-col items-start justify-start gap-3 md:flex-row md:items-center md:justify-start">
        <Button
          type="button"
          className="bg-bg-primary border-primary-800 hover:border-accent-500 hover:bg-bg-secondary order-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border p-2 md:order-none"
          color="muted"
          buttomSecondIcon={<RiFilter3Line />}
          onClick={() => setIsOpenFilterBox(!isOpenFilterBox)}
        />

        <SearchBox
          onChange={(e) => {
            setSearchValue(e)
          }}
          value={searchValue ?? ''}
          placeholder={'جستجو'}
          classNameParent={'lg:w-1/3 md:w-1/2 w-full '}
        />
      </div>
      {isOpenFilterBox && (
        <div className="bg-bg-primary relative my-2 h-fit w-full rounded-md p-3 shadow-lg">
          <span className="text-sm"> فیلترها :</span>
          <div className="bg-bg-primary absolute top-0 right-0 h-4 w-4 -translate-1/2 rotate-45"></div>
          <ul className="my-3 flex flex-col items-start justify-start gap-0  md:flex-row md:items-center md:gap-2">
            <li className="w-full flex-1">
              <DropDown
                multiple
                label="کمپانی‌ها"
                name="company"
                loading={loading}
                empty={!loading && !listCompany}
                options={
                  listCompany
                    ? listCompany.map((c) => ({
                        id: c.id,
                        title: c.name,
                        image: c.image,
                      }))
                    : []
                }
              />
            </li>
            <li className="w-full flex-1">
              <Input
                classNameInput="h-10"
                classNameBox="my-5"
                name="body"
                type="text"
                label="شماره بدنه"
                error={null}
                value={bodySearch}
                onChange={(e) => setBodySearch(e.target.value)}
                inputIcon={<IoBarcodeOutline />}
              />
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default FilterBox
