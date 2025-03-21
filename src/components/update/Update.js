import React, { useEffect, useState } from "react";
import "./Update.css";
import axios from "axios";
const Update = ({ c, formatDate, setOpa, updataClient, setDataClient }) => {
  const [dataUpdate, setDataUpdate] = useState({
    Name: "",
    Age: "",
    Address: "",
    Phone: "",
    Birth: "",
    Gender: "1",
  });
  useEffect(() => {
    if (c) {
      setDataUpdate({
        Name: c.Name,
        Age: c.Age,
        Address: c.Address,
        Phone: c.Phone,
        Birth: formatDate(c.Birth),
        Gender: c.Gender ? "1" : "0",
      });
    }
  }, [c, formatDate]);
  const handelChange = (e) => {
    setDataUpdate((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:4000/client/update/${c._id}`, {
        data: dataUpdate,
      })
      .then((res) => {
        setDataClient((pre) =>
          pre.map((item) =>
            item._id === res.data._id ? { ...res.data } : item
          )
        );
        setOpa(false);
        updataClient.current.style.transform = "translateY(-300%)";
      });
  };
  return (
    <div>
      <form className="form-update" onSubmit={handelSubmit}>
        <label>
          <span>Tên khách hàng</span>
          <input
            type="text"
            name="Name"
            onChange={handelChange}
            value={dataUpdate.Name ?? c.Name}
          />
        </label>
        <label>
          <span>Tuổi</span>
          <input
            type="number"
            name="Age"
            onChange={handelChange}
            value={dataUpdate.Age ?? c.Age}
          />
        </label>
        <label className="div3-update">
          <span>Địa chỉ</span>
          <input
            type="text"
            name="Address"
            onChange={handelChange}
            value={dataUpdate.Address ?? c.Address}
          />
        </label>
        <label className="div4-update">
          <span>Số điện thoại</span>
          <input
            type="text"
            name="Phone"
            onChange={handelChange}
            value={dataUpdate.Phone ?? c.Phone}
          />
        </label>
        <label className="div5-update">
          <span>Năm sinh</span>
          <input
            type="date"
            name="Birth"
            onChange={handelChange}
            value={dataUpdate.Birth || formatDate(c.Birth)}
          />
        </label>
        <label className="div6-update">
          <span>Giới tính</span>
          <select
            onChange={handelChange}
            name="Gender"
            value={dataUpdate.Gender}
          >
            <option value="1">Nam</option>
            <option value="0">Nữ</option>
          </select>
        </label>
        <button className="div7-update" type="submit">
          Xác nhận thay đổi
        </button>
      </form>
    </div>
  );
};

export default Update;
