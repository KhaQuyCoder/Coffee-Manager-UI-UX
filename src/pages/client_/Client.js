import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Client.css";
import Update from "../../components/update/Update";
const Client = () => {
  const [dataClient, setDataClient] = useState([]);
  const [opa, setOpa] = useState(false);
  const [idDelClient, setIdDelClient] = useState("");
  const updataClient = useRef(null);
  const [c, setClient] = useState({});
  const formAddClient = useRef(null);
  const sdt = useRef(null);
  const dc = useRef(null);
  const age = useRef(null);
  const name = useRef(null);
  const Name = useRef();
  const Age = useRef(null);
  const Address = useRef(null);
  const Phone = useRef(null);
  const Birth = useRef(null);
  const notifiDel = useRef(null);

  const [newClient, setNewClient] = useState({
    Name: "",
    Age: "",
    Address: "",
    Phone: "",
    Birth: "",
    Gender: "1",
  });

  useEffect(() => {
    axios
      .get("https://coffee-manager-api.onrender.com/client")
      .then((res) => setDataClient(res.data))
      .catch(() => console.log("Lỗi tải dữ liệu"));
  }, []);

  const formatDate = (date) => date?.split("T")[0];

  const clickAnimationTitle = (r) => {
    if (r.current) {
      r.current.style.top = "16%";
      r.current.style.fontSize = "14px";
    }
  };

  const handelBluer = (r, r2) => {
    if (r.current.value === "") {
      r2.current.style.top = "37%";
      r2.current.style.fontSize = "17px";
    }
  };
  const handleChange = (e) => {
    setNewClient({ ...newClient, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://coffee-manager-api.onrender.com/client", newClient)
      .then((res) => {
        setDataClient([...dataClient, res.data]);
        newClient.Name = "";
        newClient.Address = "";
        newClient.Phone = "";
        newClient.Age = "";
        newClient.Birth = "";
      })
      .catch((error) => console.log("Lỗi thêm khách hàng", error));
  };
  const handleAnimation = (r, r2) => {
    r.current.style.top = "16%";
    r.current.style.fontSize = "14px";
    if (r2.current) {
      r2.current.focus();
    }
  };

  const handelDel = (id) => {
    setIdDelClient(id);
    setOpa(true);
    notifiDel.current.style.transform = "translateY(0%)";
    notifiDel.current.style.opacity = "1";
  };
  const handelExits = () => {
    setOpa(false);
  };
  const handelUpdate = (cl) => {
    setClient(cl);
    updataClient.current.style.transform = "translateY(0%)";
    updataClient.current.style.opacity = "1";
    setOpa(true);
  };
  const handelDelClient = () => {
    axios
      .delete(`https://coffee-manager-api.onrender.com/client/${idDelClient}`)
      .then((res) =>
        setDataClient((pre) =>
          pre.filter((client) => client._id !== res.data._id)
        )
      )
      .catch(() => "lỗi xóa");
    notifiDel.current.style.transform = "translateY(-300%)";
    setOpa(false);
  };
  const handelOpa = () => {
    setOpa(false);
    notifiDel.current.style.transform = "translateY(-300%)";
    notifiDel.current.style.opacity = "0";
    if (updataClient.current) {
      updataClient.current.style.transform = "translateY(-300%)";
      updataClient.current.style.opacity = "0";
    }
  };
  const handleKeyDown = (event, r) => {
    if (event.key === "Tab") {
      r.current.style.top = "16%";
      r.current.style.fontSize = "14px";
    }
  };
  return (
    <>
      {opa && <div className="opa" onClick={handelOpa}></div>}
      <div className="notification-del-client" ref={notifiDel}>
        <p>Xác nhận xóa khách hàng này?</p>
        <div>
          <button className="btn-del-client" onClick={handelDelClient}>
            Xóa
          </button>
          <button className="btn-del-exits" onClick={handelExits}>
            Hủy bỏ
          </button>
        </div>
      </div>
      <div className="main">
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
                  "Thao tác",
                ].map((th, index) => (
                  <th key={index}>{th}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataClient.map((client, index) => (
                <tr key={client._id}>
                  <td>{index + 1}</td>
                  <td>{client.Name}</td>
                  <td>{client.Age}</td>
                  <td>{client.Address}</td>
                  <td>{client.Phone}</td>
                  <td>{formatDate(client.Birth)}</td>
                  <td>{client.Gender ? "Nam" : "Nữ"}</td>
                  <td>
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => handelDel(client._id)}
                    ></i>
                    <i
                      class="fa-solid fa-pen-to-square"
                      onClick={() => handelUpdate(client)}
                    ></i>
                    <div className="update-client" ref={updataClient}>
                      <Update
                        c={c}
                        formatDate={formatDate}
                        setOpa={setOpa}
                        updataClient={updataClient}
                        setDataClient={setDataClient}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="form-add-client" ref={formAddClient}>
          <div className="addClient-client">
            <i className="fa-solid fa-user-plus"></i> Thêm 1 khách hàng
          </div>
          <form className="main-form-client" onSubmit={handleSubmit}>
            <div className="form1">
              <input
                className="inputValueClient-client"
                type="text"
                name="Name"
                value={newClient.Name}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, age)}
                onClick={() => clickAnimationTitle(name)}
                onBlur={() => handelBluer(Name, name)}
                ref={Name}
              />
              <span
                className="value-client"
                ref={name}
                onClick={() => handleAnimation(name, Name)}
              >
                Tên khách hàng
              </span>
            </div>

            <div className="form2">
              <input
                className="inputValueClient-client"
                type="text"
                name="Age"
                onKeyDown={(e) => handleKeyDown(e, dc)}
                value={newClient.Age}
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
                value={newClient.Address}
                onKeyDown={(e) => handleKeyDown(e, sdt)}
                onChange={handleChange}
                onClick={() => clickAnimationTitle(dc)}
                onBlur={() => handelBluer(Address, dc)}
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
                value={newClient.Phone}
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

            <div className="form5">
              <input
                className="inputValueClient-client"
                type="date"
                name="Birth"
                value={newClient.Birth}
                onChange={handleChange}
                ref={Birth}
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
                    checked={newClient.Gender === "1"}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <span className="text-gender-client">Nữ</span>
                  <input
                    type="radio"
                    name="Gender"
                    value="0"
                    checked={newClient.Gender === "0"}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <span className="value-client">Giới tính</span>
            </div>

            <button className="btn-addClient">Thêm khách hàng</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Client;
