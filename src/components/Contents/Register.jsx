import React, { useEffect, useRef, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { CiCircleCheck } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Name_regex = /^[a-zA-Z]+(?: [a-zA-Z]+){1,22}$/;
const User_regex =
  /^(078|072|073)\d{7}$|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const Pass_regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%]).{8,}$/;

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const nameRef = useRef();
  const userRef = useRef();
  const errRef = useRef();

  const [fullname, setFullname] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [username, setUsername] = useState("");
  const [validUser, setValidUser] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPass, setValidPass] = useState(false);
  const [passFocus, setPassFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(Name_regex.test(fullname));
  }, [fullname]);

  useEffect(() => {
    setValidUser(User_regex.test(username));
  }, [username]);

  useEffect(() => {
    setValidPass(Pass_regex.test(password));
  }, [password]);

  useEffect(() => {
    setErrMsg("");
  }, [fullname, username, password]);

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

  const failed = (message) => {
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
  const navigate = useNavigate();
  const handleInput = (event) => {
    const { name, value } = event.target;
    if (name === "fullname") setFullname(value);
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validName || !validUser || !validPass) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("username", username);
      formData.append("password", password);

      const response = await axios.post(
        "https://heroes-driving-be.onrender.com/api/v1/users/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        success(response.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error:", error);

      if (error.response) {
        failed(error.response.data.message);
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
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <Link to={"/"}>
          <div
            className=" font-[Poppins] bg-[#006991] w-10 h-10 rounded-full flex justify-center items-center ml-5"
            title="Ahabanza"
          >
            <p className=" font-[Poppins] text-white items-center text-center md:text-xl text-3xl">
              <AiOutlineArrowLeft />
            </p>
          </div>
        </Link>
        <div className=" font-[Poppins] lg:px-[24rem] md:px-[10rem] py-[0.5rem]">
          <form
            onSubmit={handleSubmit}
            data-aos="fade-up"
            className=" font-[Poppins] flex-1 flex flex-col gap-5 justify-center"
          >
            <h2 className=" font-[Poppins] text-2xl font-extrabold flex justify-center ">
              Hanga Konte 🙌
            </h2>
            <p className=" font-[Poppins] text-lg flex justify-center text-slate-600 ">
              Hanga Konte Kuri Heroes College
            </p>
            <label htmlFor="fullname" className=" font-[Poppins] ">
              <span className={validName ? "valid" : "hidden"}>
                <CiCircleCheck className=" font-[Poppins] bg-green-900 text-white rounded-full lg:w-4 lg:h-4 w-6 h-6  ml-10" />
              </span>
              <span className={validName || !fullname ? "hidden" : "invalid"}>
                <p>
                  Must include at least 6 characters and contain both first and
                  last names.
                </p>
              </span>
            </label>
            <input
              placeholder="Amazina Yawe Yombi"
              type="text"
              name="fullname"
              id="fullname"
              autoComplete="off"
              ref={nameRef}
              value={fullname}
              onChange={handleInput}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setNameFocus(true)}
              onBlur={() => setNameFocus(false)}
              className=" font-[Poppins] border border-slate-600 p-3 rounded-3xl "
            />
            <label htmlFor="username" className=" font-[Poppins] ">
              <span className={validUser ? "valid" : "hidden"}>
                <CiCircleCheck className=" font-[Poppins] bg-green-900 text-white rounded-full lg:w-4 lg:h-4 w-6 h-6  ml-10" />
              </span>
              <span className={validUser || !username ? "hidden" : "invalid"}>
                <p>
                  Must be a valid phone number starting with 078, 072, or 073,
                  or a valid email address.
                </p>
              </span>
            </label>
            <input
              type="text"
              name="username"
              placeholder="Emeri Cyangwa Phone"
              id="username"
              autoComplete="off"
              ref={userRef}
              value={username}
              onChange={handleInput}
              required
              aria-invalid={validUser ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              className=" font-[Poppins] border border-slate-600 p-3 rounded-3xl "
            />
            <label htmlFor="password" className=" font-[Poppins] ">
              <span className={validPass ? "valid" : "hidden"}>
                <CiCircleCheck className=" font-[Poppins] bg-green-900 text-white rounded-full lg:w-4 lg:h-4 w-6 h-6  ml-10" />
              </span>
              <span className={validPass || !password ? "hidden" : "invalid"}>
                <p>
                  Password must be at least 8 characters and include at least
                  one letter and one special character.
                </p>
              </span>
            </label>
            <input
              id="password"
              placeholder="Ijambo Banga"
              name="password"
              required
              value={password}
              onChange={handleInput}
              aria-invalid={validPass ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setPassFocus(true)}
              onBlur={() => setPassFocus(false)}
              type={showPassword ? "text" : "password"}
              className=" font-[Poppins] border border-slate-600 p-3 rounded-3xl "
            />
            {showPassword ? (
              <h6
                className=" font-[Poppins] flex text-[#006991] justify-center cursor-pointer w-20 lg:pl-[12rem] md:pl-[14rem] pl-[10rem] lg:text-sm md:text-3xl  font-gold"
                onClick={() => setShowPassword(!showPassword)}
                title="Hisha Ijambo Banga"
              >
                Hide
              </h6>
            ) : (
              <h6
                className=" font-[Poppins] flex text-[#006991] justify-center cursor-pointer w-20 lg:pl-[12rem] md:pl-[14rem] pl-[10rem] lg:text-sm md:text-3xl font-gold "
                onClick={() => setShowPassword(!showPassword)}
                title="Reba Ijambo Banga"
              >
                Show
              </h6>
            )}
            <button
              disabled={!validName || !validPass || !validUser}
              className={`btn self-start  bg-white text-dark_primary hover:bg-dark_primary hover:text-white lg:text-lg md:text-4xl text-2xl font-bold ${
                !validName || !validPass || !validUser
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
            >
              Iyandikishe
            </button>
            <p className=" font-[Poppins] text-lg flex justify-center ">
              Already have an account?
              <Link
                to={"/login"}
                className=" font-[Poppins] text-[#006991] hover:underline hover:text-[#E85973] pl-4"
              >
                Injira
              </Link>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
