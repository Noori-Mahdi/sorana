import ProductList from '../../components/productList'
import { getProduct } from '@/features/admin-panel/action/productActoin'
import FilterBox from '../../components/FilterBox'

const ProductManagementPage = async () => {
  const product = await getProduct()
  console.log(product, 'product')
  if (product.type === 'success') {
    return (
      <>
        <FilterBox />
        <ProductList
          list={product.data}
          className={'h-[calc(100vh-48px)] flex-1 overflow-y-auto'}
        />
      </>
    )
  }
}

export default ProductManagementPage
