import { TUser } from '@/features/admin-panel/action/user/action'
import UserCard from '../userCard'

type TUserListProps = {
  list: TUser[] | []
}

const UserList = ({ list }: TUserListProps) => {
  return (
    <ul>
      {list.map((itme) => (
        <li key={itme.id}>
          <UserCard info={itme} />
        </li>
      ))}
    </ul>
  )
}

export default UserList
