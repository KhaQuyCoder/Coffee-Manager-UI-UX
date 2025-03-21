import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Revenue.css";

const Revenue = () => {
  return (
    <>
      <div className="warrper-revenue">
        {[
          {
            name: "Doanh thu ngày",
            des: "Hiển thị tất tổng doanh thu của từng ngày dưới dạng biểu đồ, giúp có cái nhìn tổng quát, đánh giá được sự chênh lệch doanh thu qua từng ngày",
            ref: "doanh-thu-ngay",
          },
          {
            name: "Doanh thu tháng",
            des: "Hiển thị tất tổng doanh thu qua từng tháng dưới dạng biểu đồ, giúp có cái nhìn tổng quát, đánh giá được sự chênh lệch doanh thu qua từng tháng",
            ref: "doanh-thu-thang",
          },
          {
            name: "Doanh thu năm",
            des: "Hiển thị tất tổng doanh thu của từng năm dưới dạng biểu đồ, giúp có cái nhìn tổng quát, đánh giá được sự chênh lệch doanh thu qua từng năm",
            ref: "doanh-thu-nam",
          },
        ].map((item) => (
          <Link className="choiRevenue" to={`/revenue/${item.ref}`}>
            <p className="name-revenue">{item.name}</p>
            <p className="des-revenue">{item.des}</p>
            <Link className="seemore-revenue" to={`/revenue/${item.ref}`}>
              Xem chi tiết
            </Link>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Revenue;
