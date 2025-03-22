import React, { useEffect, useRef, useState } from "react";
import "./Product.css";
import axios from "axios";
const Product = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const [opa, setOpa] = useState(false);
  const dataMaterialRef = useRef();
  const [dataPost, setDataPost] = useState({
    nameProduct: "",
    Price: "",
    imgUrl: "",
    quanlitySold: 0,
    Descriptions: "",
    Size: "",
    code: "",
  });
  useEffect(() => {
    axios
      .get("https://coffee-manager-api.onrender.com/product")
      .then((res) => setDataProduct(res.data))
      .catch(() => "Lỗi lấy data");
  }, []);
  const handelChange = (e) => {
    setDataPost((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };
  const handelOpa = () => {
    setOpa(false);
    dataMaterialRef.current.style.transform = "translateX(110%)";
  };
  const handelAddMaterial = () => {
    setOpa(true);
    dataMaterialRef.current.style.transform = "translateX(0%)";
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    console.log(dataPost);

    axios
      .post("https://coffee-manager-api.onrender.com/add/product", dataPost)
      .then((res) => {
        setDataProduct((pre) => [...pre, res.data]);
        dataMaterialRef.current.style.transform = "translateX(110%)";
        setOpa(false);
      })
      .catch(() => "Lỗi post data");
  };
  const handelOff = (p) => {
    axios
      .put(`https://coffee-manager-api.onrender.com/add/product/off/${p._id}`)
      .then((res) => {
        setDataProduct((pre) =>
          pre.map((item) =>
            item._id === res.data._id ? { ...item, State: !item.State } : item
          )
        );
      });
  };

  const handelDel = (p) => {
    axios
      .delete(
        `https://coffee-manager-api.onrender.com/add/product/delete/${p._id}`
      )
      .then((res) =>
        setDataProduct((pre) => pre.filter((item) => item._id !== res.data._id))
      );
  };
  return (
    <div>
      {opa && <div className="opa" onClick={handelOpa}></div>}
      <form
        className="addOneProduct"
        ref={dataMaterialRef}
        onSubmit={handelSubmit}
      >
        <label>
          <span>Tên sản phẩm</span>
          <input
            type="text"
            className="valueMaterial"
            onChange={handelChange}
            name="nameProduct"
            value={dataPost.nameProduct}
          />
        </label>
        <label>
          <span>Giá</span>
          <input
            type="text"
            className="valueMaterial"
            onChange={handelChange}
            name="Price"
            value={dataPost.Price}
          />
        </label>
        <label>
          <span>Loại sản phẩm</span>
          <select
            className="valueMaterial"
            onChange={handelChange}
            name="code"
            value={dataPost.code}
          >
            <option value="">--Chọn 1 loại--</option>
            <option value="Bánh ngọt">Bánh ngọt</option>
            <option value="Nước ngọt">Nước ngọt</option>
            <option value="Cafe">Cafe</option>
          </select>
        </label>
        <label>
          <span>Size</span>
          <select
            className="valueMaterial"
            onChange={handelChange}
            name="Size"
            value={dataPost.Size}
          >
            <option value="">--Chọn 1 loại--</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
            <option value="Chai 330ML">Chai 330ML</option>
            <option value="Lon 32ML">Lon 32ML</option>
          </select>
        </label>
        <label className="divFire">
          <span>Miêu tả</span>
          <input
            type="text"
            className="valueMaterial"
            onChange={handelChange}
            name="Descriptions"
            value={dataPost.Descriptions}
          />
        </label>
        <button type="submit" className="btn-add-material">
          Thêm sản phẩm
        </button>
      </form>
      <div className="addClient-client" onClick={handelAddMaterial}>
        {" "}
        <i class="fa-brands fa-product-hunt"></i> Thêm 1 sản phẩm mới
      </div>
      <table className="listClient-client data-material">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên sản phẩm</th>
            <th>Miêu tả</th>
            <th>Size</th>
            <th>Giá sản phẩm</th>
            <th>Loại sản phẩm</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {dataProduct.map((p, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{p.nameProduct}</td>
              <td>{p.Descriptions}</td>
              <td>{p.Size}</td>
              <td>{p.Price.toLocaleString("vi-Vn")}</td>
              <td>{p.code}</td>
              <td
                style={{
                  backgroundColor: `${p.State ? "green" : "orange"}`,
                  borderRadius: "10px",
                }}
              >
                {p.State ? "Còn hàng" : "Hết hàng"}
              </td>
              <td>
                <i
                  className="fa-solid fa-trash"
                  onClick={() => handelDel(p)}
                ></i>
                <i
                  class="fa-solid fa-power-off"
                  onClick={() => handelOff(p)}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Product;
