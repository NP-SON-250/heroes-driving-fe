import React from "react";
const Button = (props) => {
  return (
    <button className=" font-[Poppins] btn self-start  bg-white text-dark_primary hover:bg-dark_primary hover:text-white lg:text-lg md:text-4xl text-2xl font-bold">
      {props.children}
    </button>
  );
};

export default Button;
