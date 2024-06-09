import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "/Logo.png";
import { FiLogOut } from "react-icons/fi";
import { NavData } from "../../../../../fe/componentsss/SharedComponents/Content";

function Sidebars({ openSidebarToggle }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/"); 
  };

  return (
    <aside
      className={`${
        openSidebarToggle ? "fixed" : "md:fixed hidden"
      } lg:block md:pt-10 pb-4 lg:pt-0 md:fixed sm:relative bg-white rounded-md shadow-2xl transition-all duration-500 lg:mt-0 md:mt-10 mt-10 lg:w-[300px] w-full lg:h-screen z-50`}
    >
      <div className="font-[Poppins] flex lg:justify-between justify-center items-center p-4 gap-4">
        <Link to={"/dashboard"}>
          <div className="font-[Poppins] flex items-center text-2xl font-bold md:ml-0 -ml-[1.4rem] lg:flex">
            <img
              src={Logo}
              alt=""
              className="font-[Poppins] lg:h-[70px] h-[90px] md:h-[120px]"
            />
            <p className="font-[Poppins] ml-[-18px] lg:text-sm md:text-2xl text-sm text-[#006991]">
              Heroes driving
            </p>
          </div>
        </Link>
      </div>
      <ul className="font-[Poppins] lg:space-y-2 md:space-y-4 lg:pt-0 space-y-3 lg:px-4 md:px-20 px-4">
        {NavData.map((maper) => (
          <li
            key={maper.id}
            className={`hover:bg-gray p-2 lg:pl-2 rounded lg:w-full md:w-1/2 ${
              location.pathname === maper.link ? "bg-gray " : ""
            }`}
          >
            <Link to={maper.link}>
              <div className="font-[Poppins] flex items-center space-x-5">
                <div className="font-[Poppins] text-4xl md:text-5xl lg:text-3xl">
                  {maper.icon}
                </div>
                <div className="font-[Poppins] lg:text-2xl text-2xl md:text-4xl">
                  {maper.text}
                </div>
              </div>
            </Link>
          </li>
        ))}
        
        <div className="font-[Poppins] lg:pt-20 pt-6 md:pt-20 pb-4">
          <button
            onClick={handleLogout}
            className="font-[Poppins] hover:bg-gray p-2 lg:pl-2 rounded flex items-center space-x-2 lg:text-2xl md:text-4xl text-2xl lg:w-full md:w-1/2"
          >
            <FiLogOut className="font-[Poppins] lg:text-4xl text-4xl space-x-6 md:text-5xl" />{" "}
            Logout
          </button>
        </div>
      </ul>
    </aside>
  );
}

export default Sidebars;
