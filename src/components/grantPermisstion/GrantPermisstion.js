import React, { useState, useEffect } from "react";
import axios from "axios";
import "./GrantPermisstion.css";

const GrantPermisstion = ({ idUser, permisstion: initialPermisstion }) => {
  const [permisstion, setPermisstion] = useState(initialPermisstion || []);

  useEffect(() => {
    setPermisstion(initialPermisstion || []);
  }, [initialPermisstion]);

  const handleChange = async (e) => {
    const value = e.target.value;
    try {
      await axios.post(
        `http://localhost:4000/staff/grantPermisstion/${idUser}`,
        {
          permisstion: value,
        }
      );

      setPermisstion((prev) =>
        prev.includes(value)
          ? prev.filter((p) => p !== value)
          : [...prev, value]
      );
    } catch (error) {
      console.error("Lỗi khi cập nhật quyền:", error);
    }
  };

  return (
    <div>
      <p className="title-grantPermisstion">
        Thực hiện cấp quyền cho nhân viên
      </p>
      <form className="main-prantPermisstion">
        {[
          { label: "Quyền quản lý khách hàng", value: "KH" },
          { label: "Quyền quản lý nhân viên", value: "NV" },
          { label: "Quyền xem doanh thu", value: "DT" },
          { label: "Quyền quản lý chấm công", value: "CC" },
          { label: "Quyền quản lý lương", value: "L" },
          { label: "Quyền quản lý sản phẩm & nguyên vật liệu", value: "VL&SP" },
        ].map(({ label, value }) => (
          <label key={value}>
            <span>{label}</span>
            <input
              type="checkbox"
              onChange={handleChange}
              value={value}
              checked={!!permisstion.find((p) => p === value)}
            />
          </label>
        ))}
      </form>
    </div>
  );
};

export default GrantPermisstion;
