'use client'
import { getCar, testComapny } from '@/features/admin-panel/action/carAction'
import { TModelComapny } from '@/features/admin-panel/action/companyAction'
import Button from '@/shared/components/button'
import DropDown from '@/shared/components/DropDown'
import { useEffect, useState } from 'react'

export type TSearchFormPorps = {
  list?: TModelComapny[]
}

const SearchForm = ({ list }: TSearchFormPorps) => {
  const [comapanySelected, setCompanySelected] = useState<string | null>(null)
  const [carSelected, setCarSelected] = useState<string | null>(null)
  const [listCar, setListCar] = useState<testComapny[]>([])
  const [loading, setLoading] = useState(false)

  const handleGetCar = async (comapanySelected: string) => {
    try {
      setLoading(true)
      const res = await getCar(comapanySelected)
      if (res.type === 'success') setListCar(res.data as any)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (comapanySelected) handleGetCar(comapanySelected)
  }, [comapanySelected])
  return (
    <form className="flex items-center gap-2">
      <DropDown
        name="company"
        options={
          list
            ? list.map((c) => ({
                id: c.id,
                title: c.name,
              }))
            : []
        }
        onChange={(e) => {
          setCompanySelected(e.target.value as string)
        }}
        label="کمپانی ها"
        value={comapanySelected}
      />
      <DropDown
        disable={comapanySelected === null}
        name="car"
        options={
          listCar
            ? listCar.map((c) => ({
                id: c.id,
                title: c.series,
              }))
            : []
        }
        label="ماشین"
        onChange={(e) => {
          setCarSelected(e.target.value as string)
        }}
        value={carSelected}
      />
      <Button type="submit" label="search" rounded="small" />
    </form>
  )
}

export default SearchForm
