import React, { useState, useEffect } from "react";
import Footer from "../../Footer/Footer";
import Addbutton from "../../Buttons/Addbutton";
import { Title, SubTitle, Labels } from "../../SharedComponents/Inputs";
import { AiOutlineClose } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { GoPlus } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { Modal, Popconfirm } from "antd";
import Loader from "../../SharedComponents/Loader";

const AdminCategories = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [categories, setCategories] = useState({
    examsNumber: "",
    amount: "",
    duration: "",
    type: "",
  });

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
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

  const handleInput = (event) => {
    const { name, value } = event.target;
    setCategories({ ...categories, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("examsNumber", categories.examsNumber);
    formData.append("amount", categories.amount);
    formData.append("duration", categories.duration);
    formData.append("type", categories.type);

    const token = localStorage.getItem("token");

    if (!token) {
      errors("Login first!!");
      return;
    }

    try {
      const response = await axios.post(
        `https://heroes-driving-be.onrender.com/api/v1/categories/record`,
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
        setTimeout(() => {
          setIsPopupVisible(false);
          getCategoriesData();
        }, 2000);
      } else {
        errors(response.data.message);
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
  };

  // ============= fetching Category =================
  const [categoriesData, setCategoriesData] = useState([]);
  useEffect(() => {
    getCategoriesData();
  }, []);

  const getCategoriesData = async () => {
    setIsLoading(true); // Set loading to true when fetching data
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "https://heroes-driving-be.onrender.com/api/v1/categories/all",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data;
      setCategoriesData(data);
      setIsLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false); // Set loading to false in case of error
    }
  };

  // ================== delete Category =====================
  async function handleDeleteCategory(id) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `https://heroes-driving-be.onrender.com/api/v1/categories/delete/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      success(response.data.message);
      getCategoriesData();
    } catch (err) {
      console.error(err);
    }
  }

  // ============ Edit Category =========

  const [categoryDataEdit, setCategoryDataEdit] = useState({
    examsNumber: "",
    amount: "",
    duration: "",
    type: "",
  });
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  function getSingleCategory(id) {
    axios
      .get(
        `https://heroes-driving-be.onrender.com/api/v1/categories/single/${id}`
      )
      .then((res) => setCategoryDataEdit(res.data.data))
      .catch((err) => console.log(err));
  }

  const handleCategoryUpdate = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("examsNumber", categoryDataEdit.examsNumber);
    formData.append("amount", categoryDataEdit.amount);
    formData.append("duration", categoryDataEdit.duration);
    formData.append("type", categoryDataEdit.type);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `https://heroes-driving-be.onrender.com/api/v1/categories/update/${categoryDataEdit._id}`,
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
          setIsCategoryModalOpen(false);
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

  const showCategoryModal = () => {
    setIsCategoryModalOpen(true);
  };
  const handleCategoryCancel = () => {
    setIsCategoryModalOpen(false);
  };

  {
    /*============ Recording exams to created category =======*/
  }
  const [exam, setExam] = useState({
    title: "",
    time: "",
  });
  const handleInputExams = (event) => {
    if (event.target.name === "profile") {
      setExam({ ...exam, profile: event.target.files[0] });
    } else {
      setExam({ ...exam, [event.target.name]: event.target.value });
    }
  };
  const [categoryId, setCategoryId] = useState([]);
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);

  function getSingleCategoryTo(id) {
    axios
      .get(
        `https://heroes-driving-be.onrender.com/api/v1/categories/single/${id}`
      )
      .then((res) => setCategoryId(res.data.data))
      .catch((err) => console.log(err));
  }
  const handleSubmitExa = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", exam.title);
    formData.append("time", exam.time);
    const token = localStorage.getItem("token");

    if (!token) {
      errors("Login first!!");
    } else {
      try {
        const response = await axios.post(
          `https://heroes-driving-be.onrender.com/api/v1/exams/record/${categoryId._id}`,
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
            setIsExamModalOpen(false);
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
  const showExamModal = () => {
    setIsExamModalOpen(true);
  };
  const handleExamOk = (event) => {
    event.preventDefault();
    handleSubmitExa(event);
  };
  const handleExamCancel = () => {
    setIsExamModalOpen(false);
  };

  return (
    <>
      <div className=" font-[Poppins] ">
        <div className=" font-[Poppins] fixed z-20">
          <Addbutton onClick={togglePopup} />
        </div>
        {isPopupVisible && (
          <div className=" font-[Poppins] fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[999]">
            <div className=" font-[Poppins] relative bg-white rounded-md p-2 lg:w-1/2 md:w-[650px] w-full mt-5 shadow-lg lg:ml-[20rem]">
              <div
                className=" font-[Poppins] absolute top-4 right-4 md:w-12 lg:w-8 lg:h-8 md:h-12 w-8 h-8 bg-[#006991] rounded-full flex justify-center items-center cursor-pointer"
                onClick={togglePopup}
              >
                <AiOutlineClose className=" font-[Poppins] lg:text-xl md:text-3xl text-2xl text-white" />
              </div>
              <form
                onSubmit={handleSubmit}
                className=" font-[Poppins] flex flex-col lg:justify-center items-center"
              >
                <Title TitleValue="Add Category 🙌" />
                <SubTitle SubTitleValue="Category's Data" />
                <div className=" font-[Poppins] lg:w-[20rem] w-full px-4">
                  <Labels Label="Number of Exams" />
                  <input
                    type="text"
                    name="examsNumber"
                    placeholder="Number of Exams"
                    className=" font-[Poppins] text-[#006991] lg:w-[20rem] w-full lg:text-base
                  md:text-3xl border border-slate-600 
                  lg:p-2 md:p-4 p-2 mt-1 rounded-md 
                  "
                    onChange={handleInput}
                  />
                  <Labels Label="Amount" />
                  <input
                    type="number"
                    name="amount"
                    placeholder="Amount to be paid in numbers"
                    className=" font-[Poppins] text-[#006991] lg:w-[20rem] w-full lg:text-base
                  md:text-3xl border border-slate-600 
                  lg:p-2 md:p-4 p-2 mt-1 rounded-md 
                  "
                    onChange={handleInput}
                  />
                  <Labels Label="Duration" />
                  <input
                    type="number"
                    name="duration"
                    placeholder="Duration of expires in days eg: 1 for one day"
                    className=" font-[Poppins] text-[#006991] lg:w-[20rem] w-full lg:text-base
                  md:text-3xl border border-slate-600 
                  lg:p-2 md:p-4 p-2 mt-1 rounded-md 
                  "
                    onChange={handleInput}
                  />
                  <Labels Label="Type" />
                  <select
                    name="type"
                    id="type"
                    className=" font-[Poppins] lg:w-[20rem] w-full lg:text-base md:text-3xl border border-slate-600 lg:p-2 md:p-4 p-2 mt-1 rounded-md "
                    onChange={handleInput}
                  >
                    <option>----</option>
                    <option value="free">free</option>
                    <option value="paid">paid</option>
                  </select>
                </div>
                <div className=" font-[Poppins] flex justify-between items-center cursor-pointer bg-[#006991] p-2 lg:w-44 md:w-48 w-32 rounded-md mt-10 mb-4">
                  <button
                    className=" font-[Poppins] text-white  lg:text-xl md:text-3xl"
                    type="submit"
                  >
                    Submit
                  </button>
                  <GoPlus className=" font-[Poppins] bg-white text-[#006991] rounded-full lg:text-xl md:text-3xl" />
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ===== Display categories===== */}
        <div className=" font-[Poppins] pt-10">
          {isLoading && <Loader />}
          <section id="services">
            <div className=" font-[Poppins] md:container px-0 py-8">
              <div className=" font-[Poppins] grid lg:grid-cols-2 grid-cols-1 gap-4 group">
                {categoriesData.length > 0 ? (
                  categoriesData.map((category, id) => (
                    <div
                      key={id}
                      data-aos="fade-up"
                      data-aos-delay={id * 600}
                      className=" font-[Poppins] min-w-[18rem] duration-300 border-2 border-slate-200 rounded-xl text-center bg-bg_light_primary p-6 flex-1 group-hover:blur-sm hover:!blur-none"
                    >
                      <p className=" font-[Poppins] text-2xl text-[#006991] text-extrabold w-full">
                        Category: {category.type}
                      </p>
                      <h6 className=" font-[Poppins] text-lg pt-5 ">
                        Time: {category.duration} Days
                      </h6>
                      <h6 className=" font-[Poppins] text-gray-700 text-lg pt-5 text-extrabold ">
                        Exams: {category.examsNumber}
                      </h6>
                      <h6 className=" font-[Poppins] text-gray-700 text-lg pt-5 text-extrabold ">
                        amount: {category.amount} Rwf
                      </h6>
                      <div className=" font-[Poppins] flex lg:gap-[10.8rem] md:gap-[21rem] gap-12">
                        <Link to={`/admins/exams/${category._id}`}>
                          <h6
                            className=" font-[Poppins] my-3 text-[#006991] lg:text-xs md:text-lg text-medium font-bold"
                            onClick={(e) => {
                              getSingleCategoryTo(category._id);
                            }}
                          >
                            Exams: {category.exams.length}
                          </h6>
                        </Link>
                        <h6 className=" font-[Poppins] my-3 text-[#006991] lg:text-xs md:text-lg text-medium font-bold ">
                          Paid users: {category.accessableBy.length}
                        </h6>
                      </div>
                      <div className=" font-[Poppins] flex justify-center lg:gap-16 md:gap-0 gap-4">
                        <div
                          className=" font-[Poppins] flex justify-between items-center cursor-pointer bg-[#006991] p-2 gap-4 rounded-md mt-10 mb-4"
                          onClick={(e) => {
                            getSingleCategoryTo(category._id);
                            showExamModal();
                          }}
                        >
                          <button
                            className=" font-[Poppins] text-white lg:text-xl md:text-2xl"
                            type="submit"
                          >
                            Exams
                          </button>
                          <GoPlus className=" font-[Poppins] bg-white text-[#006991] rounded-full lg:text-xl md:text-3xl" />
                        </div>
                        <div className=" font-[Poppins] flex gap-5 mt-10 mr-6">
                          <button
                            className=" font-[Poppins] lg:w-10 md:w-14 cursor-pointer lg:h-10 md:h-14 w-10 h-10 rounded-full flex justify-center items-center py-4 lg:ml-[1rem] md:ml-[18rem] ml-12 bg-[#006991]"
                            title="Update category"
                            onClick={(e) => {
                              getSingleCategory(category._id);
                              showCategoryModal();
                            }}
                          >
                            <MdOutlineEdit className=" font-[Poppins] text-white lg:text-base md:text-2xl" />
                          </button>
                          <Popconfirm
                            title="Delete Category"
                            description="Are you sure to delete this Category?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={(e) =>
                              handleDeleteCategory(category._id)
                            }
                          >
                            <button
                              className=" font-[Poppins] lg:w-10 md:w-14 cursor-pointer lg:h-10 md:h-14 w-10 h-10 rounded-full flex justify-center items-center py-4 lg:ml-2 md:ml-10 bg-red-600"
                              title="Delete category"
                            >
                              <RiDeleteBin6Line className=" font-[Poppins] text-white lg:text-base md:text-2xl" />
                            </button>
                          </Popconfirm>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No category data available</p>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Edite model */}
        <div className=" font-[Poppins] fixed z-20">
          <Modal
            style={{
              top: 100,
            }}
            open={isCategoryModalOpen}
            onOk={handleCategoryUpdate}
            onCancel={handleCategoryCancel}
          >
            <div
              className=" font-[Poppins] absolute lg:top-[12px] lg:right-[12px] md:right-1 md:top-1 top-3 right-3 md:w-12 lg:w-8 lg:h-8 md:h-12 w-8 h-8 bg-[#006991] rounded-full flex justify-center items-center cursor-pointer"
              onClick={handleCategoryCancel}
            >
              <AiOutlineClose className=" font-[Poppins] lg:text-base md:text-xl text-xl text-black" />
            </div>
            <div className=" font-[Poppins] add__dimension">
              <form onSubmit={handleCategoryUpdate}>
                <div className=" font-[Poppins] flex flex-col lg:justify-center items-center">
                  <Title TitleValue="Edite Category 🙌" />
                  <SubTitle SubTitleValue="Category's Data" />
                </div>
                <div className=" font-[Poppins] add__dimension-row">
                  <div>
                    <Labels Label="Number of Exams" />

                    <input
                      type="text"
                      id="examsNumber"
                      value={categoryDataEdit.examsNumber}
                      name="examsNumber"
                      placeholder="Number of Exams"
                      className=" font-[Poppins] text-[#006991] w-full lg:text-base
                      md:text-3xl border border-slate-600 
                      lg:p-2 md:p-4 p-2 mt-1 rounded-md 
                      "
                      onChange={(e) => {
                        setCategoryDataEdit({
                          ...categoryDataEdit,
                          examsNumber: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div>
                    <Labels Label="Amount" />

                    <input
                      type="text"
                      id="amount"
                      value={categoryDataEdit.amount}
                      name="amount"
                      placeholder="Enter Amount to be paid"
                      className=" font-[Poppins] text-[#006991] w-full lg:text-base
                      md:text-3xl border border-slate-600 
                      lg:p-2 md:p-4 p-2 mt-1 rounded-md 
                      "
                      onChange={(e) => {
                        setCategoryDataEdit({
                          ...categoryDataEdit,
                          amount: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div>
                    <Labels Label="Duration" />

                    <input
                      type="text"
                      id="duration"
                      value={categoryDataEdit.duration}
                      name="duration"
                      placeholder="Enter duration"
                      className=" font-[Poppins] text-[#006991] w-full lg:text-base
                      md:text-3xl border border-slate-600 
                      lg:p-2 md:p-4 p-2 mt-1 rounded-md 
                      "
                      onChange={(e) => {
                        setCategoryDataEdit({
                          ...categoryDataEdit,
                          duration: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div>
                  <Labels Label="Category" />
                  <select
                    name="type"
                    value={categoryDataEdit.type}
                    className=" font-[Poppins] text-[#006991] w-full lg:text-base
                    md:text-3xl border border-slate-600 
                    lg:p-2 md:p-4 p-2 mt-1 rounded-md 
                    "
                    onChange={(e) => {
                      setCategoryDataEdit({
                        ...categoryDataEdit,
                        type: e.target.value,
                      });
                    }}
                  >
                    <option value="free">free</option>
                    <option value="paid">paid</option>
                  </select>
                </div>
              </form>
            </div>
          </Modal>
        </div>

        {/* ======Add exams to category======= */}
        <div>
          <Modal
            style={{
              top: 200,
            }}
            open={isExamModalOpen}
            onOk={handleExamOk}
            onCancel={handleExamCancel}
          >
            <div
              className=" font-[Poppins] absolute lg:top-[12px] lg:right-[12px] md:right-1 md:top-1 top-3 right-3 md:w-12 lg:w-8 lg:h-8 md:h-12 w-8 h-8 bg-[#006991] rounded-full flex justify-center items-center cursor-pointer"
              onClick={handleExamCancel}
            >
              <AiOutlineClose className=" font-[Poppins] lg:text-base md:text-xl text-xl text-black" />
            </div>
            <div className=" font-[Poppins] add-question">
              <form action="#" onSubmit={handleSubmitExa}>
                <div className=" font-[Poppins] flex flex-col lg:justify-center items-center">
                  <Title TitleValue="Add Exams 🙌" />
                  <SubTitle SubTitleValue="Add exams to category" />
                </div>
                <div className=" font-[Poppins] ">
                  <div>
                    <Labels Label="title" />
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Title of exam"
                      className=" font-[Poppins] text-[#006991] w-full lg:text-base
                      md:text-3xl border border-slate-600 
                      lg:p-2 md:p-4 p-2 mt-1 rounded-md 
                      "
                      onChange={handleInputExams}
                    />
                  </div>

                  <div>
                    <Labels Label="Time" />
                    <input
                      type="text"
                      id="time"
                      name="time"
                      placeholder="Time for exam"
                      className=" font-[Poppins] text-[#006991] w-full lg:text-base
                      md:text-3xl border border-slate-600 
                      lg:p-2 md:p-4 p-2 mt-1 rounded-md 
                      "
                      onChange={handleInputExams}
                    />
                  </div>
                </div>
              </form>
            </div>
          </Modal>
        </div>

        <Footer />
      </div>
      <ToastContainer />
    </>
  );
};

export default AdminCategories;
