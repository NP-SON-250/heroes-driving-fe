import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Navbar/NavBar";
import Footer from "../Footer/Footer";

const UserLay = () => {
  return (
    <>
      <div className=" pt-10">
        <NavBar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default UserLay;
