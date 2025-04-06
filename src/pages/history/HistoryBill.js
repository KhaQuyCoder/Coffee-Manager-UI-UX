import React, { useEffect, useState } from "react";
import "./HistoryBill.css";
import axios from "axios";
const HistoryBill = () => {
  const [dataHistory, setDataHistory] = useState([]);
  useEffect(() => {
    axios
      .get("https://coffee-manager-api.onrender.com/history/getAll")
      .then((res) => setDataHistory(res.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="container-client">
      <table className="listClient-client">
        <thead>
          <tr>
            {[
              "STT",
              "Mã hóa đơn",
              "Số bàn",
              "Tổng tiền",
              "Thời gian thanh toán",
              "Nhân viên",
            ].map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataHistory.map((h, index) => (
            <tr key={h._id}>
              <td>{index + 1}</td>
              <td>{h._id}</td>
              <td>{h.numberTable}</td>
              <td>{h.sumMoney.toLocaleString()}</td>
              <td>{h.time}</td>
              <td>{h.staff}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryBill;
