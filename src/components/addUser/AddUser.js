import React, { useRef, useState } from "react";
import axios from "axios";
import "./AddUser.css";

const AddUser = ({ setOpa, cpn_addUser, setTKUser }) => {
  const id = sessionStorage.getItem("_id");
  const role = sessionStorage.getItem("role");

  const formAddUser = useRef(null);
  const [check, setCheck] = useState(false);
  const [message, setMessage] = useState();
  const [newUser, setNewUser] = useState({
    UserName: "",
    Password: "",
    Role: role,
    Staff: id,
  });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handelAddUser = () => {
    if (!newUser.UserName || !newUser.Password) {
      setCheck(true);
      setMessage("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    axios
      .post("https://coffee-manager-api.onrender.com/user", {
        UserName: newUser.UserName,
        Password: newUser.Password,
        Role: sessionStorage.getItem("role"),
        Staff: sessionStorage.getItem("_idProps"),
      })
      .then((res) => {
        setTKUser((pre) => [...pre, res.data]);
        setMessage("");
        setOpa(false);
        cpn_addUser.current.style.transform = "translateY(-300%)";
      })
      .catch(() => {
        setCheck(true);
        setMessage("Vui lòng nhập đầy đủ thông tin");
      });
  };

  return (
    <div className="form-add-user" ref={formAddUser}>
      <h3>Tạo 1 tài khoản đăng nhập</h3>

      <input
        className="inputValueClient-client"
        type="text"
        name="UserName"
        placeholder="Nhập tên đăng nhập..."
        value={newUser.UserName}
        onChange={handleChange}
      />
      <input
        className="inputValueClient-client"
        type="password"
        name="Password"
        placeholder="Nhập mật khẩu..."
        value={newUser.Password}
        onChange={handleChange}
      />
      <button className="btn-addClient" onClick={handelAddUser}>
        Tạo tài khoản
      </button>

      <p style={{ color: "red" }}>
        {check && (
          <span>
            <i class="fa-solid fa-triangle-exclamation"></i>
            {message}
          </span>
        )}
      </p>
    </div>
  );
};

export default AddUser;
