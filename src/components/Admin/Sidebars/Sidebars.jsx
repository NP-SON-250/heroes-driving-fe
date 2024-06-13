import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "/Logo.png";
import { NavData } from "../../SharedComponents/Content";

function Sidebars({ openSidebarToggle }) {
  const location = useLocation();
  

  return (
    <aside
      className={`${
        openSidebarToggle ? "fixed" : "md:fixed hidden"
      } lg:block md:pt-10 pb-4 lg:pt-0 md:fixed sm:relative bg-white rounded-md shadow-2xl transition-all duration-500 lg:mt-0 md:mt-10 mt-14 lg:w-[300px] w-full lg:h-screen z-50`}
    >
      <div className="font-[Poppins] flex lg:justify-between justify-center items-center">
        <Link to={"/dashboard"}>
          <div className="font-[Poppins] flex items-center text-xl font-bold md:ml-0 -ml-[1.4rem] lg:flex gap-2">
            <img
              src={Logo}
              alt=""
              className="font-[Poppins] lg:h-[70px] h-[65px] md:h-[120px]"
            />
            <p className="font-[Poppins] ml-[-18px] lg:text-sm md:text-2xl text-lg text-[#006991]">
              Heroes driving
            </p>
          </div>
        </Link>
      </div>
      <ul className="font-[Poppins] lg:space-y-2 md:space-y-4 lg:pt-0 space-y-1 lg:px-4 md:px-20 px-4">
        {NavData.map((maper) => (
          <li
            key={maper.id}
            className={`hover:bg-gray p-2 lg:pl-2 rounded lg:w-full md:w-1/2 ${
              location.pathname === maper.link ? "bg-gray " : ""
            }`}
          >
            <Link to={maper.link}>
              <div className="font-[Poppins] flex items-center space-x-5">
                <div className="font-[Poppins] text-3xl md:text-5xl lg:text-3xl">
                  {maper.icon}
                </div>
                <div className="font-[Poppins] lg:text-2xl text-xl md:text-4xl">
                  {maper.text}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebars;
