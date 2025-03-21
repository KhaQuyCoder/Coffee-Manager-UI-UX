import React, { useEffect, useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/loggo.jpg";
import axios from "axios";
const Header = () => {
  const id = sessionStorage.getItem("_id");
  const [dataStaff, setDataStaff] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:4000/new/staff/${id}`)
      .then((res) => setDataStaff(res.data))
      .catch(() => "loi get du lieu");
  }, [id]);
  const handelLongOut = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("_id");
    sessionStorage.removeItem("Permissions");
    navigate("/login");
  };
  const getName = (name) => {
    if (!name || name.length === 0) return "";

    for (let i = name.length - 1; i >= 0; i--) {
      if (name[i] === " ") return name[i + 1];
    }
  };
  return (
    <div className="container-header">
      <div className="wrapper-header">
        <img src={logo} className="logo-header" alt="logo" />
        <div className="infor-user-header">
          <p className="avt-header">{getName(dataStaff.Name)}</p>
          <div>
            <p className="name-user-header">{dataStaff.Name}</p>
            <p>{dataStaff.Permissions}</p>
          </div>
          <div>
            <p to="/login" className="logout-header" onClick={handelLongOut}>
              <i class="fa-solid fa-right-from-bracket"></i> Đăng xuất
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
