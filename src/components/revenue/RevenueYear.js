import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 120000 },
  { month: "Feb", revenue: 120000 },
  { month: "Mar", revenue: 120000 },
  { month: "Apr", revenue: 120000 },
  { month: "May", revenue: 120000 },
  { month: "Jun", revenue: 120000 },
  { month: "Jul", revenue: 120000 },
  { month: "Aug", revenue: 120000 },
  { month: "Sep", revenue: 120000 },
  { month: "Oct", revenue: 120000 },
  { month: "Nov", revenue: 120000 },
  { month: "Dec", revenue: 120000 },
];
const RevenueYear = () => {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <h2>📊 Thống kê doanh thu theo tháng</h2>
      <ResponsiveContainer width="100%" height="100%" className="chart-revenue">
        <BarChart
          data={revenueData}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="orange" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueYear;
