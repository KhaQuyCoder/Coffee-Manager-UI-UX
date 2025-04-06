import React, { useEffect, useRef, useState } from "react";
import "./BillTable.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import ConvertTable from "../convertTable/ConvertTable";
import Print from "../../components/print/Print";
const BillTable = ({ dataBill }) => {
  const [dataProduct, setDataProduct] = useState([]);
  const [numberTable, setNumberTable] = useState();
  const [print, setPrint] = useState(false);
  const [opa, setOpa] = useState(false);
  const [money, setMoney] = useState();
  const [pay, setPay] = useState(false);
  const successfull = useRef(null);
  const removeValue = useRef(null);
  const convert = useRef(null);
  const tableBill = useRef(null);
  const s = useRef(null);

  const year = Number(new Date().getFullYear());
  const yearCurrent = Number(new Date().getFullYear());
  const currentMonth = new Date().toLocaleString("en-US", { month: "long" });
  const { id } = useParams();
  const nameStaff = sessionStorage.getItem("nameStaff");

  useEffect(() => {
    axios
      .get(`https://coffee-manager-api.onrender.com/table/${id}`)
      .then((res) => {
        setDataProduct(res.data.CurrentOrder.items);
        setNumberTable(res.data.NumberTable);
      })
      .catch(() => "Lỗi lấy dữ liệu");
  }, [dataBill]);
  const totalBill = () => {
    let res = 0;
    dataProduct.map((p) => {
      res += p.price * p.quantity;
    });
    return res.toLocaleString("vi-VN");
  };
  const handelPlus = (request, idP) => {
    const req = {
      request: request,
      idProduct: idP,
    };
    axios
      .put(`https://coffee-manager-api.onrender.com/table/quantity/${id}`, req)
      .then((res) => {
        const updateQuantity = res.data.table.CurrentOrder.items;

        setDataProduct((pre) =>
          pre.map((p) => {
            const updateP = updateQuantity.find(
              (item) => item._id.toString() === p._id.toString()
            );
            return updateP ? { ...p, quantity: updateP.quantity } : p;
          })
        );
      })
      .catch((error) => console.log(error));
  };
  const handleDelProduct = (idp) => {
    axios
      .delete(`https://coffee-manager-api.onrender.com/table/${id}`, {
        data: { idProduct: idp },
      })
      .then((res) => setDataProduct(res.data.CurrentOrder.items))
      .catch(() => "lỗi xóa sản phẩm");
  };
  const handelMoney = () => {
    return money - totalBill().split(".")[0];
  };
  const handelPay = (req, _id) => {
    if (totalBill() === "0") return;
    setPay(true);
    if (req === "Xác nhận") {
      if (successfull.current) {
        axios
          .delete(
            `https://coffee-manager-api.onrender.com/table/delteALl/${id}`
          )
          .then((res) => setDataProduct(res.data.CurrentOrder.items));
        successfull.current.style.transform = "translateX(0)";
        removeValue.current.value = "";
        axios.post(
          `https://coffee-manager-api.onrender.com/revenue/addRevenueDay/${year}`,
          {
            revenueDay: {
              day: new Date().toISOString().split("T")[0].toString(),
              revenue: Number(totalBill() * 1000),
            },
            revenueMonth: {
              month: currentMonth,
              revenue: Number(totalBill() * 1000),
            },
            revenueYear: {
              year: yearCurrent.toString(),
              revenue: Number(totalBill() * 1000),
            },
          }
        );
        axios.post("https://coffee-manager-api.onrender.com/history/add", {
          id: generateRandomString(),
          numberTable: numberTable,
          sumMoney: Number(totalBill() * 1000),
          time: `[${new Date().toLocaleDateString(
            "vi-VN"
          )}]: ${new Date().toLocaleTimeString("vi-VN", { hour12: false })}`,
          staff: nameStaff,
        });
        sessionStorage.removeItem(numberTable);
      }
    } else {
      return;
    }
  };
  function generateRandomString() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = Math.floor(Math.random() * 4) + 7;
    let randomString = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters[randomIndex];
    }

    return randomString;
  }
  const handelConvertTable = () => {
    setOpa(true);
    convert.current.style.transform = "translateX(0)";
  };
  const handelPrint = () => {
    if (tableBill.current) {
      tableBill.current.style.display = "none";
    }
    setOpa(true);
    setPrint(true);
  };
  const handelClose = () => {
    setOpa(false);
    setPrint(false);
    convert.current.style.transform = "translateX(100%)";
    tableBill.current.style.display = "block";
  };
  return (
    <>
      {opa && <div className="opa-convert" onClick={handelClose}></div>}
      <div className="container-billTable" ref={tableBill}>
        <p className="title-bill">Bàn số {numberTable}</p>
        <table className="table-bill">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dataProduct.map((item, index) => (
              <tr key={index} className="main-bill">
                <td className="stt">{index + 1}</td>
                <td className="nameproduct-bill">{item.name}</td>
                <td className="quanlity-bill">
                  <p
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <i
                      class="fa-solid fa-minus"
                      onClick={() => handelPlus("minus", item._id)}
                    ></i>
                    <span className="number-bill">{item.quantity}</span>
                    <i
                      class="fa-solid fa-plus"
                      onClick={() => handelPlus("plus", item._id)}
                    ></i>
                  </p>
                </td>
                <td className="price-bill">
                  {item.price?.toLocaleString("vi-VN")}
                </td>
                <td className="totalPrice-bill">
                  {(item.price * item.quantity)?.toLocaleString("vi-VN")}
                </td>
                <td>
                  <i
                    className="fa-solid fa-trash"
                    onClick={() => handleDelProduct(item._id)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="checkOut-bill">
          {pay && (
            <div className="all-bill">
              <p>
                Tổng hóa đơn:{" "}
                <span style={{ color: "#74A65D" }}>{totalBill()}</span>
                <br></br>
                Số tiền của khách
                <input
                  className="inputmonney-bill"
                  ref={removeValue}
                  onChange={(e) =>
                    setMoney(e.target.value.toLocaleString("vi-VN"))
                  }
                />
                <br></br>
                <span>
                  Số tiền trả lại:{" "}
                  {handelMoney() > 0 ? handelMoney() + ".000" : 0}
                </span>
              </p>
              <div className="icon-pay-bill" ref={successfull}>
                <i class="fa-solid fa-check"></i>
                <p>Thanh toán thành công</p>
              </div>
            </div>
          )}
          <div style={{ margin: "10px 0" }}>
            <button className="btn-pay" onClick={() => handelPay("Xác nhận")}>
              {pay ? "Xác nhận" : "Thanh toán"}
            </button>

            <button className="btn-in" onClick={handelPrint}>
              In hóa đơn
            </button>

            <button className="btn-convert" onClick={handelConvertTable}>
              Chuyển bàn
            </button>
          </div>
        </div>
        <div className="container-convertTable" ref={convert}>
          <ConvertTable
            convert={convert}
            id={id}
            dataProduct={dataProduct}
            setOpa={setOpa}
          />
        </div>
      </div>
      {print && (
        <div ref={s}>
          <Print
            dataProduct={dataProduct}
            numberTable={numberTable}
            money={money}
          />
        </div>
      )}
    </>
  );
};

export default BillTable;
