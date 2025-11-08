import { TUser } from '@/features/admin-panel/action/userAction'
import UserCard from '../userCard'

type TUserListProps = {
  list: TUser[] | []
}

const UserList = ({ list }: TUserListProps) => {
  return (
    <ul className='m-4 flex flex-col gap-2 overflow-auto'>
      {list.map((itme) => (
        <li key={itme.id}>
          <UserCard info={itme} />
        </li>
      ))}
    </ul>
  )
}

export default UserList
