import React, { useState } from "react";
import "./AddTable.css";
import axios from "axios";
const AddTable = ({ setDataTable }) => {
  const [tableNumber, setTableNumber] = useState();
  const handelSubmit = (e) => {
    e.preventDefault();
    const table = {
      NumberTable: tableNumber,
      CurrentOrder: {
        total_price: 0,
        items: [],
      },
      State: 0,
    };

    axios
      .post("http://localhost:4000/table", table)
      .then((res) => setDataTable((pre) => [...pre, res.data]))
      .catch(() => "Lỗi lấy dữ liệu");
  };
  return (
    <>
      <div className="formAddTable">
        <form onSubmit={handelSubmit}>
          <label>
            <input
              type="text"
              className="textNumber-addTable"
              onChange={(e) => setTableNumber(e.target.value)}
            />
            <button className="btn-addTable" onClick={handelSubmit}>
              Thêm bàn
            </button>
          </label>
        </form>
      </div>
    </>
  );
};

export default AddTable;
