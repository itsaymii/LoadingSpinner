import React from "react";
import {userSelector} from "react-redux";


const UserList = () => {
    const users = userSelector((state) => state.users);

    return (
        <ul>
            {users.map((user, index) => (
                <li key={idx}>{user.name}</li>
            ))}
        </ul>
    )
};
export default UserList;