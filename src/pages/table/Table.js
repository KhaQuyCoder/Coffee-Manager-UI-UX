import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Table.css";
import { Link } from "react-router-dom";
import AddTable from "../../components/addTable/AddTable";
const Table = () => {
  const [dataTable, setDataTable] = useState([]);
  const cpn_addTable = useRef(null);
  useEffect(() => {
    axios
      .get("http://localhost:4000/table")
      .then((res) => setDataTable(res.data))
      .catch(() => "lỗi");
  }, []);
  const handelAddTable = () => {
    cpn_addTable.current.style.transform = "translateY(0)";
    cpn_addTable.current.style.opacity = "1";
  };

  return (
    <div className="container-table">
      <div
        className="addClient-client"
        style={{ margin: "10px 0 0 10px", fontFamily: "arial" }}
        onClick={handelAddTable}
      >
        <i class="fa-solid fa-square-plus"></i> Thêm 1 bàn
        <div className="cpn_addTable" ref={cpn_addTable}>
          <AddTable setDataTable={setDataTable} />
        </div>
      </div>
      <ul className="wrapper-table">
        {dataTable?.map((table) => (
          <Link
            to={`/mannagerTable/${table._id}`}
            key={table._id}
            className={`item-table ${table.state ? "activity" : ""}`}
          >
            <p className="tableNumber-table">{table.NumberTable}</p>
            <p className={table.State ? "on-table" : "off-table"}>
              {table.State ? "on" : "off"}
            </p>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Table;
