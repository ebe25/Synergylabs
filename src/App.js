import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Styles/App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", phone: "" });
  const [editUserId, setEditUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleCreateUser = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      const data = await response.json();
      setUsers([...users, data]);
      setNewUser({ name: "", email: "", phone: "" });
      toast.success("User created successfully");
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Error creating user");
    }
  };

  const handleEditUser = (userId, userData) => {
    setEditUserId(userId);
    setEditedUser(userData);
  };

  const handleUpdateUser = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${editUserId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedUser),
        }
      );

      const data = await response.json();
      const updatedUsers = users.map((user) =>
        user.id === editUserId ? data : user
      );
      setUsers(updatedUsers);
      setEditUserId(null);
      setEditedUser({ name: "", email: "", phone: "" });
      toast.success("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: "DELETE",
      });

      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user");
    }
  };

  return (
    <div className="App">
      <div className="create-user">
        <h2>Create User</h2>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          value={newUser.phone}
          onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
        />
        <button onClick={handleCreateUser}>Create</button>
      </div>

      <div className="users-list">
        <h1>User List</h1>
        <div className="user-cards">
          {users.map((user) => (
            <div className="user-card" key={user.id}>
              <div className="user-card-content">
                <strong>Name:</strong> {user.name}
                <br />
                <strong>Email:</strong> {user.email}
                <br />
                <strong>Phone:</strong> {user.phone}
                <br />
              </div>
              <div className="user-card-buttons">
                <button onClick={() => handleEditUser(user.id, user)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </button>
              </div>
              {editUserId==user.id && (
                <div className="edit-user">
                  <h2>Edit User</h2>
                  <input
                    type="text"
                    placeholder="Name"
                    value={editedUser.name}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, name: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Email"
                    value={editedUser.email}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, email: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Phone"
                    value={editedUser.phone}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, phone: e.target.value })
                    }
                  />
                  <button onClick={handleUpdateUser}>Update</button>
                </div>
              )}
        
            </div>
          ))}
        </div>
      </div>

     
      <ToastContainer />
    </div>
  );
}

export default App;
