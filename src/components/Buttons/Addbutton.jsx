import React from "react";
import { GoPlus } from "react-icons/go";

const Addbutton = ({ onClick }) => {
  return (
    <div
      className=" font-[Poppins] flex justify-between items-center cursor-pointer bg-[#006991] p-2 lg:w-28 md:w-44 w-28 rounded-md"
      onClick={onClick}
    >
      <button className=" font-[Poppins] text-white  lg:text-xl md:text-3xl">
        Exam
      </button>
      <GoPlus className=" font-[Poppins] bg-white text-[#006991] rounded-full lg:text-xl md:text-3xl" />
    </div>
  );
};

export default Addbutton;
