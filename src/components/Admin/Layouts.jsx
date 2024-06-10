import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebars from "./Sidebars/Sidebars";
import Headers from "./Sidebars/Headers";

const Layouts = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };
  return (
    <div className=" font-[Poppins] grid grid-cols-1 sm:grid-cols-4 h-screen">
      <Sidebars
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <div className=" font-[Poppins] sm:col-span-4 flex flex-col">
        <Headers
          OpenSidebar={OpenSidebar}
          openSidebarToggle={openSidebarToggle}
        />
        <main className=" font-[Poppins] flex-grow overflow-y-auto p-5 pt-20 lg:pl-[20rem]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layouts;
