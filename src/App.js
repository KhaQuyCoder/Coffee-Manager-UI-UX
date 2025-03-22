import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./layouts/header/Header";
import Login from "./pages/login/Login";
import Navbar from "./layouts/navbar/Navbar";
import Table from "./pages/table/Table";
import ChoiProduct from "./pages/choieproduct/ChoiProduct";
import Client from "./pages/client_/Client";
import Staff from "./pages/staff/Staff";
import NoAccess from "./components/noAccess/NoAccsess";
import NotFound from "./components/notfound/NotFound";
import Salary from "./pages/salary/Salary";
import TimeKeeping from "./pages/timekeeping/TimeKeeping";
import Revenue from "./pages/revenue/Revenue";
import RevenueDay from "../src/components/revenue/RevenueDay";
import RevenueMonth from "./components/revenue/RevenueMonth";
import RevenueYear from "./components/revenue/RevenueYear";
import Product from "./pages/products/Product";
import Material from "./pages/material/Material";
import { useEffect, useState } from "react";
import axios from "axios";
import Close from "./components/closeWarning/Close";
function App() {
  const location = useLocation();
  const token = sessionStorage.getItem("token");
  const id = sessionStorage.getItem("_id");
  const [dataStaff, setDataStaff] = useState();
  const role = sessionStorage.getItem("Permissions");
  useEffect(() => {
    if (id) {
      axios
        .get(`https://coffee-manager-api.onrender.com/new/staff/${id}`)
        .then((res) => {
          setDataStaff(res.data);
          sessionStorage.setItem("nameStaff", res.data.Name);
        });
    }
  }, [id]);

  return (
    <>
      {location.pathname !== "/login" && (
        <>
          {token ? (
            <div className="App">
              <Header />
              <div className="layout-app">
                <Navbar />
                <Routes>
                  {role === "Quản lý" ? (
                    <>
                      <Route path="/mannagerClient" element={<Client />} />
                      <Route path="/mannagerStaff" element={<Staff />} />
                      <Route path="/mannagerSalary" element={<Salary />} />
                      <Route path="/mannagerRevenue" element={<Revenue />} />
                      <Route path="/mannagerProduct" element={<Product />} />
                      <Route
                        path="/mannagerTimekeeping"
                        element={<TimeKeeping />}
                      />
                      <Route path="/mannagerMaterial" element={<Material />} />
                    </>
                  ) : (
                    <>
                      {location.pathname === "/mannagerClient" ||
                      location.pathname === "/mannagerStaff" ? (
                        <Route path="/*" element={<NoAccess />} />
                      ) : (
                        <Route path="/*" element={<NotFound />} />
                      )}
                    </>
                  )}
                  <Route path="/" element={<Table />} />
                  <Route path="/mannagerTable/:id" element={<ChoiProduct />} />
                  <Route path="/*" element={<NotFound />} />
                  {dataStaff?.grantPermisstion?.includes("KH") && (
                    <Route path="/mannagerClient" element={<Client />} />
                  )}
                  {dataStaff?.grantPermisstion?.includes("NV") && (
                    <Route path="/mannagerStaff" element={<Staff />} />
                  )}
                  {dataStaff?.grantPermisstion?.includes("L") && (
                    <Route path="/mannagerSalary" element={<Salary />} />
                  )}
                  {dataStaff?.grantPermisstion?.includes("DT") && (
                    <Route path="/mannagerRevenue" element={<Revenue />} />
                  )}
                  {dataStaff?.grantPermisstion?.includes("NL&SP") && (
                    <Route path="/mannagerProduct" element={<Product />} />
                  )}
                  {dataStaff?.grantPermisstion?.includes("NL&SP") && (
                    <Route path="/mannagerMaterial" element={<Material />} />
                  )}
                  {dataStaff?.grantPermisstion?.includes("CC") && (
                    <Route
                      path="/mannagerTimekeeping"
                      element={<TimeKeeping />}
                    />
                  )}

                  {role === "Quản lý" ||
                  dataStaff?.grantPermisstion?.includes("DT") ? (
                    <>
                      <Route
                        path="/revenue/doanh-thu-ngay"
                        element={<RevenueDay />}
                      />
                      <Route
                        path="/revenue/doanh-thu-thang"
                        element={<RevenueMonth />}
                      />
                      <Route
                        path="/revenue/doanh-thu-nam"
                        element={<RevenueYear />}
                      />
                      <Route
                        path="/mannagerTimekeeping/:month"
                        element={<TimeKeeping />}
                      />{" "}
                    </>
                  ) : (
                    ""
                  )}
                </Routes>
              </div>
            </div>
          ) : (
            <Routes>
              <Route path="/*" element={<Login />} />
            </Routes>
          )}
        </>
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
