import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "/Logo.png";
import Button from "../Buttons/Button";
import { FaAlignJustify } from "react-icons/fa6";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import Profiles from "../Admin/Sidebars/Profiles";

const Links = [
  { name: "ahabanza", link: "/", title: "Home" },
  { name: "ibizamini", link: "/paidexams" },
  { name: "amakuru", link: "/blogs" },
  { name: "sobanuza", link: "/questions" },
];

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [token, setToken] = useState(null);
  const profileRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

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

  const handleLinkClick = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <div className="font-[Poppins] shadow-md w-full fixed top-0 left-0 z-50">
      <div className="font-[Poppins] lg:flex items-center justify-around bg-white py-0">
        <Link to="/">
          <div
            className="font-[Poppins] cursor-pointer flex items-center"
            title="Heroes Logo"
          >
            <img
              src={Logo}
              alt="Heroes Logo"
              className="font-[Poppins] lg:h-[70px] h-[90px] md:h-[120px]"
            />
            <p className="font-[Poppins] ml-[-15px] font-bold lg:text-xl md:text-4xl text-2xl lg:block hidden">
              Heroes College
            </p>
          </div>
        </Link>
        <div
          onClick={() => setOpen(!open)}
          className="font-[Poppins] text-3xl absolute right-4 md:top-12 top-8 cursor-pointer lg:hidden"
        >
          {open ? (
            <AiOutlineClose title="close" />
          ) : (
            <FaAlignJustify title="menu" />
          )}
        </div>
        <ul
          className={`lg:flex lg:items-center lg:pb-0 pb-12 absolute lg:static lg:border-0 lg:rounded-none lg:shadow-none border border-gray rounded-md shadow-lg bg-white lg:z-auto z-[-1] right-0 lg:w-auto w-full text-center gap-10 lg:mr-12 ${
            open ? "top-20" : "top-[-490px]"
          }`}
        >
          {Links.map((maper) => (
            <li
              key={maper.name}
              className={`lg:ml-12 font-medium lg:text-lg md:text-4xl text-2xl capitalize lg:my-0 my-7 lg:pt-0 md:pt-5 md:pb-5 lg:pb-0 ${
                location.pathname === maper.link
                  ? "underline text-[#006991]"
                  : ""
              }`}
            >
              <Link
                to={maper.link}
                className="font-[Poppins] hover:text-[#006991] duration-500"
                onClick={handleLinkClick}
              >
                {maper.name}
              </Link>
            </li>
          ))}
        </ul>
        {token ? (
          <div className="font-[Poppins] relative flex justify-center items-center">
            <BsPersonCircle
              className="font-[Poppins] text-4xl lg:text-4xl md:text-5xl cursor-pointer lg:relative lg:top-0 absolute  bottom-6"
              onClick={toggleProfileVisibility}
            />
            {profileVisible && (
              <div
                ref={profileRef}
                className="font-[Poppins] absolute lg:top-[3.3rem] lg:right-0 md:top-0 md:right-[12rem] right-8"
              >
                <Profiles onLogout={handleLogout} />
              </div>
            )}
          </div>
        ) : (
          <div className="absolute md:right-[20rem] right-24 lg:top-3 lg:right-0 bottom-4">
            <Link to={"/login"}>
              <Button onClick={handleLinkClick}>Injira</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
