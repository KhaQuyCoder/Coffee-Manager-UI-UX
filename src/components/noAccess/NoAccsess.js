import React from "react";
import { FaLock } from "react-icons/fa";
import "./NoAccess.css";
const NoAccess = () => {
  return (
    <div className="no-access-container">
      <FaLock className="lock-icon" />
      <h2>Không có quyền truy cập</h2>
      <p>
        Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị
        viên để được cấp quyền.
      </p>
    </div>
  );
};

export default NoAccess;
