import React, {useState, useEffect} from "react";
import {Link, useLocation} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UserCard = ({user}) => {
  //since need to delete on the same page, manage deleting states
  const [isDeleting, setIsDeleting] = useState(false);

  //deleting is attached to the btn, on the same page
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
        method: "DELETE",
      });
      toast.success(`${user.name} has been deleted.`);
    } catch (error) {
      toast.error("An error occurred while deleting the user.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="user-card">
      <ToastContainer />
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <Link to={`/update_user/${user.id}`}>
        <button type="submit" id="edit-user-btn">
          Edit User
        </button>
      </Link>
      <button
        type="submit"
        id="delete-user-btn"
        onClick={handleDelete}
        disabled={isDeleting}>
        {isDeleting ? "Deleting..." : "Delete User"}
      </button>
    </div>
  );
};

const UserList = () => {
  //this is to hide, the create new user btn, once i route to the location
  const location = useLocation();

  const [Users, setUsers] = useState([]);
  useEffect(() => {
    //api calling "/users" endpoint
    getUsers();
  }, []);

  //get users function
  async function getUsers() {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <div className="user-list">
        <h1>Users List</h1>
        
        {location.pathname !== "/create_user" && (
          <Link to="/create_user">
            <button className="create-user-button">Create New User</button>
          </Link>
        )}
        <ul>
          {Users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </ul>
      </div>
    </>
  );
};
export default UserList;
