import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import bgr from "../../assets/bgr_login.png";
import logo from "../../assets/logoStore.png";
import "./Promotion.css";
const Promotion = () => {
  const formatDate = (date) => date?.split("T")[0];
  const [dataStaff, setDataStaff] = useState([]);
  const [recoment, setRecoment] = useState(false);
  const [valuePhone, setValuePhone] = useState("");
  const [promoMessage, setDecription] = useState("");

  const phoneStaff = useRef(null);
  useEffect(() => {
    axios
      .get("https://coffee-manager-api.onrender.com/all/staff")
      .then((res) => setDataStaff(res.data))
      .catch(() => console.log("Lỗi tải dữ liệu"));
  }, []);
  const handelFocus = () => {
    setRecoment(true);
  };
  const handelBlue = () => {
    setRecoment(false);
  };
  const handelClick = (phone) => {
    setValuePhone(phone);
    setRecoment(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://coffee-manager-api.onrender.com/send-sms", {
        to: valuePhone,
        message: promoMessage,
      })
      .then(() => alert("Đã gửi thành công!"))
      .catch(() => alert("Gửi thất bại!"));
  };

  return (
    <div className="container-login">
      <div className="wrapper-login">
        <form className="form-changerPass" onSubmit={handleSubmit}>
          <p className="title-login">
            <span>
              <img src={logo} className="logo-header" alt="logo-login" />
            </span>
          </p>
          <div className="form-phone-staff">
            <input
              onFocus={handelFocus}
              value={valuePhone}
              ref={phoneStaff}
              onChange={(e) => setValuePhone(e.target.value)}
              className="password-login changerPass"
              placeholder="Nhập số điện thoại khách hàng"
            />
            {recoment && (
              <p className="recoment-staff">
                {dataStaff.map((s, index) => (
                  <div
                    className="infor-staff-promotion"
                    key={index}
                    onClick={() => handelClick(s.Phone)}
                  >
                    <p className="name-promotion">{s.Name}</p>
                    <p>{s.Phone}</p>
                    <p>{formatDate(s.Birth)}</p>
                  </div>
                ))}
              </p>
            )}
          </div>

          <input
            className="password-login changerPass promotion"
            placeholder="Nhập nội dung khuyến mãi"
            onChange={(e) => setDecription(e.target.value)}
          />

          <button className="btn-login" type="submit">
            Gửi khuyến mãi
          </button>
        </form>

        <div>
          <img src={bgr} className="y" alt="bgr-login" />
        </div>
      </div>
      <span className="message-login">
        <i className="fa-solid fa-triangle-exclamation"></i>
      </span>
    </div>
  );
};

export default Promotion;
