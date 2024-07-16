import React, { useState } from "react";
import Button from "../Buttons/Button";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const errors = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const success = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleApi = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "https://heroes-driving-be.onrender.com/api/v1/users/auth",
        {
          username: username,
          password: password,
        }
      );
      const userId = result.data.data._id;
      console.log("User ID:", userId);
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("id", userId);
      localStorage.setItem("fullname", result.data.data.fullname);
      localStorage.setItem("username", result.data.data.username);
      localStorage.setItem("role", result.data.data.role);

      console.log("token:", result.data.token);
      const role = result.data.data.role;
      if (role === "admin") {
        success(result.data.message);
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        success(result.data.message);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        errors(error.response.data.message);
      } else if (error.request) {
        console.error("No Response from Server");
      } else {
        console.error("Request Setup Error:", error.message);
      }
    }
  };

  return (
    <>
      <div className=" font-[Poppins] md:pt-32 lg:pt-8 lg:pb-5 pb-12 p-5">
        <Link to={"/"}>
          <div
            className=" font-[Poppins] bg-[#006991] lg:w-10 md:w-20 w-10 lg:h-10 md:h-20 h-10 rounded-full flex justify-center items-center ml-5"
            title="Ahabanza"
          >
            <p className=" font-[Poppins] text-white items-center text-center lg:text-xl text-3xl">
              <AiOutlineArrowLeft />
            </p>
          </div>
        </Link>
        <div className=" font-[Poppins] lg:px-[24rem] md:px-[10rem] py-[0.5rem]">
          <form
            onSubmit={handleApi}
            data-aos="fade-up"
            className=" font-[Poppins] flex-1 flex flex-col gap-5 justify-center"
          >
            <h6 className=" font-[Poppins] text-2xl font-extrabold flex justify-center ">
              Injira 🙌
            </h6>
            <p className=" font-[Poppins] text-lg flex justify-center text-slate-600 ">
              Injira Muri Account Yawe
            </p>
            <input
              type="text"
              name="from_name"
              placeholder="Andika Emeri Cyangwa Phone"
              required
              onChange={handleUsername}
              className=" font-[Poppins] border border-slate-600 p-3 rounded-3xl "
            />
            <input
              id="password"
              placeholder="Ijambo Banga"
              required
              onChange={handlePassword}
              type={showPassword ? "text" : "password"}
              className=" font-[Poppins] border border-slate-600 p-3 rounded-3xl "
            />
            {showPassword ? (
              <h6
                className=" font-[Poppins] flex text-[#006991] justify-center cursor-pointer w-20 lg:pl-[12rem] md:pl-[14rem] pl-[10rem] lg:text-sm md:text-xl text-base  font-gold"
                onClick={() => setShowPassword(!showPassword)}
                title="Hisha Ijambo Banga"
              >
                Hide
              </h6>
            ) : (
              <h6
                className=" font-[Poppins] flex text-[#006991] justify-center cursor-pointer w-20 lg:pl-[12rem] md:pl-[14rem] pl-[10rem] lg:text-sm md:text-xl text-base font-gold "
                onClick={() => setShowPassword(!showPassword)}
                title="Reba Ijambo Banga"
              >
                Show
              </h6>
            )}
            <p className=" font-[Poppins] flex justify-center lg:text-sm md:text-xl text-base ">
              {" "}
              Wibagiwe Ijambo Banga,{" "}
              <span className=" font-[Poppins] text-[#006991] hover:text-[#D2691E] pl-1 ">
                <Link to={"/reset-password"}>Rihindure</Link>
              </span>
            </p>
            <Button type="submit">Injira</Button>
            <p className=" font-[Poppins] flex justify-center lg:text-sm md:text-xl text-base ">
              {" "}
              Niba Nta Konti Ufite,{" "}
              <span className=" font-[Poppins] text-[#006991] hover:text-[#D2691E] pl-2 ">
                <Link to={"/register"}>Iyandikishe</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
