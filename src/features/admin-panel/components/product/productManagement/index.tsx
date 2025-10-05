import Button from '@/shared/components/button'
import DropDown from '@/shared/components/DropDown'
import ImageUploader from '@/shared/components/ImageUploader'
import Input from '@/shared/components/input'
import ActionButtons from '../../car/ActionButtons'
import AddButton from '../../car/addButton'
import ProductList from '../productList'
import { getProduct } from '@/features/admin-panel/action/product/actoin'


const ProductManagementPage = async() => {
  const product = await getProduct()

  if (product.type === 'success') {
    return (
      <div>
        <ProductList list={product.data} />
      </div>
    )
  }
}


export default ProductManagementPage
