import React, { useEffect, useState } from 'react'
import UsersTable from '../Components/UserTable';
import useFetch from '../customHook/UseFetch';
import AddUserModal from '../Components/AddUserModal';
import { jpAxios } from '../jpAxios';
import axios from 'axios';

export default function UploadUsers() {
    const { data: users,setData:setUsers, loading, error } = useFetch("https://jsonplaceholder.typicode.com/users");
    const [isShowAddUserModal , setIsShowAddUserModal] = useState(false);
    {/*Only for test axios.all */}
    useEffect(()=> {
        axios.all([
            axios.get("https://jsonplaceholder.typicode.com/users"),
            axios.get("https://jsonplaceholder.typicode.com/Todos")
        ]).then(res => console.log(res))

    }, [])



    const closeModal =()=> setIsShowAddUserModal(false);
    const addUser =(newUser)=> {
        setUsers(prevState=> [...prevState , newUser])
        jpAxios.post("/users" , newUser).then(res=> alert(res));
    }
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <button onClick={()=> setIsShowAddUserModal(true)}>Add User</button>
            <h2>User List</h2>
            {users && <UsersTable users={users} setUsers={setUsers} />}
            <AddUserModal isOpen={isShowAddUserModal}  closeModal={closeModal} addUser={addUser} />
        </div>
    );
}
