import React from "react";
const Heading = () => {
  return (
    <div className=" font-[Poppins] ml-10 lg:pt-10 md:pt-32  pt-16 flex justify-center">
      <div>
        <h2 className=" font-[Poppins] lg:text-xl md:text-2xl text-xl font-extrabold md:text-[#06223F] text-white lg:pt-5 md:pt-10 pt-2 ">
          Ongera ubumenyi bwawe mu mategeko y’umuhanda na <br />
          <span className=" font-[Poppins] text-[#D2691E]">
            {" "}
            Heroes College
          </span>
        </h2>
        <h3 className=" font-[Poppins] lg:text-lg md:text-xl text-lg font-bold lg:pt-5 md:pt-10 pt-2 pb-10  ">
          Wemererw gukora imyitozo 3 yambere kubuntu, Nyuma <br />
          guhabwa uburenganzira bigusaba kugura kode.
        </h3>
      </div>
    </div>
  );
};

export default Heading;
