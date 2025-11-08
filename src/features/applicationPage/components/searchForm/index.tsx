import Button from '@/shared/components/button'
import DropDown from '@/shared/components/DropDown'

const SearchForm = () => {
  return (
    <form className='flex gap-2 items-center'>
      <DropDown name="company" options={[]} label="کمپانی ها" value={''} />
      <DropDown name="car" options={[]} label="ماشین" value={''} />
      <Button type='submit' label='search'  rounded='small'  />
    </form>
  )
}

export default SearchForm
