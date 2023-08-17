import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateUserForm = () => {
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      const updatedUserData = data.map((user) => ({
        id: user.id,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      }));
      setUsers(updatedUserData);
    } catch (error) {
      console.log(error.message);
    }
  }

  const preUserID=(users)=>{
    for(let i=0;i<users.length;i++){
        
    }
  }

  // States to maintain the pre-filled user details
  const [UserID, setUserID] = useState(Users.length >0? preUserID() : "");
  const [Name, setName] = useState(Users.length >0? preName() : "");
  const [Email, setEmail] = useState(Users.length >0? preEmail() : "");
  const [Phone, setPhone] = useState(Users.length >0? prePhone() : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    // updateUser();
  };

  const updateUserBody = {
    id: UserID,
    name: Name,
    email: Email,
    phone: Phone,
  };
  console.log(updateUserBody);

//   const updateUser = async () => {
//     try {
//       const res = await fetch(
//         `https://jsonplaceholder.typicode.com/users/${updateUserBody.id}`,
//         {
//           method: "PUT",
//           body: JSON.stringify(updateUserBody),
//           headers: {
//             "Content-type": "application/json",
//           },
//         }
//       );
//       if (res.ok) {
//         const data = await res.json(); // You need to await the JSON parsing
//         setUsers(data);
//         console.log("User Updated:", data);
//         toast.success("User Updated Successfully");
//       } else {
//         console.log("Error:", res.status);
//         toast.error("Error: " + res.status);
//       }
//     } catch (error) {
//       console.log("Error", error);
//     }
//   };

  return (
    <>
      <div className="update-users">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            Name:
            <input
              type="text"
              id="name"
              value={Name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="text"
              id="email"
              value={Email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <label htmlFor="phone">
            Phone:
            <input
              type="text"
              id="phone"
              value={Phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </label>
          <button type="submit" id="save-btn">
            Save
          </button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default UpdateUserForm;
