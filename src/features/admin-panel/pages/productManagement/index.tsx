// import { getProductBase } from '@/features/admin-panel/action/ProductBaseActoin'
import FilterBox from '../../components/FilterBox'
import ProductBaseList from '../../components/ProductBaseManagement/productBaseList'

const ProductManagementPage = async () => {
  // const product = await getProductBase()
  // console.log(product, 'product')
  // if (product.type === 'success') {
    return (
      <>
        <FilterBox />
        {/* <ProductBaseList
          list={product.data}
          className={'h-[calc(100vh-48px)] flex-1 overflow-y-auto'}
        /> */}
      </>
    )
//   }
}

export default ProductManagementPage
