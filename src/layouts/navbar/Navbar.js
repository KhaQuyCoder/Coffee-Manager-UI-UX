import React, { useRef } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const id = sessionStorage.getItem("_id");
  const navbar = useRef(null);
  const childMenu = useRef(null);
  const RefL = useRef(null);
  const refNS = useRef(null);
  const refTK = useRef(null);
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
      name: "Trang chủ",
      ref: "/",
      isAdmin: true,
      icon: <i class="fa-solid fa-house-user"></i>,
    },
    {
      name: "Bàn",
      ref: "/table",
      isAdmin: true,
      icon: <i class="fa-solid fa-table"></i>,
    },
    {
      name: "Lương",
      ref: "/mannagerClient",
      isAdmin: true,
      icon: <i class="fa-solid fa-sack-dollar"></i>,
      refHu: RefL,
      childMenu: [
        {
          nameChild: "Chấm công",
          ref: "mannagerTimekeeping",
          quyen: !!dataStaff?.grantPermisstion?.includes("CC"),
        },
        {
          nameChild: "Bảng lương",
          ref: "mannagerSalary",
          quyen: !!dataStaff?.grantPermisstion?.includes("L"),
        },
      ],
    },
    {
      name: "Thống kê",
      ref: "/mannagerStaff",
      isAdmin: true,
      icon: <i class="fa-solid fa-chart-simple"></i>,
      refHu: refTK,
      childMenu: [
        {
          nameChild: "Bán hàng",
          ref: "/mannagerRevenue",
          quyen: !!dataStaff?.grantPermisstion?.includes("DT"),
        },
        {
          nameChild: "Hàng hóa",
          ref: "/revenue/doanh-thu-ngay",
          quyen: !!dataStaff?.grantPermisstion?.includes("DT"),
        },
        {
          nameChild: "Thu chi",
          ref: "/revenue/doanh-thu-thang",
          quyen: !!dataStaff?.grantPermisstion?.includes("DT"),
        },
        {
          nameChild: "Khách hàng",
          ref: "/revenue/doanh-thu-nam",
          quyen: !!dataStaff?.grantPermisstion?.includes("DT"),
        },
      ],
    },
    {
      name: "Tài khoản",
      ref: "/mannagerTimekeeping",
      isAdmin: true,
      grantPermisstion: !!dataStaff?.grantPermisstion?.includes("CC"),
      icon: <i class="fa-solid fa-gear"></i>,
    },
    {
      name: "Bán hàng",
      ref: "/mannagerSalary",
      isAdmin: true,
      icon: <i class="fa-solid fa-dumpster-fire"></i>,
      refHu: childMenu,
      childMenu: [
        {
          nameChild: "Sản phẩm",
          ref: "mannagerProduct",
          quyen: !!dataStaff?.grantPermisstion?.includes("VL&SP"),
        },
        {
          nameChild: "Nguyên vật liệu",
          ref: "mannagerMaterial",
          quyen: !!dataStaff?.grantPermisstion?.includes("VL&SP"),
        },
      ],
    },
    {
      name: "Danh mục",
      isAdmin: true,
      icon: <i class="fa-solid fa-gear"></i>,
      refHu: refNS,
      childMenu: [
        {
          nameChild: "Khách hàng",
          ref: "mannagerClient",
          quyen: !!dataStaff?.grantPermisstion?.includes("KH"),
        },
        {
          nameChild: "Nhân viên",
          ref: "mannagerStaff",
          quyen: !!dataStaff?.grantPermisstion?.includes("NV"),
        },
      ],
    },
    {
      name: "Khuyến mãi",
      ref: "/promotion",
      isAdmin: true,
      icon: <i class="fa-solid fa-percent"></i>,
    },
    {
      name: "Lịch sử thanh toán",
      ref: "/historyBill",
      isAdmin: true,
      icon: <i class="fa-solid fa-clock-rotate-left"></i>,
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
  const handelChoi = (r, name, ref) => {
    if (name === "Bàn") {
      navbar.current.style.transform = "translateX(-100%)";
      setShowExits(false);
      navigate(ref);
    }
    if (name === "Trang chủ") {
      navbar.current.style.transform = "translateX(-100%)";
      setShowExits(false);
      navigate(ref);
    }
    if (name === "Lịch sử thanh toán") {
      navbar.current.style.transform = "translateX(-100%)";
      setShowExits(false);
      navigate(ref);
    }
    if (name === "Khuyến mãi") {
      navbar.current.style.transform = "translateX(-100%)";
      setShowExits(false);
      navigate(ref);
    }
    if (r === refNS) {
      r.current.style.display = "block";
      refTK.current.style.display = "none";
      RefL.current.style.display = "none";
      childMenu.current.style.display = "none";
    } else if (r === refTK) {
      r.current.style.display = "block";
      refNS.current.style.display = "none";
      RefL.current.style.display = "none";
      childMenu.current.style.display = "none";
    } else if (r === RefL) {
      r.current.style.display = "block";
      refNS.current.style.display = "none";
      refTK.current.style.display = "none";
      childMenu.current.display = "none";
    } else if (r === childMenu) {
      r.current.style.display = "block";
      refNS.current.style.display = "none";
      refTK.current.style.display = "none";
      RefL.current.style.display = "none";
    }
  };
  const handelChildMenu = (router) => {
    navbar.current.style.transform = "translateX(-100%)";
    setShowExits(false);
    navigate(router);
  };
  const handelChangerPass = () => {
    navbar.current.style.transform = "translateX(-100%)";
    setShowExits(false);
    navigate("/changerPass");
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
          dataStaff?.Permissions === "Quản lý" || item.isAdmin ? (
            <p
              onClick={() => handelChoi(item.refHu, item.name, item.ref)}
              key={index}
              className="item-navbar"
            >
              <span>{item.icon}</span>
              <span style={{ marginLeft: "20px" }}>{item.name}</span>
              <div
                className="childMenu"
                style={{ marginLeft: "40px" }}
                ref={item.refHu}
              >
                {item.childMenu?.map((child) => (
                  <>
                    {child.quyen || dataStaff?.Permissions === "Quản lý" ? (
                      <div
                        to={child.ref}
                        onClick={() => handelChildMenu(child.ref)}
                        className="childItem"
                      >
                        {child.nameChild}
                      </div>
                    ) : null}
                  </>
                ))}
              </div>
            </p>
          ) : null
        )}
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            borderTop: "1px solid black",
            width: "100%",
            paddingTop: "20px",
          }}
        >
          <span className="changeIcon">
            <i class="fa-solid fa-wrench"></i>
          </span>
          <span className="changePass" onClick={handelChangerPass}>
            Đổi mật khẩu
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
