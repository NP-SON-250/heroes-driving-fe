import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import {
  BsPersonCircle,
  BsSearch,
  BsJustify,
  BsChatText,
} from "react-icons/bs";
import Profiles from "./Profiles";
import Notifications from "./Notifications";

function Headers({ OpenSidebar, openSidebarToggle }) {
  const [searchVisible, setSearchVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const searchInputRef = useRef(null);
  const profileRef = useRef(null);
  const messageRef = useRef(null);

  const toggleSearchVisibility = (event) => {
    event.stopPropagation();
    setSearchVisible((prev) => !prev);
    setProfileVisible(false);
    setMessageVisible(false);
  };

  const toggleProfileVisibility = (event) => {
    event.stopPropagation();
    setProfileVisible((prev) => !prev);
    setSearchVisible(false);
    setMessageVisible(false);
  };

  const toggleMessageVisibility = (event) => {
    event.stopPropagation();
    setMessageVisible((prev) => !prev);
    setSearchVisible(false);
    setProfileVisible(false);
  };

  const handleClickOutside = (event) => {
    if (
      searchInputRef.current &&
      !searchInputRef.current.contains(event.target)
    ) {
      setSearchVisible(false);
    }
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setProfileVisible(false);
    }
    if (messageRef.current && !messageRef.current.contains(event.target)) {
      setMessageVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className=" font-[Poppins] fixed top-0 right-0 lg:left-[18.8rem] md:left-0 left-0 flex items-center justify-between px-8 h-16 shadow-2xl bg-gray-900 text-[#006991] z-30 bg-white">
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
      <div className=" font-[Poppins] relative">
        <BsSearch
          className=" font-[Poppins] text-3xl lg:text-2xl md:text-5xl cursor-pointer"
          onClick={toggleSearchVisibility}
        />
        {searchVisible && (
          <input
            ref={searchInputRef}
            type="search"
            name="name"
            id="name"
            className=" font-[Poppins] bg-[#d4d9da] border border-gray text-[#006991] rounded-full h-[50px] w-[340px] px-2 md:py-1 outline-none absolute top-12 md:left-0 -left-24"
            placeholder="Search..."
          />
        )}
      </div>
      <div className=" font-[Poppins] flex md:space-x-48 space-x-20 relative">
        <BsChatText
          className=" font-[Poppins] text-3xl lg:text-2xl md:text-5xl mt-1 cursor-pointer"
          onClick={toggleMessageVisibility}
        />
        {messageVisible && (
          <div
            ref={messageRef}
            className=" font-[Poppins] absolute top-12 -right-6"
          >
            <Notifications />
          </div>
        )}
        <div className=" font-[Poppins] relative">
          <BsPersonCircle
            className=" font-[Poppins] text-3xl lg:text-4xl md:text-5xl cursor-pointer"
            onClick={toggleProfileVisibility}
          />
          {profileVisible && (
            <div
              ref={profileRef}
              className=" font-[Poppins] absolute top-12 right-0"
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
