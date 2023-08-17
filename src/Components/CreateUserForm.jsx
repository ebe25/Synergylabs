import React, {useState} from "react";
import {ToastContainer, toast} from "react-toastify"; //external lib used for non-blocking alerts
import "react-toastify/dist/ReactToastify.css";
import UserList from "./UserList";

const CreateUserForm = () => {

  //maintain states for name, email, phone
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    //logic for making the post(micmicking call to url_api)
    postUserData();
  };

  const postBody = {
    name: Name,
    email: Email,
    Phone: Phone,
  };

  const postUserData = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify(postBody),
        headers: {"Content-type": "application/json"},
      });

      if (res.ok) {
        const data = await res.json();
        console.log("User Created:", data);
        toast.success("User Created Successfully");
      } else {
        console.log("Error:", res.status);
        toast.error("Error: " + res.status);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
  return (
    <>
      <div className="user-form">
      <ToastContainer />
        <h1>Create UserForm</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            Name:
            <input
              type="text"
              id="name"
              value={Name}
              onChange={(e) => {
                setName(e.target.value);
              }}></input>
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="text"
              id="email"
              value={Email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}></input>
          </label>
          <label htmlFor="phone">
            Phone:
            <input
              type="text"
              id="phone"
              value={Phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}></input>
          </label>
          <button type="submit" id="create-user-btn">
            Create User
          </button>
        </form>
      </div>
      <div className="users">
      <UserList/>
      </div>
           
    </>
  );
};

export default CreateUserForm;
