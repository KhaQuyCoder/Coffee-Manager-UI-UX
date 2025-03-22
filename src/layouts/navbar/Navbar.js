import React, { useRef } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const id = sessionStorage.getItem("_id");
  const navbar = useRef(null);
  const navigate = useNavigate();
  const [showExits, setShowExits] = useState(false);
  const [dataStaff, setDataStaff] = useState();
  useEffect(() => {
    axios
      .get(`https://coffee-manager-api.onrender.com/new/staff/${id}`)
      .then((res) => setDataStaff(res.data))
      .catch(() => "loi get du lieu");
  }, [id]);
  const listNavbar = [
    {
      name: "Quản lý bàn",
      ref: "/",
      isAdmin: false,
      grantPermisstion: true,
    },
    {
      name: "Quản lý khách hàng",
      ref: "/mannagerClient",
      isAdmin: true,
      grantPermisstion: !!dataStaff?.grantPermisstion?.includes("KH"),
    },
    {
      name: "Quản lý nhân viên",
      ref: "/mannagerStaff",
      isAdmin: true,
      grantPermisstion: !!dataStaff?.grantPermisstion?.includes("NV"),
    },
    {
      name: "Quản lý chấm công",
      ref: "/mannagerTimekeeping",
      isAdmin: true,
      grantPermisstion: !!dataStaff?.grantPermisstion?.includes("CC"),
    },
    {
      name: "Quản lý lương nhân viên",
      ref: "/mannagerSalary",
      isAdmin: true,
      grantPermisstion: !!dataStaff?.grantPermisstion?.includes("L"),
    },
    {
      name: "Thống kê doanh thu",
      ref: "/mannagerRevenue",
      isAdmin: true,
      grantPermisstion: !!dataStaff?.grantPermisstion?.includes("DT"),
    },
    {
      name: "Quản lý sản phẩm",
      ref: "/mannagerProduct",
      isAdmin: true,
      grantPermisstion: !!dataStaff?.grantPermisstion?.includes("VL&SP"),
    },
    {
      name: "Quản lý nguyên vật liệu",
      ref: "/mannagerMaterial",
      isAdmin: true,
      grantPermisstion: !!dataStaff?.grantPermisstion?.includes("VL&SP"),
    },
  ];

  const handelCick = () => {
    setShowExits(true);
    navbar.current.style.transform = "translateX(0)";
  };
  const handelExits = () => {
    setShowExits(false);
    navbar.current.style.transform = "translateX(-100%)";
  };
  const handelChoi = (r) => {
    navbar.current.style.transform = "translateX(-100%)";
    setShowExits(false);
    navigate(r);
  };

  return (
    <div className="container-navbar" ref={navbar}>
      {!showExits && (
        <div className="window-navbar" onClick={handelCick}>
          <i class="fa-solid fa-list-check"></i>
        </div>
      )}
      <div className="close-navbar" onClick={handelExits}>
        <i class="fa-solid fa-arrow-left"></i>
      </div>
      <div>
        {listNavbar.map((item, index) =>
          dataStaff?.Permissions === "Quản lý" || item.grantPermisstion ? (
            <p
              onClick={() => handelChoi(item.ref)}
              key={index}
              className="item-navbar"
            >
              {item.name}
            </p>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Navbar;
