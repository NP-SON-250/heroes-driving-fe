import React from "react";
import Heading from "../SharedComponents/Heading";
import { Link } from "react-router-dom";
import Button from "../Buttons/Button";
const Hello = () => {
  return (
    <>
      <div className='bg-[url("assets/space.webp")] bg-center bg-cover'>
        <Heading />
        <div className=" font-[Poppins] flex col-1 justify-center pb-6">
          <Link to={"/categories"}>
            <Button>Gura kode</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Hello;
