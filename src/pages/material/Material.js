import React, { useEffect, useRef, useState } from "react";
import "./Material.css";
import dayjs from "dayjs";
import axios from "axios";
const Material = () => {
  const [dataMaterial, setDataMaterial] = useState([]);
  const [opa, setOpa] = useState(false);
  const [sltk, setSLTK] = useState({});

  const dataMaterialRef = useRef(null);
  const [dataPost, setDataPost] = useState({
    nameMaterial: "",
    DVT: "",
    NCC: "",
    Coin: "",
    NSX: "",
    HSD: "",
    SLNH: "",
    SLTK: "",
    NNK: "",
    Description: "",
  });
  useEffect(() => {
    axios
      .get("http://localhost:4000/material/get")
      .then((res) => setDataMaterial(res.data))
      .catch(() => "Lỗi get data");
  }, []);
  const fomatDate = (d) => {
    return d.split("T")[0];
  };
  const handelAddMaterial = () => {
    setOpa(true);
    dataMaterialRef.current.style.transform = "translateX(0%)";
  };
  const handelOpa = () => {
    setOpa(false);
    dataMaterialRef.current.style.transform = "translateX(110%)";
  };
  const handelChange = (e) => {
    setDataPost((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };
  const handelSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:4000/material/make", dataPost)
      .then((res) => {
        setDataMaterial((pre) => [...pre, res.data]);
        dataMaterialRef.current.style.transform = "translateX(110%)";
        setOpa(false);
      })
      .catch(() => "Lỗi post data");
  };
  const handelChangeSLTK = (e, m) => {
    setSLTK((pre) => ({ ...pre, [m._id]: e.target.value }));
    axios.put(`http://localhost:4000/material/update/${m._id}`, {
      newSLTK: e.target.value,
    });
  };
  const checkDateHSD = (d1, hsd) => {
    const m = Number(hsd.split(" ")[0]);
    const day1 = dayjs();
    const day2 = dayjs(d1).add(m, "month");

    return Number(day2.diff(day1, "day"));
  };
  const handelDeleteMaterial = (m) => {
    axios
      .delete(`http://localhost:4000/material/delete/${m._id}`)
      .then((res) =>
        setDataMaterial((pre) =>
          pre.filter((item) => item._id !== res.data._id)
        )
      )
      .catch(() => "Loi xoa ");
  };
  return (
    <div>
      {opa && <div className="opa" onClick={handelOpa}></div>}
      <form
        className="addOneMaterial"
        ref={dataMaterialRef}
        onSubmit={handelSubmit}
      >
        <label className="div1">
          <span>Tên nguyên liệu</span>
          <input
            type="text"
            className="valueMaterial"
            onChange={handelChange}
            name="nameMaterial"
            value={dataPost.nameMaterial}
          />
        </label>
        <label className="div2">
          <span>Nhà cung cấp</span>
          <input
            type="text"
            className="valueMaterial"
            onChange={handelChange}
            name="NCC"
            value={dataPost.NCC}
          />
        </label>
        <label className="div3">
          <span>Giá nhập</span>
          <input
            type="text"
            className="valueMaterial"
            onChange={handelChange}
            name="Coin"
            value={dataPost.Coin}
          />
        </label>
        <label className="div4">
          <span>ĐVT</span>
          <select
            className="valueMaterial"
            onChange={handelChange}
            name="DVT"
            value={dataPost.DVT}
          >
            <option value="">--Chọn 1 đơn vị--</option>
            <option value="Kg">Kg</option>
            <option value="Lít">Lít</option>
            <option value="Chai">Chai</option>
            <option value="Quả">Quả</option>
            <option value="Gói">Gói</option>
          </select>
        </label>
        <label className="div5">
          <span>Hạng sử dụng</span>
          <input
            type="text"
            placeholder="Vd: 6 tháng"
            className="valueMaterial"
            onChange={handelChange}
            name="HSD"
            value={dataPost.HSD}
          />
        </label>
        <label className="div6">
          <span>Số lượng nhập</span>
          <input
            type="text"
            className="valueMaterial"
            onChange={handelChange}
            name="SLNH"
            value={dataPost.SLNH}
          />
        </label>
        <label className="div7">
          <span>NSX</span>
          <input
            type="date"
            className="valueMaterial"
            onChange={handelChange}
            name="NSX"
            value={dataPost.NSX}
          />
        </label>
        <label className="div8">
          <span>Ngày nhập</span>
          <input
            type="date"
            className="valueMaterial"
            onChange={handelChange}
            name="NNK"
            value={dataPost.NNK}
          />
        </label>
        <label className="div9">
          <span>Mô tả</span>
          <input
            type="text"
            className="valueMaterial"
            onChange={handelChange}
            name="Description"
            value={dataPost.Description}
          />
        </label>
        <button type="submit" className="btn-add-material">
          Thêm nguyên liệu
        </button>
      </form>
      <div className="addClient-client " onClick={handelAddMaterial}>
        {" "}
        <i class="fa-solid fa-dumpster-fire"></i> Thêm 1 nguyên liệu mới
      </div>
      <table className="listClient-client data-material">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên nguyên liệu</th>
            <th>Nhà cung cấp</th>
            <th>Giá nhập</th>
            <th>Ngày sản xuất</th>
            <th>Hạng sử dụng</th>
            <th>Cảnh báo HSD</th>
            <th>SLNH</th>
            <th>SLTK</th>
            <th>ĐVT</th>
            <th>Ngày nhập kho</th>
            <th>Mô tả</th>
            <th>Tổng thành tiền</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {dataMaterial.map((m, index) => (
            <tr key={m._id}>
              <td>{index + 1}</td>
              <td>{m.nameMaterial}</td>
              <td>{m.NCC}</td>
              <td>
                {Number(m.Coin).toLocaleString("vi-Vn")}/{m.DVT}
              </td>
              <td>{m.NSX}</td>
              <td>{m.HSD}</td>
              <td
                className="dataHSD-material"
                style={{
                  color:
                    checkDateHSD(m.NSX, m.HSD, m.HSD) > 10
                      ? "green"
                      : checkDateHSD(m.NSX, m.HSD, m.HSD) > 0 &&
                        checkDateHSD(m.NSX, m.HSD, m.HSD) <= 10
                      ? "orange"
                      : "red",
                }}
              >
                {`${
                  checkDateHSD(m.NSX, m.HSD, m.HSD) > 10
                    ? `${
                        "Còn" +
                        " " +
                        checkDateHSD(m.NSX, m.HSD, m.HSD) +
                        " " +
                        "n"
                      }`
                    : checkDateHSD(m.NSX, m.HSD, m.HSD) > 0 &&
                      checkDateHSD(m.NSX, m.HSD, m.HSD) <= 10
                    ? `${
                        "Còn" +
                        " " +
                        checkDateHSD(m.NSX, m.HSD, m.HSD) +
                        " " +
                        "n"
                      }`
                    : "Đã hết hạng"
                }`}{" "}
              </td>
              <td>{m.SLNH}</td>
              <td>
                <input
                  type="number"
                  value={sltk[m._id] ?? m.SLTK}
                  onChange={(e) => handelChangeSLTK(e, m)}
                  className="changeSLTK-material"
                />
              </td>
              <td>{m.DVT}</td>
              <td>{fomatDate(m.NNK)}</td>
              <td>{m.Description}</td>
              <td>{(m.SLNH * m.Coin).toLocaleString("vi-Vn")} VND</td>
              <td>
                <i
                  className="fa-solid fa-trash"
                  onClick={() => handelDeleteMaterial(m)}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Material;
