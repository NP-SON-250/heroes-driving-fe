import React from "react";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

const LoginRegisterLayt = () => {
  return (
    <div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default LoginRegisterLayt;
