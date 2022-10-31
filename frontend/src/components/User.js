import React from 'react'

const UserItem = ({user}) => {
    return (
        <tr>
            <td>{user.username}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
        </tr>
    )
}


const UserList = ({users}) => {
    return (
        <table style={{margin: '0 auto', width: '50%', tableLayout: 'fixed'}}>
            <thead>
            <tr>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
            </tr>
            </thead>
            <tbody>
                {users.map((user_, index) => <UserItem key={index} user={user_}/>)}
            </tbody>
        </table>
    )
}
export default UserList;
