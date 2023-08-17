import "./index.css";
import {jsx as $l7i9T$jsx, Fragment as $l7i9T$Fragment, jsxs as $l7i9T$jsxs} from "react/jsx-runtime";
import {useState as $l7i9T$useState, useEffect as $l7i9T$useEffect} from "react";
import $l7i9T$reactdomclient from "react-dom/client";
import {toast as $l7i9T$toast, ToastContainer as $l7i9T$ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";









function $226872678f9f0005$var$App() {
    const [users, setUsers] = (0, $l7i9T$useState)([]);
    const [newUser, setNewUser] = (0, $l7i9T$useState)({
        name: "",
        email: "",
        phone: ""
    });
    const [editUserId, setEditUserId] = (0, $l7i9T$useState)(null);
    const [editedUser, setEditedUser] = (0, $l7i9T$useState)({
        name: "",
        email: "",
        phone: ""
    });
    (0, $l7i9T$useEffect)(()=>{
        fetch("https://jsonplaceholder.typicode.com/users").then((response)=>response.json()).then((data)=>setUsers(data)).catch((error)=>console.error("Error fetching users:", error));
    }, []);
    const handleCreateUser = async ()=>{
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            });
            const data = await response.json();
            setUsers([
                ...users,
                data
            ]);
            setNewUser({
                name: "",
                email: "",
                phone: ""
            });
            (0, $l7i9T$toast).success("User created successfully");
        } catch (error) {
            console.error("Error creating user:", error);
            (0, $l7i9T$toast).error("Error creating user");
        }
    };
    const handleEditUser = (userId, userData)=>{
        setEditUserId(userId);
        setEditedUser(userData);
    };
    const handleUpdateUser = async ()=>{
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${editUserId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editedUser)
            });
            const data = await response.json();
            const updatedUsers = users.map((user)=>user.id === editUserId ? data : user);
            setUsers(updatedUsers);
            setEditUserId(null);
            setEditedUser({
                name: "",
                email: "",
                phone: ""
            });
            (0, $l7i9T$toast).success("User updated successfully");
        } catch (error) {
            console.error("Error updating user:", error);
            (0, $l7i9T$toast).error("Error updating user");
        }
    };
    const handleDeleteUser = async (userId)=>{
        try {
            await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
                method: "DELETE"
            });
            const updatedUsers = users.filter((user)=>user.id !== userId);
            setUsers(updatedUsers);
            (0, $l7i9T$toast).success("User deleted successfully");
        } catch (error) {
            console.error("Error deleting user:", error);
            (0, $l7i9T$toast).error("Error deleting user");
        }
    };
    return /*#__PURE__*/ (0, $l7i9T$jsxs)("div", {
        className: "App",
        children: [
            /*#__PURE__*/ (0, $l7i9T$jsxs)("div", {
                className: "create-user",
                children: [
                    /*#__PURE__*/ (0, $l7i9T$jsx)("h2", {
                        children: "Create User"
                    }),
                    /*#__PURE__*/ (0, $l7i9T$jsx)("input", {
                        type: "text",
                        placeholder: "Name",
                        value: newUser.name,
                        onChange: (e)=>setNewUser({
                                ...newUser,
                                name: e.target.value
                            })
                    }),
                    /*#__PURE__*/ (0, $l7i9T$jsx)("input", {
                        type: "text",
                        placeholder: "Email",
                        value: newUser.email,
                        onChange: (e)=>setNewUser({
                                ...newUser,
                                email: e.target.value
                            })
                    }),
                    /*#__PURE__*/ (0, $l7i9T$jsx)("input", {
                        type: "text",
                        placeholder: "Phone",
                        value: newUser.phone,
                        onChange: (e)=>setNewUser({
                                ...newUser,
                                phone: e.target.value
                            })
                    }),
                    /*#__PURE__*/ (0, $l7i9T$jsx)("button", {
                        onClick: handleCreateUser,
                        children: "Create"
                    })
                ]
            }),
            /*#__PURE__*/ (0, $l7i9T$jsxs)("div", {
                className: "users-list",
                children: [
                    /*#__PURE__*/ (0, $l7i9T$jsx)("h1", {
                        children: "User List"
                    }),
                    /*#__PURE__*/ (0, $l7i9T$jsx)("div", {
                        className: "user-cards",
                        children: users.map((user)=>/*#__PURE__*/ (0, $l7i9T$jsxs)("div", {
                                className: "user-card",
                                children: [
                                    /*#__PURE__*/ (0, $l7i9T$jsxs)("div", {
                                        className: "user-card-content",
                                        children: [
                                            /*#__PURE__*/ (0, $l7i9T$jsx)("strong", {
                                                children: "Name:"
                                            }),
                                            " ",
                                            user.name,
                                            /*#__PURE__*/ (0, $l7i9T$jsx)("br", {}),
                                            /*#__PURE__*/ (0, $l7i9T$jsx)("strong", {
                                                children: "Email:"
                                            }),
                                            " ",
                                            user.email,
                                            /*#__PURE__*/ (0, $l7i9T$jsx)("br", {}),
                                            /*#__PURE__*/ (0, $l7i9T$jsx)("strong", {
                                                children: "Phone:"
                                            }),
                                            " ",
                                            user.phone,
                                            /*#__PURE__*/ (0, $l7i9T$jsx)("br", {})
                                        ]
                                    }),
                                    /*#__PURE__*/ (0, $l7i9T$jsxs)("div", {
                                        className: "user-card-buttons",
                                        children: [
                                            /*#__PURE__*/ (0, $l7i9T$jsx)("button", {
                                                onClick: ()=>handleEditUser(user.id, user),
                                                children: "Edit"
                                            }),
                                            /*#__PURE__*/ (0, $l7i9T$jsx)("button", {
                                                onClick: ()=>handleDeleteUser(user.id),
                                                children: "Delete"
                                            })
                                        ]
                                    }),
                                    editUserId == user.id && /*#__PURE__*/ (0, $l7i9T$jsxs)("div", {
                                        className: "edit-user",
                                        children: [
                                            /*#__PURE__*/ (0, $l7i9T$jsx)("h2", {
                                                children: "Edit User"
                                            }),
                                            /*#__PURE__*/ (0, $l7i9T$jsx)("input", {
                                                type: "text",
                                                placeholder: "Name",
                                                value: editedUser.name,
                                                onChange: (e)=>setEditedUser({
                                                        ...editedUser,
                                                        name: e.target.value
                                                    })
                                            }),
                                            /*#__PURE__*/ (0, $l7i9T$jsx)("input", {
                                                type: "text",
                                                placeholder: "Email",
                                                value: editedUser.email,
                                                onChange: (e)=>setEditedUser({
                                                        ...editedUser,
                                                        email: e.target.value
                                                    })
                                            }),
                                            /*#__PURE__*/ (0, $l7i9T$jsx)("input", {
                                                type: "text",
                                                placeholder: "Phone",
                                                value: editedUser.phone,
                                                onChange: (e)=>setEditedUser({
                                                        ...editedUser,
                                                        phone: e.target.value
                                                    })
                                            }),
                                            /*#__PURE__*/ (0, $l7i9T$jsx)("button", {
                                                onClick: handleUpdateUser,
                                                children: "Update"
                                            })
                                        ]
                                    })
                                ]
                            }, user.id))
                    })
                ]
            }),
            /*#__PURE__*/ (0, $l7i9T$jsx)((0, $l7i9T$ToastContainer), {})
        ]
    });
}
var $226872678f9f0005$export$2e2bcd8739ae039 = $226872678f9f0005$var$App;


const $cf838c15c8b009ba$var$root = (0, $l7i9T$reactdomclient).createRoot(document.getElementById("root"));
$cf838c15c8b009ba$var$root.render(/*#__PURE__*/ (0, $l7i9T$jsx)((0, $l7i9T$Fragment), {
    children: /*#__PURE__*/ (0, $l7i9T$jsx)((0, $226872678f9f0005$export$2e2bcd8739ae039), {})
}));


//# sourceMappingURL=index.js.map
