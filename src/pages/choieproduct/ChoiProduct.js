import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ChoiProduct.css";
import BillTable from "../../components/billTable/BillTable";
import { useParams } from "react-router-dom";
const ChoiProduct = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const [indexs, setindex] = useState(0);
  const [dataBill, setDataBill] = useState([]);
  const [numberTable, setNumberTable] = useState();

  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`https://coffee-manager-api.onrender.com/table/${id}`)
      .then((res) => {
        setNumberTable(res.data.NumberTable);
      })
      .catch(() => "Lỗi lấy dữ liệu");
  }, []);
  useEffect(() => {
    axios
      .get("https://coffee-manager-api.onrender.com/product")
      .then((res) => setDataProduct(res.data))
      .catch(() => "Lỗi lấy dữ liệu");
  }, []);
  const handelCick = (index, item) => {
    setindex(index);
    if (item === "Tất cả sản phẩm") {
      item = "";
    }
    axios
      .get(`https://coffee-manager-api.onrender.com/product/${item}`)
      .then((res) => setDataProduct(res.data))
      .catch(() => "Lỗi lấy dữ liệu");
  };
  const handleAddProduct = (p) => {
    if (sessionStorage.getItem(numberTable) === null) {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const hour = `${hours}:${minutes}:${seconds}`;
      sessionStorage.setItem(numberTable, hour);
    }

    const product = {
      name: p.nameProduct,
      quantity: 1,
      price: p.Price,
    };
    axios
      .put(`https://coffee-manager-api.onrender.com/table/${id}`, {
        product,
      })
      .then((res) => setDataBill(res.data.table.CurrentOrder.items))
      .catch((error) => console.log(error));
  };
  const menu = ["Tất cả sản phẩm", "Cafe", "Nước ngọt", "Bánh ngọt"];
  return (
    <div className="warapper-choiProduct">
      <div className="main-choiProduct">
        <ul className="item-choiProduct">
          {menu.map((item, index) => (
            <li
              className="toggle"
              onClick={() => handelCick(index, item)}
              style={{
                color: indexs === index ? "#74A65D" : "black",
                borderBottom: indexs === index ? "2px solid #74A65D" : "none",
              }}
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="product-choiProduct">
          {dataProduct?.map((product) => (
            <div
              className="content-product"
              onClick={() => handleAddProduct(product)}
            >
              <p className="name-product">{product.nameProduct}</p>
              <p className="price-product">
                {product.Price.toLocaleString("vi-VN")}
              </p>
              <p className="size-product">Size: {product.Size}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bill-choiProduct">
        <BillTable dataBill={dataBill || []} />
      </div>
    </div>
  );
};

export default ChoiProduct;
