import { getUsers } from "@/features/admin-panel/action/user/action";
import UserList from "../userList";

const UserMangementPage = async() => {
    const users = await getUsers()
    return ( 
        
        <UserList list={users.type === 'success' ? users.data: []} />
     );
}
 
export default UserMangementPage;