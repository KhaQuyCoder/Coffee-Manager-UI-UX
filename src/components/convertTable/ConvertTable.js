import React, { useEffect, useState } from "react";
import "./ConvertTable.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ConvertTable = ({ convert, id, dataProduct, setOpa }) => {
  const [dataTableNoAc, setDataTableNoAc] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:4000/table")
      .then((res) => setDataTableNoAc(res.data))
      .catch(() => "Lỗi lấy bàn");
  }, []);
  const handelConvert = (tb) => {
    const infor = {
      idTableCovert: id,
      product: dataProduct,
    };

    axios
      .put(`http://localhost:4000/table/convert/${tb._id}`, infor)
      .then(() => {
        convert.current.style.transform = "translateX(100%)";
        navigate(`/mannagerTable/${tb._id}`);
        window.location.reload();
      });
  };
  const handelOpaExits = () => {
    convert.current.style.transform = "translateX(100%)";
    setOpa(false);
  };

  return (
    <>
      <p className="exits-convertTable" onClick={handelOpaExits}>
        <i class="fa-solid fa-arrow-right"></i>
      </p>
      <p className="title-convertTable">Danh sách bàn còn trống</p>
      <div className="main-convertTable">
        {dataTableNoAc.map((tb) =>
          tb.State === false ? (
            <div key={tb._id} className="tableNoAc-convertTable">
              <span className="numberTableConvert">{tb.NumberTable}</span>
              <button className="btn-convert" onClick={() => handelConvert(tb)}>
                Chuyển qua
              </button>
            </div>
          ) : (
            ""
          )
        )}
      </div>
    </>
  );
};

export default ConvertTable;
