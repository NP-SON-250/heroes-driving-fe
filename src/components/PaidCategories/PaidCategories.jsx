import React, { useState, useEffect } from "react";
import { Labels, Title, SubTitle } from "../SharedComponents/Inputs";
import { AiOutlineClose } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "antd";
import Loader from "../SharedComponents/Loader";
import Hello from "../Hello/Hello";

const PaidCategories = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categoriesData, setCategoriesData] = useState([]);

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

  useEffect(() => {
    getCategoriesData();
  }, []);

  const getCategoriesData = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      // Handle scenario where token is not present (user is logged out)
      setIsLoading(false);
      setCategoriesData([]); // Clear any existing data
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:9000/api/v1/categories/all/paid",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data;
      setCategoriesData(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  {
    /*============ Recording payment for selected category =======*/
  }
  const [payment, setPayment] = useState({
    phone: "",
    names: "",
  });
  const handleInputPayment = (event) => {
    if (event.target.name === "profile") {
      setExam({ ...payment, profile: event.target.files[0] });
    } else {
      setExam({ ...payment, [event.target.name]: event.target.value });
    }
  };
  const [categoryId, setCategoryId] = useState([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  function getSingleCategoryTo(id) {
    axios
      .get(`http://localhost:9000/api/v1/categories/single/${id}`)
      .then((res) => setCategoryId(res.data.data))
      .catch((err) => console.log(err));
  }
  const handleSubmitExa = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("phone", exam.phone);
    formData.append("names", exam.names);
    const token = localStorage.getItem("token");

    if (!token) {
      errors("Login first!!");
    } else {
      try {
        const response = await axios.post(
          `http://localhost:9000/api/v1/payments/${categoryId._id}`,
          formData,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200 || response.status === 201) {
          console.log(response.data);
          success(response.data.message);
          getCategoriesData();
          setTimeout(() => {
            setIsPaymentModalOpen(false);
          }, 2000);
        } else {
          errors(response.data.message);
          console.log(response.data.message);
          setTimeout(() => {}, 2000);
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
    }
  };
  const showPaymentModal = () => {
    setIsPaymentModalOpen(true);
  };
  const handlePaymentOk = (event) => {
    event.preventDefault();
    handleSubmitExa(event);
  };
  const handlePaymentCancel = () => {
    setIsPaymentModalOpen(false);
  };
  return (
    <>
      <div className="font-[Poppins] pt-10">
        <Hello />
        {isLoading && <Loader />}
        <section id="services">
          <div className="font-[Poppins] md:container px-0 py-8 flex flex-col justify-center items-center">
            <div className="flex justify-center items-center">
              <p className="font-[Poppins] md:text-2xl text-lg font-extrabold">
                Hitemo umubare wibizamini.
              </p>
            </div>
            <div className="font-[Poppins] grid md:grid-cols-2 gap-4 pt-4">
              {categoriesData.length > 0 ? (
                categoriesData.map((category, id) => (
                  <div
                    key={id}
                    data-aos="fade-up"
                    data-aos-delay={id * 600}
                    className=" font-[Poppins] min-w-[14rem] duration-300 border-2 cursor-pointer border-slate-200 rounded-md text-center bg-bg_light_primary p-6 group-hover:blur-sm hover:!blur-none"
                    onClick={(e) => {
                      getSingleCategoryTo(category._id);
                      showPaymentModal();
                    }}
                  >
                    <p className=" font-[Poppins] text-base font-extrabold pt-2">
                      Ibizamini {category.examsNumber}
                    </p>
                    <p className=" font-[Poppins] text-base pt-2 ">
                      {category.amount} Rwf
                    </p>
                    <p className=" font-[Poppins] text-base pt-2 ">
                      Iminsi {category.duration}
                    </p>
                  </div>
                ))
              ) : !isLoading ? (
                <p className="text-xl font-extrabold">Banza winjire......</p>
              ) : null}
            </div>
          </div>
        </section>

        {/* ======Add payment for selected category======= */}
        <div>
          <Modal
            style={{
              top: 100,
            }}
            open={isPaymentModalOpen}
            onOk={handlePaymentOk}
            onCancel={handlePaymentCancel}
          >
            <div
              className=" font-[Poppins] absolute lg:top-[12px] lg:right-[12px] md:right-1 md:top-1 top-3 right-3 md:w-12 lg:w-8 lg:h-8 md:h-12 w-8 h-8 bg-[#006991] rounded-full flex justify-center items-center cursor-pointer"
              onClick={handlePaymentCancel}
            >
              <AiOutlineClose className=" font-[Poppins] lg:text-base md:text-xl text-xl text-black" />
            </div>
            <div className=" font-[Poppins]">
              <form action="#" onSubmit={handleSubmitExa}>
                <div className=" font-[Poppins] flex flex-col lg:justify-center items-center">
                  <Title TitleValue="Kwishyura 🙌" />
                  <SubTitle SubTitleValue="Menyekanisha ubwishyu bwawe" />
                </div>
                <div className=" font-[Poppins] ">
                  <div>
                    <Labels Label="Telefoni" />
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      placeholder="Nimero ya telefoni wakoresheje wishyura"
                      className=" font-[Poppins] text-[#006991] w-full lg:text-base
                      md:text-3xl border border-slate-600 
                      lg:p-2 md:p-4 p-2 mt-1 rounded-md 
                      "
                      onChange={handleInputPayment}
                    />
                  </div>

                  <div>
                    <Labels Label="Amazina" />
                    <input
                      type="text"
                      id="amazina"
                      name="amazina"
                      placeholder="Amazina ibaruyeho"
                      className=" font-[Poppins] text-[#006991] w-full lg:text-base
                      md:text-3xl border border-slate-600 
                      lg:p-2 md:p-4 p-2 mt-1 rounded-md 
                      "
                      onChange={handleInputPayment}
                    />
                  </div>
                </div>
              </form>
            </div>
          </Modal>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default PaidCategories;
