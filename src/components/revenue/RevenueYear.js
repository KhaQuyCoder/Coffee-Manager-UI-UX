import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const RevenueYear = () => {
  const year = Number(new Date().getFullYear());
  const [revenueData, setRevenueData] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://coffee-manager-api.onrender.com/revenue/findRevenue/${year}`
      )
      .then((res) => setRevenueData(res.data.revenueYear))
      .catch(() => "Lỗi lấy data");
  }, []);
  return (
    <div style={{ width: "100%", height: 400 }}>
      <h2 style={{ margin: "10px 0 20px 20px" }}>
        Thống kê doanh thu theo năm{" "}
        <i class="fa-solid fa-chart-simple" style={{ color: "orange" }}></i>
      </h2>
      <ResponsiveContainer width="100%" height="100%" className="chart-revenue">
        <BarChart
          data={revenueData}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="orange" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueYear;
