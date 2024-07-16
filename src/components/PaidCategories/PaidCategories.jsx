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
  const [selectedCategoryAmount, setSelectedCategoryAmount] = useState(null);

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
      setIsLoading(false);
      setCategoriesData([]);
      return;
    }

    try {
      const response = await axios.get(
        "https://heroes-driving-be.onrender.com/api/v1/categories/all/paid",
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

  const [payment, setPayment] = useState({
    phone: "",
    names: "",
  });

  const handleInputPayment = (event) => {
    if (event.target.name === "profile") {
      setPayment({ ...payment, profile: event.target.files[0] });
    } else {
      setPayment({ ...payment, [event.target.name]: event.target.value });
    }
  };

  const [categoryId, setCategoryId] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  function getSingleCategoryTo(id) {
    axios
      .get(
        `https://heroes-driving-be.onrender.com/api/v1/categories/single/${id}`
      )
      .then((res) => {
        setCategoryId(res.data.data);
        setSelectedCategoryAmount(res.data.data.amount); // Update the selected category amount
      })
      .catch((err) => console.log(err));
  }

  const handleSubmitPay = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("phone", payment.phone);
    formData.append("names", payment.names);
    const token = localStorage.getItem("token");

    if (!token) {
      errors("Login first!!");
    } else {
      try {
        const response = await axios.post(
          `https://heroes-driving-be.onrender.com/api/v1/payments/${categoryId._id}`,
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
    handleSubmitPay(event);
  };

  const handlePaymentCancel = () => {
    setIsPaymentModalOpen(false);
  };

  return (
    <>
      <div className="font-[Poppins] pt-0">
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
                    className="font-[Poppins] min-w-[14rem] duration-300 border-2 cursor-pointer border-slate-200 rounded-md text-center bg-bg_light_primary p-6 group-hover:blur-sm hover:!blur-none"
                    onClick={(e) => {
                      getSingleCategoryTo(category._id);
                      showPaymentModal();
                    }}
                  >
                    <p className="font-[Poppins] text-base font-extrabold pt-2">
                      Ibizamini {category.examsNumber}
                    </p>
                    <p className="font-[Poppins] text-base pt-2">
                      {category.amount} Rwf
                    </p>
                    <p className="font-[Poppins] text-base pt-2">
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
              className="font-[Poppins] absolute lg:top-[12px] lg:right-[12px] md:right-1 md:top-1 top-3 right-3 md:w-12 lg:w-8 lg:h-8 md:h-12 w-8 h-8 bg-[#006991] rounded-full flex justify-center items-center cursor-pointer"
              onClick={handlePaymentCancel}
            >
              <AiOutlineClose className="font-[Poppins] lg:text-base md:text-xl text-xl text-black" />
            </div>
            <div className="font-[Poppins]">
              <form action="#" onSubmit={handleSubmitPay}>
                <div className="font-[Poppins] flex flex-col lg:justify-center items-center">
                  <Title TitleValue="Kwishyura 🙌" />
                  <div className="flex justify-center items-center">
                    <div className="mt-10 md:max-w-[29rem] max-w-[18rem] border-slate-200 rounded-md text-center border-2 bg-bg_light_primary p-4 group-hover:blur-sm hover:!blur-none">
                      <h6 className="flex flex-col justify-center items-center gap-4 text-base font-[Poppins]">
                        Uburyo wishyura, Kanda:{" "}
                        <span className="md:text-xl text-sm font-extrabold font-[Poppins]">
                          * 182 * 8 * 1 * 637915 * {selectedCategoryAmount} *
                          PIN #
                        </span>
                      </h6>
                    </div>
                  </div>
                  <SubTitle SubTitleValue="Menyekanisha ubwishyu bwawe" />
                </div>
                <div className="font-[Poppins]">
                  <div>
                    <Labels Label="Telefoni" />
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      placeholder="Nimero ya telefoni wakoresheje wishyura"
                      className="font-[Poppins] text-[#006991] w-full lg:text-base md:text-3xl border border-slate-600 lg:p-2 md:p-4 p-2 mt-1 rounded-md"
                      onChange={handleInputPayment}
                    />
                  </div>

                  <div>
                    <Labels Label="Amazina" />
                    <input
                      type="text"
                      id="names"
                      name="names"
                      placeholder="Amazina ibaruyeho"
                      className="font-[Poppins] text-[#006991] w-full lg:text-base md:text-3xl border border-slate-600 lg:p-2 md:p-4 p-2 mt-1 rounded-md"
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
