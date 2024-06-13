import React from "react";
import { NotificationData } from "../../SharedComponents/Content";
import { useLocation } from "react-router-dom";
const Notifications = () => {
  const location = useLocation();
  return (
    <div className=" font-[Poppins] flex flex-col border border-gray rounded-md p-4 items-center lg:w-[450px] md:w-[370px] w-screen absolute -right-2 bg-white shadow-lg overflow-y-visible">
      <div className=" font-[Poppins] grid grid-cols-2 gap-5 p-4">
        <h3 className=" font-[Poppins] text-gray text-2xl">Notifications</h3>
        <p className=" font-[Poppins] text-xl font-bold mt-1 ml-16">New</p>
      </div>
      <ul className=" font-[Poppins] space-y-4 px-4">
        {NotificationData.map((maper) => (
          <li
            key={maper.id}
            className={`hover:bg-gray p-2 rounded cursor-pointer`}
          >
            <div className=" font-[Poppins] flex items-center space-x-2">
              <div className=" font-[Poppins] text-4xl">
                <img
                  src={maper.profile}
                  alt="Profile"
                  className=" font-[Poppins] rounded-full w-[30px] h-[30px]"
                />
              </div>
              <div className=" font-[Poppins] lg:text-xl text-2xl font-bold text-slate-900">
                {maper.name}
              </div>
            </div>
            <p className=" font-[Poppins] text-[#006991] text-base">
              {maper.message}
            </p>
            <p className=" font-[Poppins] text-xl lg:pl-24 pl-10">
              {maper.time}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
