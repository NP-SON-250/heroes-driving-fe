import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "/Logo.png";
import Button from "../Buttons/Button";
import { FaAlignJustify } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";

const Links = [
  { name: "ahabanza", link: "/", title: "Home" },
  { name: "ibizamini", link: "/paidexams" },
  { name: "amakuru", link: "/blogs" },
  { name: "sobanuza", link: "/questions" },
];

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
  };

  return (
    <div className="font-[Poppins] shadow-md w-full fixed top-0 left-0 z-50">
      <div className="font-[Poppins] lg:flex items-center justify-around bg-white py-0">
        <Link to="/">
          <div
            className="font-[Poppins] cursor-pointer flex items-center lg:ml-0 md:ml-[12rem]"
            title="Heroes Logo"
          >
            <img
              src={Logo}
              alt="Heroes Logo"
              className="font-[Poppins] lg:h-[70px] h-[90px] md:h-[120px]"
            />
            <p className="font-[Poppins] ml-[-15px] font-bold lg:text-xl md:text-4xl text-2xl">
              Heroes driving
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
          className={`lg:flex lg:items-center lg:pb-0 pb-12 absolute lg:static bg-white lg:z-auto z-[-1] right-0 lg:w-auto w-full text-center gap-10 ${
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
              >
                {maper.name}
              </Link>
            </li>
          ))}
          {token ? (
            <button
              onClick={handleLogout}
              className="font-[Poppins] btn self-start  bg-white text-dark_primary hover:bg-dark_primary hover:text-white lg:text-lg md:text-4xl text-2xl font-bold"
            >
              Sohoka
            </button>
          ) : (
            <Link to={"/login"}>
              <Button>Injira</Button>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
