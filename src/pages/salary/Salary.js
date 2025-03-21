import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Salary.css";

const Salary = () => {
  const [dataStaff, setDataStaff] = useState([]);
  const [salaryBonus, setSalaryBonus] = useState({});
  const [salaryOnHour, setSalaryOnHour] = useState({});

  const month = sessionStorage.getItem("month") || new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const daysInMonth = new Date(year, month, 0).getDate();
  const currentMonth = new Date().toLocaleString("en-US", { month: "long" });

  useEffect(() => {
    axios
      .get("http://localhost:4000/all/staff")
      .then((res) => setDataStaff(res.data))
      .catch(() => console.log("Lỗi tải dữ liệu"));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/workDay/timeKeeping")
      .then((res) => {
        setDataStaff((prev) =>
          prev.map((staff) => {
            const updateS = res.data.find(
              (item) => item.idStaff?._id.toString() === staff?._id.toString()
            );
            return updateS
              ? {
                  ...staff,
                  dayWorks: updateS.DayWorks.months[currentMonth]?.days || [],
                  total: updateS.DayWorks.months[currentMonth]?.total || 0,
                }
              : staff;
          })
        );
      })
      .catch(() => console.log("Lỗi tải dữ liệu"));
  }, []);

  const formatDate = (date) => date?.split("T")[0] || "";

  return (
    <>
      <p className="title-timeKeeping">Bảng lương tháng {month}</p>
      <div className="container-client">
        <table className="listClient-client">
          <thead>
            <tr>
              {[
                "STT",
                "Họ và tên",
                "Tuổi",
                "Địa chỉ",
                "Số ĐT",
                "Năm sinh",
                "Giới tính",
                "Chức vụ",
                "Ngày vào làm",
                "Lương theo ca",
                "Số ngày công",
                "Số ngày vắng",
                "Lương thưởng",
                "Tổng lương",
              ].map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataStaff.map((staff, index) => {
              const salaryPerHour = salaryOnHour[staff._id] ?? 120000;
              const bonus = salaryBonus[staff._id] ?? 150000;
              const totalDays = staff.total || 0;
              const totalSalary = salaryPerHour * totalDays + bonus;

              return (
                <tr key={staff._id}>
                  <td>{index + 1}</td>
                  <td>{staff.Name}</td>
                  <td>{staff.Age}</td>
                  <td>{staff.Address}</td>
                  <td>{staff.Phone}</td>
                  <td>{formatDate(staff?.Birth)}</td>
                  <td>{staff.Gender ? "Nam" : "Nữ"}</td>
                  <td>{staff.Permissions}</td>
                  <td>{formatDate(staff?.DateWork)}</td>
                  <td style={{ width: "160px" }}>
                    <input
                      type="number"
                      value={salaryPerHour}
                      className="salaryHour"
                      onChange={(e) =>
                        setSalaryOnHour((prev) => ({
                          ...prev,
                          [staff._id]: Number(e.target.value),
                        }))
                      }
                    />
                  </td>
                  <td>{totalDays}</td>
                  <td>
                    {daysInMonth - totalDays > 0 ? daysInMonth - totalDays : 0}
                  </td>
                  <td style={{ width: "160px" }}>
                    <input
                      type="number"
                      className="salaryHour"
                      value={bonus}
                      onChange={(e) =>
                        setSalaryBonus((prev) => ({
                          ...prev,
                          [staff._id]: Number(e.target.value),
                        }))
                      }
                    />
                  </td>
                  <td>{totalSalary.toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Salary;
