import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const RevenueDay = () => {
  const [revenueData, setRevenueData] = useState([]);
  const year = Number(new Date().getFullYear());
  useEffect(() => {
    axios
      .get(
        `https://coffee-manager-api.onrender.com/revenue/findRevenue/${year}`
      )
      .then((res) => setRevenueData(res.data.revenueMonth))
      .catch(() => "Lỗi lấy data");
  }, []);
  return (
    <div style={{ width: "100%", height: 400 }}>
      <h2 style={{ margin: "10px 0 20px 20px" }}>
        Thống kê doanh thu theo tháng{" "}
        <i class="fa-solid fa-chart-simple" style={{ color: "orange" }}></i>
      </h2>
      <ResponsiveContainer width="100%" height="100%" className="chart-revenue">
        <BarChart
          data={revenueData}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="orange" animationDuration={800} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueDay;
