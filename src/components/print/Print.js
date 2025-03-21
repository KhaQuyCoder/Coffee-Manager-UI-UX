import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import "./Print.css";
const Invoice = ({ dataProduct, numberTable, money }) => {
  const invoiceRef = useRef();
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const hourOff = `${hours}:${minutes}:${seconds}`;
  const totalBill = () => {
    let s = 0;
    dataProduct.map((p) => {
      s += p.price * p.quantity;
    });
    return s;
  };
  return (
    <div className="invoice-container">
      <div ref={invoiceRef} className="invoice-box">
        <h2 className="invoice-title">
          Ngọc Coffee{" "}
          <p className="address-print">
            29A Lê Hồng Phong, Phú Nhuận, Huế, Thành phố Huế
          </p>
        </h2>
        <h3>Phiếu thanh toán</h3>
        <p>Số:1</p>
        <p>Ngày: {new Date().toLocaleDateString("vi-Vn")}</p>

        <div className="invoice-info">
          <p>
            <strong>Bàn số: {numberTable}</strong>
          </p>
          <p>
            <strong>Nhân viên: {sessionStorage.getItem("nameStaff")}</strong>
          </p>
          <p>
            <strong>Giờ vào: {sessionStorage.getItem(numberTable)}</strong>
          </p>
          <p>
            <strong> Giờ ra: {hourOff}</strong>
          </p>
          <p>
            <strong>Khách hàng:</strong> Nguyễn Văn A
          </p>
          <table className="product-print">
            <thead>
              <tr>
                <th>Tên hàng</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {dataProduct?.map((p) => (
                <tr>
                  <td>{p.name}</td>
                  <td>{p.price}</td>
                  <td>{p.quantity}</td>
                  <td>{p.quantity * p.price}</td>
                </tr>
              ))}
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
              <tr className="f">
                <td>Tổng thành tiền</td>
                <td></td>
                <td></td>
                <td>
                  <strong>{totalBill().toLocaleString("vi-Vn")}</strong>
                </td>
              </tr>
              <tr className="f">
                <td>VAT(0%)</td>
                <td></td>
                <td></td>
                <td>
                  <strong>{0}</strong>
                </td>
              </tr>
              <tr className="f">
                <td>Tổng cộng</td>
                <td></td>
                <td></td>
                <td>
                  <strong>{totalBill().toLocaleString("vi-Vn")}</strong>
                </td>
              </tr>
              <tr className="f">
                <td>Tiền khách trả</td>
                <td></td>
                <td></td>
                <td>
                  <strong>
                    {money * 1000 > 0
                      ? (money * 1000).toLocaleString("vi-Vn")
                      : ""}
                  </strong>
                </td>
              </tr>
              <tr className="f">
                <td>Tiền thừa</td>
                <td></td>
                <td></td>
                <td>
                  <strong>
                    {money * 1000 - totalBill() >= 0
                      ? (money * 1000 - totalBill()).toLocaleString("vi-Vn")
                      : ""}
                  </strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="invoice-footer">
          <p>
            <strong>Cảm ơn quý khách!</strong>
          </p>
        </div>
        <button className="print-btn">In hóa đơn (PDF)</button>
      </div>
    </div>
  );
};

export default Invoice;
