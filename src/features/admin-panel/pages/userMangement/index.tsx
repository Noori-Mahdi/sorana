import { getUsers } from '@/features/admin-panel/action/userAction'
import UserList from '../../components/userList'

const UserMangementPage = async () => {
  const users = await getUsers()
  return <UserList list={users.type === 'success' ? users.data : []} />
}

export default UserMangementPage
