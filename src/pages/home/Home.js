import React from "react";
import "./Home.css";
import bcg from "../../assets/bdg2.webp";
import staff from "../../assets/staff.jpg";
import staff2 from "../../assets/staff2.jpg";
import staff3 from "../../assets/staff3.jpg";
import a1 from "../../assets/a1.jpg";
import a2 from "../../assets/a2.jpg";
import a3 from "../../assets/a3.jpg";
import a4 from "../../assets/a4.jpg";
import menu from "../../assets/menu.jpg";

const Home = () => {
  return (
    <>
      <div className="opa-home"></div>
      <div className="container-home">
        <img src={bcg} alt="bcg" className="img-home" />
        <div className="wrapper-home">
          <h1 className="title-home">
            Wellcom to coffee shope management software
          </h1>
          <h2 className="hi-home">Hi, Ngọc coffee</h2>

          <div className="staff-home">
            <img src={staff} alt="staff1" className="img-staff1-home" />
            <img src={staff2} alt="staff2" className="img-staff2-home" />
            <img src={staff3} alt="staff3" className="img-staff3-home" />
          </div>
          <div className="infor-home">
            <img src={a1} alt="a1" className="img-a1-home" />
            <img src={a2} alt="a2" className="img-a2-home" />
            <img src={a3} alt="a3" className="img-a3-home" />
            <img src={a4} alt="a4" className="img-a4-home" />
          </div>

          <div className="menu-home">
            <img src={menu} alt="a1" className="img-menu-home" />
          </div>

          <div className="contact-home">
            <a href="https://www.facebook.com/NgocCoffeeHue">Facebook</a>
            <button>Hotline:091-4184-888</button>
            <button>21 Lê Hồng Phong - thành phố Huế</button>
          </div>
        </div>
        <div className="copyright">
          <i class="fa-solid fa-copyright"></i> Hồ Khả Quý - Đại học Khoa Học
          Huế - Khoa công nghệ thông tin - Công nghệ phần mềm
        </div>
      </div>
    </>
  );
};

export default Home;
