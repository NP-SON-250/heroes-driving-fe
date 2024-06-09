import React from "react";
import { BsGear } from "react-icons/bs";
import { FcEditImage } from "react-icons/fc";
import { Link } from "react-router-dom";

const Profiles = () => {
  // Retrieve values from localStorage
  const fullname = localStorage.getItem("fullname") || "Full Name";
  const username = localStorage.getItem("username") || "username@example.com";

  return (
    <div className=" font-[Poppins] flex flex-col border border-gray rounded-md p-4 items-start w-72 bg-white shadow-lg outline-none">
      <div className=" font-[Poppins] flex flex-col">
        <h6 className=" font-[Poppins] text-[#006991] text-2xl font-semibold pb-2">
          {fullname}
        </h6>
        <p className=" font-[Poppins] text-base text-gray-600 text-center">
          {username}
        </p>
      </div>
      <Link to={"/profile/edit"}>
        <div className=" font-[Poppins] flex hover:bg-gray p-2 mt-5 w-[240px] rounded-md">
          <FcEditImage className=" font-[Poppins] text-4xl" />
          <p className=" font-[Poppins] text-base text-[#006991] p-2 cursor-pointer">
            Edit Profile
          </p>
        </div>
      </Link>
      <Link to={"/profile/settings"}>
        <div className=" font-[Poppins] flex hover:bg-gray p-2 mt-5 w-[240px] rounded-md">
          <BsGear className=" font-[Poppins] text-4xl text-black" />
          <p className=" font-[Poppins] text-base text-[#006991] p-2 cursor-pointer">
            Settings
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Profiles;
