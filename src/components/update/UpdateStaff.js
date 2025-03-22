import React, { useEffect, useState } from "react";
import "./Update.css";
import axios from "axios";

const UpdateStaff = ({
  s,
  formatDate,
  setOpa,
  updataStaff,
  setDataStaff,
  username,
}) => {
  const [dataUpdate, setDataUpdate] = useState({
    Name: "",
    Age: "",
    Address: "",
    Phone: "",
    Birth: "",
    Gender: "1",
    Permissions: "",
    DateWork: "",
  });

  useEffect(() => {
    if (s) {
      setDataUpdate({
        Name: s.Name || "",
        Age: s.Age || "",
        Address: s.Address || "",
        Phone: s.Phone || "",
        Birth: s.Birth ? formatDate(s.Birth) : "",
        Gender: s.Gender ? "1" : "0",
        Permissions: s.Permissions,
        DateWork: s.DateWork ? formatDate(s.DateWork) : "",
      });
    }
  }, [s, formatDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataUpdate((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `https://coffee-manager-api.onrender.com/staff/update/${s._id}`,
        {
          data: dataUpdate,
        }
      );

      setDataStaff((prev) =>
        prev.map((item) =>
          item._id === res.data._id ? { ...res.data, UserName: username } : item
        )
      );

      setOpa(false);
      updataStaff.current.style.transform = "translateX(100%)";
    } catch (error) {
      console.error("Có lỗi xảy ra khi cập nhật nhân viên:", error);
    }
  };

  return (
    <div>
      <form className="form-update-client" onSubmit={handleSubmit}>
        <label>
          <span>Tên nhân viên</span>
          <input
            type="text"
            name="Name"
            onChange={handleChange}
            value={dataUpdate.Name}
          />
        </label>
        <label>
          <span>Tuổi</span>
          <input
            type="number"
            name="Age"
            onChange={handleChange}
            value={dataUpdate.Age}
          />
        </label>
        <label>
          <span>Địa chỉ</span>
          <input
            type="text"
            name="Address"
            onChange={handleChange}
            value={dataUpdate.Address}
          />
        </label>
        <label>
          <span>Số điện thoại</span>
          <input
            type="text"
            name="Phone"
            onChange={handleChange}
            value={dataUpdate.Phone}
          />
        </label>
        <label>
          <span>Năm sinh</span>
          <input
            type="date"
            name="Birth"
            onChange={handleChange}
            value={dataUpdate.Birth}
          />
        </label>
        <label>
          <span>Ngày vào làm</span>
          <input
            type="date"
            name="DateWork"
            onChange={handleChange}
            value={dataUpdate.DateWork}
          />
        </label>

        <label>
          <span>Giới tính</span>
          <select
            onChange={handleChange}
            name="Gender"
            value={dataUpdate.Gender}
          >
            <option value="1">Nam</option>
            <option value="0">Nữ</option>
          </select>
        </label>

        <label>
          <span>Chức vụ</span>
          <select
            onChange={handleChange}
            name="Permissions"
            value={dataUpdate.Permissions}
          >
            <option value="Quản lý">Quản lý</option>
            <option value="Nhân viên">Nhân viên</option>
          </select>
        </label>

        <button type="submit" className="div7-update">
          Xác nhận thay đổi
        </button>
      </form>
    </div>
  );
};

export default UpdateStaff;
