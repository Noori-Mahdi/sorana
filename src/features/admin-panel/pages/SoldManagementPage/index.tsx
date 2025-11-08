import { getSold } from '../../action/soldAction'
import SoldList from '../../components/soldList'

const SoldManagementPage = async () => {
  const users = await getSold()
  return <SoldList list={users.type === 'success' ? users.data : []} />
}

export default SoldManagementPage
