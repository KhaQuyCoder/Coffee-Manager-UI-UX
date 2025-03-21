import React, { useRef } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./TimeKeeping.css";

const TimeKeeping = () => {
  const [dataStaff, setDataStaff] = useState([]);
  const dayInMonth = sessionStorage.getItem("month");
  const Year = new Date().getFullYear();
  const Month = new Date().getMonth() + 1;
  const month = useParams();
  const day = new Date(Year, dayInMonth || Month, 0).getDate();
  const navigate = useNavigate();
  const currentMonth =
    month.month ||
    new Date().toLocaleString("en-US", {
      month: "long",
    }); // Lấy tháng hiện tại (January, February,...)
  const [days, setDays] = useState();
  useEffect(() => {
    setDays(Array.from({ length: day }, (_, i) => i + 1));
    console.log(1);
    axios
      .get("http://localhost:4000/all/staff")
      .then((res) => setDataStaff(res.data))
      .catch(() => console.log("Lỗi tải dữ liệu"));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/workDay/timeKeeping")
      .then((res) => {
        setDataStaff((pre) =>
          pre.map((staff) => {
            const updateS = res.data.find(
              (item) => item.idStaff?._id.toString() === staff?._id.toString()
            );
            return updateS
              ? {
                  ...staff,
                  dayWorks: updateS.DayWorks.months[currentMonth]?.days,
                  total: updateS.DayWorks.months[currentMonth]?.total,
                }
              : staff;
          })
        );
      })
      .catch(() => console.log("Lỗi tải dữ liệu"));
  }, []);
  const handelConvertMonth = (month, index) => {
    sessionStorage.setItem("month", index);
    navigate(`/mannagerTimekeeping/${month}`);
    window.location.reload();
  };
  const handelTimeKeepings = (id, d) => {
    axios
      .post("http://localhost:4000/workDay/make", {
        DayWorks: {
          months: {
            [currentMonth]: {
              days: d.toString(),
              total: 1,
            },
          },
        },
        idStaff: id,
      })
      .finally(() => {
        window.location.reload();
      });
  };

  return (
    <>
      <p className="title-timeKeeping">
        {`Bảng chấm công nhân viên Tháng ${
          dayInMonth || new Date().getMonth() + 1
        } năm
        ${Year}`}
      </p>
      <div className="container-timekeeping">
        {dataStaff.map((staff) => (
          <div className="content-timekeeping" key={staff._id}>
            <p className="name-staff">
              {staff.Name} - {staff.Permissions}
            </p>
            <div className="days-timeKeeping">
              {days?.map((d) => (
                <span
                  className="day-timeKeeping"
                  style={{
                    backgroundColor: staff.dayWorks?.includes(d.toString())
                      ? "green"
                      : "",
                  }}
                  onClick={() => handelTimeKeepings(staff._id, d)}
                >
                  {d}
                </span>
              ))}
            </div>
            <p className="total-timeKeeping">{`Tổng ca làm: ${
              staff.total ? staff.total : "0"
            }`}</p>
          </div>
        ))}
      </div>
      <div className="AllMonth-timeKeeping">
        {[
          "January",
          "Februar",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ].map((month, index) => (
          <p
            onClick={() => handelConvertMonth(month, index + 1)}
            className="month-timeKeeping"
            style={{
              backgroundColor: month === currentMonth ? "orange" : "#fff",
            }}
          >
            {month}
          </p>
        ))}
      </div>
    </>
  );
};

export default TimeKeeping;
