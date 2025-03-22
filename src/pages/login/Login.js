import React, { useRef, useState } from "react";
import "./Login.css";
import axios from "axios";
import bgr from "../../assets/bgr_login.png";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/loggo.jpg";

const Login = () => {
  const navigate = useNavigate();
  const notifyMessage = useRef(null);
  const [user, setUser] = useState({
    UserName: "",
    Password: "",
  });
  const [message, setMessage] = useState("");
  const handerChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handelerSubmit = async (e) => {
    e.preventDefault();
    if (!user.UserName || !user.Password) {
      setMessage("Vui lòng nhập thông tin đầy đủ.");
      notifyMessage.current.style.transform = "translateX(0)";
      setTimeout(() => {
        notifyMessage.current.style.transform = "translateX(100%)";
      }, 2000);
      return;
    }
    try {
      const res = await axios.post(
        "https://coffee-manager-api.onrender.com/user/login",
        user
      );

      if (res.data.token) {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("_id", res.data.user.Staff);
        sessionStorage.setItem("Permissions", res.data.user.Role);
        navigate("/");
      }
    } catch (error) {
      notifyMessage.current.style.transform = "translateX(0)";
      setMessage("Tên đăng nhập hoặc mật khẩu không đúng");
      setTimeout(() => {
        notifyMessage.current.style.transform = "translateX(100%)";
      }, 2000);
    }
  };
  return (
    <div className="container-login">
      <div className="wrapper-login">
        <div>
          <img src={bgr} className="y" alt="bgr-login" />
        </div>
        <form className="form-login" onSubmit={handelerSubmit}>
          <p className="title-login">
            <span>
              <img src={logo} className="logo-header" alt="logo-login" />
            </span>{" "}
          </p>
          <input
            type="text"
            name="UserName"
            value={user.UserName}
            onChange={handerChange}
            className="username-login"
            placeholder="Nhập tên đăng nhập"
          />
          <input
            type="password"
            name="Password"
            value={user.Password}
            onChange={handerChange}
            className="password-login"
            placeholder="Nhập mật khẩu"
          />
          <button className="btn-login" type="submit">
            Đăng nhập
          </button>
        </form>
      </div>
      <span className="message-login" ref={notifyMessage}>
        <i class="fa-solid fa-triangle-exclamation"></i> {message}
      </span>
    </div>
  );
};

export default Login;
