import React, { useState, useEffect } from "react";
import Footer from "../../Footer/Footer";
import { Title, SubTitle, Labels } from "../../../../../fe/componentsss/SharedComponents/Inputs";
import { AiOutlineClose } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { Modal, Popconfirm } from "antd";

const Options = () => {
  const { id } = useParams();

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
  // ============= fetching options for chosen question =================
  const [questionOption, setQuestionOption] = useState([]);

  const getQuestionOption = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `http://localhost:9000/api/v1/options/all/${id}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data.data;
    setQuestionOption(data);
  };

  useEffect(() => {
    getQuestionOption();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString().replace(/\//g, "-");
    return formattedDate;
  };

  // ============ Edit Option =========

  const [optionDataEdit, setOptionDataEdit] = useState({
    option: "",
    points: "",
  });
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  function getSingleOption(id) {
    axios
      .get(`http://localhost:9000/api/v1/options/single/${id}`)
      .then((res) => setOptionDataEdit(res.data.data))
      .catch((err) => console.log(err));
  }

  const handleOptionUpdate = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("option", optionDataEdit.option);
    formData.append("points", optionDataEdit.points);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `http://localhost:9000/api/v1/options/update/${optionDataEdit._id}`,
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
        getQuestionOption();
        setTimeout(() => {
          setIsOptionModalOpen(false);
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

  const showOptionModal = () => {
    setIsOptionModalOpen(true);
  };
  const handleOptionCancel = () => {
    setIsOptionModalOpen(false);
  };

  // ================== delete exam =====================
  async function handleDeleteOption(id) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:9000/api/v1/options/delete/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        console.log(response.data);
        success(response.data.message);
        getQuestionOption();
        setTimeout(() => {}, 2000);
      }
    } catch (err) {
      errors(response.data.message);
      console.log(response.data.message);
      setTimeout(() => {}, 2000);
    }
  }

  return (
    <div>
      {/* ===== Display question options===== */}
      <div className=" font-[Poppins] pt-10">
        <section id="services">
          <div className=" font-[Poppins] md:container px-0 py-8">
            <div className=" font-[Poppins] flex gap-5 justify-between flex-wrap group">
              {questionOption.length > 0 ? (
                questionOption.map((news, index) => (
                  <div
                    key={index}
                    data-aos="fade-up"
                    data-aos-delay={index * 600}
                    className=" font-[Poppins] min-w-[20rem] duration-300 border-2 border-slate-200 rounded-xl text-center bg-bg_light_primary p-6 flex-1 group-hover:blur-sm hover:!blur-none"
                  >
                    <p className=" font-[Poppins] text-2xl text-[#006991] w-full">
                      {news.option}
                    </p>
                    <h6 className=" font-[Poppins] text-gray-700 text-lg pt-5 text-extrabold ">
                      Marks: {news.points}
                    </h6>
                    <h6 className=" font-[Poppins] text-gray-700 text-lg pt-5 text-extrabold ">
                      Date: {formatDate(news.addedAt)}
                    </h6>
                    <div className=" font-[Poppins] flex">
                      <div className=" font-[Poppins] flex gap-5 mt-10">
                        <button
                          className=" font-[Poppins] lg:w-10 md:w-14 cursor-pointer lg:h-10 md:h-14 w-10 h-10 rounded-full flex justify-center items-center py-4 lg:ml-[5rem] md:ml-[18rem] ml-12 bg-[#006991]"
                          title="Update exam"
                          onClick={(e) => {
                            getSingleOption(news._id);
                            showOptionModal();
                          }}
                        >
                          <MdOutlineEdit className=" font-[Poppins] text-white lg:text-base md:text-2xl" />
                        </button>
                        <Popconfirm
                          title="Delete Exam"
                          description="Are you sure to delete this exam?"
                          okText="Yes"
                          cancelText="No"
                          onConfirm={(e) => handleDeleteOption(news._id)}
                        >
                          <button
                            className=" font-[Poppins] lg:w-10 md:w-14 cursor-pointer lg:h-10 md:h-14 w-10 h-10 rounded-full flex justify-center items-center py-4 lg:ml-5 md:ml-10 bg-red-600"
                            title="Delete exam"
                          >
                            <RiDeleteBin6Line className=" font-[Poppins] text-white lg:text-base md:text-2xl" />
                          </button>
                        </Popconfirm>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No options assigned to selected question</p>
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
          open={isOptionModalOpen}
          onOk={handleOptionUpdate}
          onCancel={handleOptionCancel}
        >
          <div
            className=" font-[Poppins] absolute lg:top-[12px] lg:right-[12px] md:right-1 md:top-1 top-3 right-3 md:w-12 lg:w-8 lg:h-8 md:h-12 w-8 h-8 bg-[#006991] rounded-full flex justify-center items-center cursor-pointer"
            onClick={handleOptionCancel}
          >
            <AiOutlineClose className=" font-[Poppins] lg:text-base md:text-xl text-xl text-black" />
          </div>
          <div className=" font-[Poppins] add__dimension">
            <form onSubmit={handleOptionUpdate}>
              <div className=" font-[Poppins] flex flex-col lg:justify-center items-center">
                <Title TitleValue="Edite option 🙌" />
                <SubTitle SubTitleValue="Options's data" />
              </div>
              <div className=" font-[Poppins] ">
                <div>
                  <Labels Label="Option" />

                  <input
                    type="text"
                    id="option"
                    value={optionDataEdit.option}
                    name="option"
                    placeholder="Option data"
                    className=" font-[Poppins] text-[#006991] w-full lg:text-base
                      md:text-3xl border border-slate-600 
                      lg:p-2 md:p-4 p-2 mt-1 rounded-md 
                      "
                    onChange={(e) => {
                      setOptionDataEdit({
                        ...optionDataEdit,
                        option: e.target.value,
                      });
                    }}
                  />
                </div>
                <div>
                  <Labels Label="Marks" />

                  <input
                    type="text"
                    id="option"
                    value={optionDataEdit.points}
                    name="points"
                    placeholder="Option marks"
                    className=" font-[Poppins] text-[#006991] w-full lg:text-base
                      md:text-3xl border border-slate-600 
                      lg:p-2 md:p-4 p-2 mt-1 rounded-md 
                      "
                    onChange={(e) => {
                      setOptionDataEdit({
                        ...optionDataEdit,
                        points: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </form>
          </div>
        </Modal>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Options;
