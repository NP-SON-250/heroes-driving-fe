import React from "react";
import Heading from "../SharedComponents/Heading";
import { Link } from "react-router-dom";
import Button from "../Buttons/Button";
const Hello = () => {
  return (
    <>
      <div className=" font-[Poppins] ">
        <Heading />
        <div className=" font-[Poppins] flex col-1 justify-center">
          <Link to={"/getcode"}>
            <Button>Gura kode</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Hello;
