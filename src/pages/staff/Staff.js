import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import AddUser from "../../components/addUser/AddUser";
import GrantPermisstion from "../../components/grantPermisstion/GrantPermisstion";
import UpdateStaff from "../../components/update/UpdateStaff";
const Staff = () => {
  const [dataStaff, setDataStaff] = useState([]);
  const [TKuser, setTKUser] = useState([]);
  const [idUser, setIdUser] = useState();
  const [permisstion, setPermisstion] = useState([]);
  const [s, setStaff] = useState({});
  const [username, setUserName] = useState();

  const updataStaff = useRef(null);
  const [opa, setOpa] = useState(false);
  const [idDelStaff, setIdDelStaff] = useState("");
  const grantPermisstion = useRef(null);
  const formAddClient = useRef(null);
  const sdt = useRef(null);
  const dc = useRef(null);
  const age = useRef(null);
  const name = useRef(null);
  const Name = useRef(null);
  const Age = useRef(null);
  const Address = useRef(null);
  const Phone = useRef(null);
  const notifiDel = useRef(null);
  const cpn_addUser = useRef(null);

  const [newStaff, setNewStaff] = useState({
    Name: "",
    Age: "",
    Address: "",
    Phone: "",
    Birth: "",
    Gender: "1",
    DateWork: "",
    Permissions: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:4000/all/staff")
      .then((res) => setDataStaff(res.data))
      .catch(() => console.log("Lỗi tải dữ liệu"));
    axios
      .get("http://localhost:4000/user")
      .then((res) => {
        setDataStaff((prev) =>
          prev.map((staff) => {
            const matchedUser = res.data.find(
              (item) => item.Staff._id === staff._id
            );

            return matchedUser
              ? {
                  ...staff,
                  UserName: matchedUser.UserName,
                  idUser: matchedUser._id,
                }
              : staff;
          })
        );
      })
      .catch(() => console.log("Lỗi tải dữ liệu"));
  }, [TKuser]);

  const formatDate = (date) => date?.split("T")[0];

  const clickAnimationTitle = (r) => {
    if (r.current) {
      r.current.style.top = "16%";
      r.current.style.fontSize = "14px";
    }
  };
  const handleCloseForm = () => {
    grantPermisstion.current.style.transform = "translateX(100%)";
    updataStaff.current.style.transform = "translateX(100%)";
    formAddClient.current.style.transform = "translateY(-150%)";
    setOpa(false);
    notifiDel.current.style.opacity = "0";
    notifiDel.current.style.transform = "translateY(-300%)";
    cpn_addUser.current.style.transform = "translateY(-200%)";
    cpn_addUser.current.style.opacity = "0";
  };
  const handelBluer = (r, r2) => {
    if (r.current.value === "") {
      r2.current.style.top = "37%";
      r2.current.style.fontSize = "17px";
    }
  };
  const handleChange = (e) => {
    setNewStaff({ ...newStaff, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/new/staff", newStaff)
      .then((res) => {
        setDataStaff([...dataStaff, res.data]);
        handleCloseForm();
      })
      .catch(() => console.log("Lỗi thêm nhân viên"));
  };
  const handleAnimation = (r, r2) => {
    r.current.style.top = "16%";
    r.current.style.fontSize = "14px";
    if (r2.current) {
      r2.current.focus();
    }
  };

  const handelDel = (id) => {
    setIdDelStaff(id);
    setOpa(true);
    notifiDel.current.style.transform = "translateY(0%)";
    notifiDel.current.style.opacity = "1";
  };
  const handelExits = () => {
    setOpa(false);
    notifiDel.current.style.transform = "translateY(-300%)";
  };
  const handelDelClient = () => {
    axios
      .delete(`http://localhost:4000/new/staff/${idDelStaff}`)
      .then((res) =>
        setDataStaff((pre) => pre.filter((staff) => staff._id !== res.data._id))
      )
      .catch(() => "lỗi xóa");
    axios
      .delete(`http://localhost:4000/user/${idDelStaff}`)
      .then(() => 0)
      .catch(() => "lỗi xóa");
    notifiDel.current.style.transform = "translateY(-300%)";
    setOpa(false);
  };
  const handelAddUser = (staff) => {
    sessionStorage.setItem("_idProps", staff._id);
    sessionStorage.setItem("role", staff.Permissions);
    setOpa(true);
    cpn_addUser.current.style.transform = "translateY(0%)";
    cpn_addUser.current.style.opacity = "1";
  };
  const handelAddStaff = () => {
    setOpa(true);
    formAddClient.current.style.transform = "translateY(0%)";
    formAddClient.current.style.opacity = "1";
  };
  const handelGrantPermisstion = (staff) => {
    setOpa(true);
    setIdUser(staff._id);
    setPermisstion(staff.grantPermisstion);
    grantPermisstion.current.style.transform = "translateY(0%)";
    grantPermisstion.current.style.opacity = "1";
  };
  const handelUpdate = (st) => {
    setUserName(st.UserName);
    setStaff(st);
    updataStaff.current.style.transform = "translateX(0%)";
    updataStaff.current.style.opacity = "1";
    setOpa(true);
  };
  const handleKeyDown = (event, r) => {
    if (event.key === "Tab") {
      r.current.style.top = "16%";
      r.current.style.fontSize = "14px";
    }
  };
  return (
    <>
      <div className="addClient-client" onClick={handelAddStaff}>
        <i className="fa-solid fa-user-plus"></i> Thêm 1 nhân viên
      </div>
      {opa && <div className="opa" onClick={handleCloseForm}></div>}
      <div className="notification-del-client" ref={notifiDel}>
        <p>Xác nhận xóa nhân viên này?</p>
        <div>
          <button className="btn-del-client" onClick={handelDelClient}>
            Xóa
          </button>
          <button className="btn-del-exits" onClick={handelExits}>
            Hủy bỏ
          </button>
        </div>
      </div>
      <div className="container-client">
        <table className="listClient-client">
          <thead>
            <tr>
              {[
                "STT",
                "Họ và tên",
                "Tuổi",
                "Địa chỉ",
                "Số ĐT",
                "Năm sinh",
                "Giới tính",
                "Chức vụ",
                "Ngày vào làm",
                "Tên ĐN",
                "Thao tác",
              ].map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataStaff.map((staff, index) => (
              <tr key={staff._id}>
                <td>{index + 1}</td>
                <td>{staff.Name}</td>
                <td>{staff.Age}</td>
                <td>{staff.Address}</td>
                <td>{staff.Phone}</td>
                <td>{formatDate(staff.Birth)}</td>
                <td>{staff.Gender ? "Nam" : "Nữ"}</td>
                <td>{staff.Permissions}</td>
                <td>{formatDate(staff.DateWork)}</td>
                <td>{staff?.UserName ? staff?.UserName : "-----"}</td>
                <td>
                  <i
                    className="fa-solid fa-trash"
                    onClick={() => handelDel(staff._id)}
                  ></i>
                  {!staff.UserName && (
                    <i
                      class="fa-solid fa-user"
                      onClick={() => handelAddUser(staff)}
                    ></i>
                  )}
                  {staff.Permissions === "Nhân viên" && (
                    <i
                      class="fa-solid fa-key"
                      onClick={() => handelGrantPermisstion(staff)}
                    ></i>
                  )}
                  <div className="grantPermisstion" ref={grantPermisstion}>
                    <GrantPermisstion
                      idUser={idUser}
                      permisstion={permisstion}
                    />
                  </div>
                  <i
                    class="fa-solid fa-pen-to-square"
                    onClick={() => handelUpdate(staff)}
                  ></i>
                  <div className="update-staff" ref={updataStaff}>
                    <UpdateStaff
                      s={s}
                      formatDate={formatDate}
                      setOpa={setOpa}
                      updataStaff={updataStaff}
                      setDataStaff={setDataStaff}
                      username={username}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="addUser-staff" ref={cpn_addUser}>
          <AddUser
            setOpa={setOpa}
            cpn_addUser={cpn_addUser}
            setTKUser={setTKUser}
          />
        </div>
      </div>
      <div className="form-add-staff" ref={formAddClient}>
        <form className="main-form-client" onSubmit={handleSubmit}>
          <div className="form1">
            <input
              className="inputValueClient-client"
              type="text"
              name="Name"
              value={newStaff.Name}
              onChange={handleChange}
              onClick={() => clickAnimationTitle(name)}
              onBlur={() => handelBluer(Name, name)}
              onKeyDown={(e) => handleKeyDown(e, age)}
              ref={Name}
            />
            <span
              className="value-client"
              ref={name}
              onClick={() => handleAnimation(name, Name)}
            >
              Tên nhân viên
            </span>
          </div>

          <div className="form2">
            <input
              className="inputValueClient-client"
              type="text"
              name="Age"
              value={newStaff.Age}
              onKeyDown={(e) => handleKeyDown(e, dc)}
              onChange={handleChange}
              onClick={() => clickAnimationTitle(age)}
              onBlur={() => handelBluer(Age, age)}
              ref={Age}
            />

            <span
              className="value-client"
              ref={age}
              onClick={() => handleAnimation(age, Age)}
            >
              Tuổi
            </span>
          </div>

          <div className="form3">
            <input
              className="inputValueClient-client"
              type="text"
              name="Address"
              value={newStaff.Address}
              onChange={handleChange}
              onClick={() => clickAnimationTitle(dc)}
              onBlur={() => handelBluer(Address, dc)}
              onKeyDown={(e) => handleKeyDown(e, sdt)}
              ref={Address}
            />
            <span
              className="value-client"
              ref={dc}
              onClick={() => handleAnimation(dc, Address)}
            >
              Địa chỉ
            </span>
          </div>

          <div className="form4">
            <input
              className="inputValueClient-client"
              type="text"
              name="Phone"
              value={newStaff.Phone}
              onChange={handleChange}
              onClick={() => clickAnimationTitle(sdt)}
              onBlur={() => handelBluer(Phone, sdt)}
              ref={Phone}
            />
            <span
              className="value-client"
              ref={sdt}
              onClick={() => handleAnimation(sdt, Phone)}
            >
              Số điện thoại
            </span>
          </div>
          <div class="custom-select">
            <select
              id="permis-select"
              onChange={(e) => (newStaff.Permissions = e.target.value)}
            >
              <option>--Chọn 1 chức vụ--</option>
              <option value="Nhân viên">Nhân viên</option>
              <option value="Quản lý">Quản lý</option>
            </select>
          </div>
          <div className="form5">
            <span className="dateWork-staff">Ngày sinh</span>

            <input
              className="inputValueClient-client"
              type="date"
              name="Birth"
              value={newStaff.Birth}
              onChange={handleChange}
            />
          </div>
          <div className="form5">
            <span className="dateWork-staff">Ngày vào làm</span>
            <input
              className="inputValueClient-client"
              type="date"
              name="DateWork"
              value={newStaff.DateWork}
              onChange={handleChange}
            />
          </div>

          <div className="form6">
            <div className="wrapper-radio-client">
              <label className="radio1-client">
                <span className="text-gender-client">Nam</span>
                <input
                  type="radio"
                  name="Gender"
                  value="1"
                  checked={newStaff.Gender === "1"}
                  onChange={handleChange}
                />
              </label>
              <label>
                <span className="text-gender-client">Nữ</span>
                <input
                  type="radio"
                  name="Gender"
                  value="0"
                  checked={newStaff.Gender === "0"}
                  onChange={handleChange}
                />
              </label>
            </div>
            <span className="value-client">Giới tính</span>
          </div>

          <button className="btn-addClient">Thêm nhân viên</button>
        </form>
      </div>
    </>
  );
};

export default Staff;
