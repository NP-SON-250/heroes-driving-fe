import React from "react";
import { GoPlus } from "react-icons/go";

const Saverbutton = ({ buttonText, onClick, disabled, name }) => {
  return (
    <div className=" font-[Poppins] flex justify-between items-center cursor-pointer bg-[#006991] p-2 lg:w-44 md:w-48 w-32 rounded-md mt-10 mb-4">
      <button
        className=" font-[Poppins] text-white  lg:text-xl md:text-3xl"
        onClick={onClick}
        disabled={disabled}
        name={name}
      >
        {buttonText}
      </button>
      <GoPlus className=" font-[Poppins] bg-white text-[#006991] rounded-full lg:text-xl md:text-3xl" />
    </div>
  );
};

export default Saverbutton;
