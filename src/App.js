import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser, addUser } from "./userSlice";
import Loader from "./Loader";
import './index.css';

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
    <div style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 style={styles.header}>User List</h1>
          <div style={styles.addUserContainer}>
            <input
              type="text"
              value={newUser}
              onChange={(e) => setNewUser(e.target.value)}
              placeholder="Enter user name"
              style={styles.input}
            />
            <button
              onClick={handleAddUser}
              style={styles.addButton}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#2980b9")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#3498db")}
            >
              Add User
            </button>
          </div>
          <ul style={styles.userList}>
            {users.map((user) => (
              <li
                key={user.id}
                style={{
                  ...styles.userItem,
                  backgroundColor:
                    hoveredUserId === user.id ? "#e0e0e0" : "#f9f9f9", // Change background on hover
                }}
                onMouseEnter={() => setHoveredUserId(user.id)}
                onMouseLeave={() => setHoveredUserId(null)}
              >
                <span style={styles.userName}>{user.name}</span>
                <button
                  style={styles.deleteButton}
                  onClick={() => handleDelete(user.id)}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#ff1a1a")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#ff4d4d")
                  }
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

const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    maxWidth: "600px",
    margin: "50px auto",
    padding: "20px",
  },
  header: {
    textAlign: "center",
    fontSize: "34px",
    color: "white",
    fontFamily: "'Trebuchet MS",

    marginBottom: "20px",
  },
  addUserContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "29px",
    marginRight: "10px",
  },
  addButton: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#3498db",
    border: "none",
    borderRadius: "29px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  userList: {
    listStyleType: "none",
    padding: 0,
    marginTop: "60px",
    gap: "15px",
    display: "flex",
    flexDirection: "column",
  },
  userItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 15px",
    marginBottom: "10px",
    borderRadius: "5px",
    backgroundColor: "transparent", 
    opacity: 0.8,
    borderRadius: "29px",
    boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
    transition: "background-color 0.3s, box-shadow 0.3s", 
  },
  userName: {
    fontSize: "16px",
    color: "#333",
    fontFamily: "'Trebuchet MS",

    fontWeight: "bold",
  },
  deleteButton: {
    padding: "5px 10px",
    fontSize: "14px",
    color: "#fff",
    backgroundColor: "#ff4d4d",
    border: "none",
    borderRadius: "4px",
    fontFamily: "'Trebuchet MS",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default App;