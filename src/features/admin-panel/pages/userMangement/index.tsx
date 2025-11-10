import { getUsers } from '@/features/admin-panel/action/userAction'
import UserList from '../../components/userList'

const UserMangementPage = async () => {
  const users = await getUsers(1)
  return (
    <UserList
      className={
        'flex h-[calc(100vh-48px)] flex-1 flex-col gap-2 my-2 px-2 overflow-auto overflow-y-auto'
      }
      list={users.type === 'success' ? users.data : []}
    />
  )
}

export default UserMangementPage
