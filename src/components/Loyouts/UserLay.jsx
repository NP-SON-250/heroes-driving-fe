import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Navbar/NavBar";
import Footer from "../Footer/Footer";
import Hello from "../Hello/Hello";

const UserLay = () => {
  return (
    <>
      <div className='bg-[url("assets/Cargiff.gif")] h-[80vh] bg-center bg-cover'>
        <NavBar />
        <div className=" font-[Poppins] absolute top-24 left-0">
          <Hello />
        </div>
      </div>
      <Outlet />
      <Footer />
    </>
  );
};

export default UserLay;
