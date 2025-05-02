import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser, addUser } from "./userSlice";
import Loader from "./Loader";
import './App.css'; 

const App = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.users);
  const [newUser, setNewUser] = useState("");
  const [hoveredUserId, setHoveredUserId] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleAddUser = () => {
    if (newUser.trim()) {
      dispatch(addUser(newUser));
      setNewUser("");
    }
  };

  return (
    <div className="container">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="header">USER LIST</h1>
          <div className="addUserContainer">
            <input
              type="text"
              value={newUser}
              onChange={(e) => setNewUser(e.target.value)}
              placeholder="Enter user name"
              className="input"
            />
            <button onClick={handleAddUser} className="addButton">
              Add User
            </button>
          </div>
          <ul className="userList">
            {users.map((user) => (
              <li
                key={user.id}
                className="userItem"
                onMouseEnter={() => setHoveredUserId(user.id)}
                onMouseLeave={() => setHoveredUserId(null)}
              >
                <span className="userName">{user.name}</span>
                <button
                  className="deleteButton"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default App;