import React, { useState, useEffect } from "react";
import Footer from "../../Footer/Footer";
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
import { useParams } from "react-router-dom";
import Loader from "../../SharedComponents/Loader";
const Questions = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
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
  // ============= fetching question for chosen exam =================
  const [examQuestion, setExamQuestion] = useState([]);
  useEffect(() => {
    getExamQuestion();
  }, [id]);
  const getExamQuestion = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `https://heroes-driving-be.onrender.com/api/v1/questions/all/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data;
      setExamQuestion(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error while fetching:", error);
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString().replace(/\//g, "-");
    return formattedDate;
  };

  // ============ Edit Question =========

  const [questionDataEdit, setQuestionDataEdit] = useState({
    question: "",
  });
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);

  function getSingleQuestion(id) {
    axios
      .get(
        `https://heroes-driving-be.onrender.com/api/v1/questions/single/${id}`
      )
      .then((res) => setQuestionDataEdit(res.data.data))
      .catch((err) => console.log(err));
  }

  const handleQuestionUpdate = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("question", questionDataEdit.question);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `https://heroes-driving-be.onrender.com/api/v1/questions/update/${questionDataEdit._id}`,
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
        getExamQuestion();
        setTimeout(() => {
          setIsQuestionModalOpen(false);
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

  const showQuestionModal = () => {
    setIsQuestionModalOpen(true);
  };
  const handleQuestionCancel = () => {
    setIsQuestionModalOpen(false);
  };

  // ================== delete exam =====================
  async function handleDeleteQuestion(id) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `https://heroes-driving-be.onrender.com/api/v1/questions/delete/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        console.log(response.data);
        success(response.data.message);
        getExamQuestion();
        setTimeout(() => {}, 2000);
      }
    } catch (err) {
      errors(response.data.message);
      console.log(response.data.message);
      setTimeout(() => {}, 2000);
    }
  }

  {
    /*============ Recording options to created question =======*/
  }
  const [options, setOptions] = useState({
    option: "",
    points: "",
  });
  const handleInputOpt = (event) => {
    if (event.target.name === "profile") {
      setOptions({ ...options, profile: event.target.files[0] });
    } else {
      setOptions({ ...options, [event.target.name]: event.target.value });
    }
  };
  const [questionId, setQuestionId] = useState([]);
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  function getSingleQuestionTo(id) {
    axios
      .get(
        `https://heroes-driving-be.onrender.com/api/v1/questions/single/${id}`
      )
      .then((res) => setQuestionId(res.data.data))
      .catch((err) => console.log(err));
  }
  const handleSubmitOpt = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("option", options.option);
    formData.append("points", options.points);
    const token = localStorage.getItem("token");

    if (!token) {
      errors("Login first!!");
    } else {
      try {
        const response = await axios.post(
          `https://heroes-driving-be.onrender.com/api/v1/options/record/${questionId._id}`,
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
          getExamQuestion();
          setTimeout(() => {
            setIsOptionModalOpen(false);
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
  const showOptionModal = () => {
    setIsOptionModalOpen(true);
  };
  const handleOptionOk = (event) => {
    event.preventDefault();
    handleSubmitOpt(event);
  };
  const handleOptionCancel = () => {
    setIsOptionModalOpen(false);
  };

  return (
    <div>
      {/* ===== Display Questions===== */}
      <div className=" font-[Poppins] pt-10">
        {isLoading && <Loader />}
        <section id="services">
          <div className=" font-[Poppins] md:container px-0 py-8">
            <div className=" font-[Poppins] flex gap-5 justify-between flex-wrap group">
              {examQuestion.length > 0 ? (
                examQuestion.map((news, index) => (
                  <div
                    key={index}
                    data-aos="fade-up"
                    data-aos-delay={index * 600}
                    className=" font-[Poppins] min-w-[20rem] duration-300 border-2 border-slate-200 rounded-xl text-center bg-bg_light_primary p-6 flex-1 group-hover:blur-sm hover:!blur-none"
                  >
                    <p className=" font-[Poppins] text-2xl text-[#006991] w-full">
                      {news.question}
                    </p>
                    <h6 className=" font-[Poppins] text-gray-700 text-lg pt-5 text-extrabold ">
                      Marks: {news.marks}
                    </h6>
                    <h6 className=" font-[Poppins] text-gray-700 text-lg pt-5 text-extrabold ">
                      Date: {formatDate(news.addedAt)}
                    </h6>
                    <div className=" font-[Poppins] flex gap-5">
                      <Link to={`/admins/options/${news._id}`}>
                        <h6
                          className=" font-[Poppins] my-3 text-[#006991] lg:text-xs md:text-lg text-medium font-bold "
                          onClick={(e) => {
                            getSingleQuestionTo(news._id);
                          }}
                        >
                          Options: {news.options.length}
                        </h6>
                      </Link>
                    </div>
                    <div className=" font-[Poppins] flex">
                      <div
                        className=" font-[Poppins] flex justify-between items-center cursor-pointer bg-[#006991] p-2 lg:w-44 md:w-48 w-32 rounded-md mt-10 mb-4"
                        onClick={(e) => {
                          getSingleQuestionTo(news._id);
                          showOptionModal();
                        }}
                      >
                        <button
                          className=" font-[Poppins] text-white  lg:text-xl md:text-3xl"
                          type="submit"
                        >
                          Options
                        </button>
                        <GoPlus className=" font-[Poppins] bg-white text-[#006991] rounded-full lg:text-xl md:text-3xl" />
                      </div>
                      <div className=" font-[Poppins] flex gap-5 mt-10">
                        <button
                          className=" font-[Poppins] lg:w-10 md:w-14 cursor-pointer lg:h-10 md:h-14 w-10 h-10 rounded-full flex justify-center items-center py-4 lg:ml-[5rem] md:ml-[18rem] ml-12 bg-[#006991]"
                          title="Update exam"
                          onClick={(e) => {
                            getSingleQuestion(news._id);
                            showQuestionModal();
                          }}
                        >
                          <MdOutlineEdit className=" font-[Poppins] text-white lg:text-base md:text-2xl" />
                        </button>
                        <Popconfirm
                          title="Delete Exam"
                          description="Are you sure to delete this exam?"
                          okText="Yes"
                          cancelText="No"
                          onConfirm={(e) => handleDeleteQuestion(news._id)}
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
                <p>No question assigned to selected exam</p>
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
          open={isQuestionModalOpen}
          onOk={handleQuestionUpdate}
          onCancel={handleQuestionCancel}
        >
          <div
            className=" font-[Poppins] absolute lg:top-[12px] lg:right-[12px] md:right-1 md:top-1 top-3 right-3 md:w-12 lg:w-8 lg:h-8 md:h-12 w-8 h-8 bg-[#006991] rounded-full flex justify-center items-center cursor-pointer"
            onClick={handleQuestionCancel}
          >
            <AiOutlineClose className=" font-[Poppins] lg:text-base md:text-xl text-xl text-black" />
          </div>
          <div className=" font-[Poppins] add__dimension">
            <form onSubmit={handleQuestionUpdate}>
              <div className=" font-[Poppins] flex flex-col lg:justify-center items-center">
                <Title TitleValue="Edite question 🙌" />
                <SubTitle SubTitleValue="Question's data" />
              </div>
              <div className=" font-[Poppins] ">
                <div>
                  <Labels Label="Question" />

                  <input
                    type="text"
                    id="title"
                    value={questionDataEdit.question}
                    name="name"
                    placeholder="Question's text"
                    className=" font-[Poppins] text-[#006991] w-full lg:text-base
                      md:text-3xl border border-slate-600 
                      lg:p-2 md:p-4 p-2 mt-1 rounded-md 
                      "
                    onChange={(e) => {
                      setQuestionDataEdit({
                        ...questionDataEdit,
                        question: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </form>
          </div>
        </Modal>
      </div>

      {/* ======Add Option to question======= */}
      <div>
        <Modal
          style={{
            top: 200,
          }}
          open={isOptionModalOpen}
          onOk={handleOptionOk}
          onCancel={handleOptionCancel}
        >
          <div
            className=" font-[Poppins] absolute lg:top-[12px] lg:right-[12px] md:right-1 md:top-1 top-3 right-3 md:w-12 lg:w-8 lg:h-8 md:h-12 w-8 h-8 bg-[#006991] rounded-full flex justify-center items-center cursor-pointer"
            onClick={handleOptionCancel}
          >
            <AiOutlineClose className=" font-[Poppins] lg:text-base md:text-xl text-xl text-black" />
          </div>
          <div className=" font-[Poppins] add-question">
            <form action="#" onSubmit={handleSubmitOpt}>
              <div className=" font-[Poppins] flex flex-col lg:justify-center items-center">
                <Title TitleValue="Add option 🙌" />
                <SubTitle SubTitleValue="Add option to question" />
              </div>
              <div className=" font-[Poppins] ">
                <div>
                  <Labels Label="Option" />
                  <input
                    type="text"
                    id="option"
                    name="option"
                    placeholder="Option text"
                    className=" font-[Poppins] text-[#006991] w-full lg:text-base
                      md:text-3xl border border-slate-600 
                      lg:p-2 md:p-4 p-2 mt-1 rounded-md 
                      "
                    onChange={handleInputOpt}
                  />
                </div>

                <div>
                  <Labels Label="Marks" />
                  <input
                    type="number"
                    id="points"
                    name="points"
                    placeholder="Option marks"
                    className=" font-[Poppins] text-[#006991] w-full lg:text-base
                      md:text-3xl border border-slate-600 
                      lg:p-2 md:p-4 p-2 mt-1 rounded-md 
                      "
                    onChange={handleInputOpt}
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

export default Questions;
