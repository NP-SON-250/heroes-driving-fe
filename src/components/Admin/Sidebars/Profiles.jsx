import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsGear } from "react-icons/bs";
import { FcEditImage } from "react-icons/fc";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const Profiles = ({ onLogout }) => {
  const fullname = localStorage.getItem("fullname") || "Full Name";
  const username = localStorage.getItem("username") || "username@example.com";

  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    navigate("/");
    onLogout(); // Call the onLogout callback
  };

  return (
    <div className="font-[Poppins] flex flex-col border border-gray rounded-md p-4 items-center lg:w-96 md:w-[30rem] w-screen absolute -right-8 bg-white shadow-lg outline-none">
      <div className="font-[Poppins] flex flex-col">
        <h6 className="font-[Poppins] text-[#006991] text-2xl font-semibold pb-2">
          {fullname}
        </h6>
        <p className="font-[Poppins] text-base text-gray-600 text-center">
          {username}
        </p>
      </div>
      <Link to={"/profile/edit"}>
        <div className="font-[Poppins] flex hover:bg-gray p-2 mt-5 w-[240px] rounded-md">
          <FcEditImage className="font-[Poppins] text-4xl" />
          <p className="font-[Poppins] text-base text-[#006991] p-2 cursor-pointer">
            Edit Profile
          </p>
        </div>
      </Link>
      <Link to={"/profile/settings"}>
        <div className="font-[Poppins] flex hover:bg-gray p-2 mt-5 w-[240px] rounded-md">
          <BsGear className="font-[Poppins] text-4xl text-black" />
          <p className="font-[Poppins] text-base text-[#006991] p-2 cursor-pointer">
            Settings
          </p>
        </div>
      </Link>
      <div className="font-[Poppins] lg:pt-2 md:pt-2 pb-4">
        <button
          onClick={handleLogout}
          className="font-[Poppins] flex hover:bg-gray p-2 gap-1 mt-5 w-[240px] rounded-md"
        >
          <FiLogOut className="lg:text-4xl text-3xl space-x-6 md:text-5xl" />{" "}
          <p className="font-[Poppins] text-base text-[#006991] p-2 cursor-pointer">Logout</p>
        </button>
      </div>
    </div>
  );
};

export default Profiles;
