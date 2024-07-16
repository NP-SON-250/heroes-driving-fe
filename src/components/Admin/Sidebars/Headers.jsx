import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsPersonCircle, BsJustify, BsChatText } from "react-icons/bs";
import Profiles from "./Profiles";
import axios from "axios";
import { Link } from "react-router-dom";
function Headers({ OpenSidebar, openSidebarToggle }) {
  const [profileVisible, setProfileVisible] = useState(false);
  const profileRef = useRef(null);

  const toggleProfileVisibility = (event) => {
    event.stopPropagation();
    setProfileVisible((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setProfileVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // ============= Fetch notifications =================
  const [notifyData, setNotifyData] = useState([]);

  useEffect(() => {
    getNotifyData();
  }, []);

  const getNotifyData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "https://heroes-driving-be.onrender.com/api/v1/notifications/notify",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data;
      setNotifyData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <header className=" font-[Poppins] fixed top-0 right-0 lg:left-[18.8rem] md:left-0 left-0 flex items-center lg:justify-end justify-between px-8 h-16 shadow-2xl bg-gray-900 text-[#006991] z-30 bg-white">
      <div className=" font-[Poppins] lg:hidden">
        {openSidebarToggle ? (
          <AiOutlineClose
            className=" font-[Poppins] text-3xl md:text-5xl cursor-pointer"
            onClick={OpenSidebar}
          />
        ) : (
          <BsJustify
            className=" font-[Poppins] text-3xl md:text-5xl cursor-pointer"
            onClick={OpenSidebar}
          />
        )}
      </div>
      <div className=" font-[Poppins] flex md:space-x-48 space-x-12 relative">
        <div className="flex cursor-pointer">
          <Link to={"/admins/nitifications"}>
            <BsChatText className=" font-[Poppins] text-3xl lg:text-2xl md:text-5xl lg:mt-1 md:mt-0 mt-1" />
            {notifyData.length > 0 && (
              <div className=" bg-[#006991] rounded-full lg:w-4 lg:h-4 md:w-7 md:h-7  w-5 h-5 flex justify-center items-center p-1 absolute lg:left-3 left-5 top-0">
                <p className="text-white lg:text-xs md:text-xl text-base">
                  {notifyData.length}
                </p>
              </div>
            )}
          </Link>
        </div>
        <div className=" font-[Poppins] relative">
          <BsPersonCircle
            className=" font-[Poppins] text-3xl lg:text-4xl md:text-5xl cursor-pointer"
            onClick={toggleProfileVisibility}
          />
          {profileVisible && (
            <div
              ref={profileRef}
              className=" font-[Poppins] absolute lg:top-12 md:top-14 top-12 right-0"
            >
              <Profiles />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Headers;
