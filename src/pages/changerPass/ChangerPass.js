import React, { useEffect, useState } from "react";
import bcrypt from "bcryptjs";
import axios from "axios";
import bgr from "../../assets/bgr_login.png";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/loggo.jpg";
import "./ChangerPass.css";

const ChangerPass = () => {
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [inputCaptcha, setInputCaptcha] = useState("");
  const id = sessionStorage.getItem("id_user");
  const [dataChangerPass, setDataChangerPass] = useState({
    id: id,
    passOld: "",
    passNew: "",
  });
  function generateCaptcha() {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
  }
  const onChanger = (e) => {
    setDataChangerPass((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputCaptcha !== captcha) {
      alert("Mã Captcha không chính xác!");
      setCaptcha(generateCaptcha());
      return;
    }

    if (dataChangerPass.passNew !== dataChangerPass.conformPass) {
      alert("Xác nhận mật khẩu không khớp");
      return;
    }
    try {
      console.log(id, dataChangerPass.passOld, dataChangerPass.passNew);

      const res = await axios.post(
        `https://coffee-manager-api.onrender.com/user/changerPass`,
        dataChangerPass
      );

      if (res.status === 200) {
        alert("Mật khẩu đã được đổi thành công!");
        setDataChangerPass({ passOld: "", passNew: "", conformPass: "" });
        setCaptcha(generateCaptcha());
      }
    } catch (error) {
      alert("Mật khẩu cũ không chính xác!");
    }
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
          <input
            type="password"
            name="passOld"
            className="password-login changerPass"
            onChange={onChanger}
            value={dataChangerPass.passOld}
            placeholder="Nhập mật khẩu cũ"
          />
          <input
            type="password"
            name="passNew"
            className="password-login changerPass"
            onChange={onChanger}
            value={dataChangerPass.passNew}
            placeholder="Nhập mật mới"
          />
          <input
            type="password"
            name="conformPass"
            className="password-login changerPass"
            onChange={onChanger}
            value={dataChangerPass.conformPass}
            placeholder="Xác nhận mật khẩu mới"
          />
          <div className="captcha-container">
            <span className="captcha">{captcha}</span>
            <button
              type="button"
              className="refresh-captcha"
              onClick={() => setCaptcha(generateCaptcha())}
            >
              🔄
            </button>
          </div>
          <input
            type="text"
            className="captcha-input"
            placeholder="Nhập mã Captcha"
            value={inputCaptcha}
            onChange={(e) => setInputCaptcha(e.target.value.toUpperCase())}
          />

          <button className="btn-login" type="submit">
            Đổi mật khẩu
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

export default ChangerPass;
