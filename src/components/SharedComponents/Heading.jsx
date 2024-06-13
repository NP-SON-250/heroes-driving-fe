import React from "react";
const Heading = () => {
  return (
    <div className=" font-[Poppins] lg:pl-[20rem] md:pl-24 pl-3 lg:pt-10 md:pt-32  pt-16 flex justify-center">
      <div>
        <h1 className=" font-[Poppins] lg:text-xl md:text-2xl text-xl font-extrabold text-white  uppercase underline ">
          Ongera Ubumenyi Bwawe:
        </h1>
        <h2 className=" font-[Poppins] lg:text-xl md:text-2xl text-xl font-extrabold text-[#D1D5DB] lg:pt-5 md:pt-10 pt-2 ">
          Ongera ubumenyi bwawe mu mategeko y’umuhanda na{" "}
          <span className=" font-[Poppins] text-[#D2691E]">
            {" "}
            Heroes Driving
          </span>
        </h2>
        <h3 className=" font-[Poppins] lg:text-lg md:text-xl text-lg font-bold lg:pt-5 md:pt-10 pt-2 text-white ">
          Umenye niba witeguye gukora ikizamini cy’amategeko y’umuhanda.
        </h3>
        <h4 className=" font-[Poppins] lg:text-xl md:text-3xl text-xl font-extrabold text-[#D1D5DB] lg:pt-5 md:pt-10 pt-2 pb-5 ">
          Inshuro yambere ni Ubuntu, Guhabwa uburenganzira kubindi birasaba ko
          ugura <br />
          kode ifite ibizamini bitandukanye
        </h4>
      </div>
    </div>
  );
};

export default Heading;
