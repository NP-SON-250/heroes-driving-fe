import React, { useState, useEffect } from "react";
import Footer from "../../Footer/Footer";
import Addbutton from "../../../../../fe/componentsss/Buttons/Addbutton";
import { Title, SubTitle, Labels } from "../../../../../fe/componentsss/SharedComponents/Inputs";
import { AiOutlineClose } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { GoPlus } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { Modal, Popconfirm } from "antd";

const AdminExams = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [exams, setExams] = useState({
    title: "",
    time: "",
    category: "",
  });

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const navigate = useNavigate();
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
    setExams({ ...exams, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!exams.title) {
      errors("Title of exam is required");
      return;
    }

    const formData = new FormData();
    formData.append("title", exams.title);
    formData.append("time", exams.time);
    formData.append("category", exams.category);

    const token = localStorage.getItem("token");

    if (!token) {
      errors("Login first!!");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:9000/api/v1/exams/record`,
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
          getExamData();
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

  // ============= fetching exams =================
  const [examData, setExamData] = useState([]);

  const getExamData = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:9000/api/v1/exams/all", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const data = response.data.data;
    setExamData(data);
  };
  useEffect(() => {
    getExamData();
  }, []);

  // ================== delete exam =====================
  async function handleDeleteExam(id) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:9000/api/v1/exams/delete/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      success(response.data.message);
      getExamData();
    } catch (err) {
      console.error(err);
    }
  }

  // ============ Edit Exam =========

  const [examDataEdit, setExamDataEdit] = useState({
    title: "",
    time: "",
    category: "",
  });
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);

  function getSingleExam(id) {
    axios
      .get(`http://localhost:9000/api/v1/exams/single/${id}`)
      .then((res) => setExamDataEdit(res.data.data))
      .catch((err) => console.log(err));
  }

  const handleExamUpdate = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", examDataEdit.title);
    formData.append("time", examDataEdit.time);
    formData.append("category", examDataEdit.category);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `http://localhost:9000/api/v1/exams/update/${examDataEdit._id}`,
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
        getExamData();
        setTimeout(() => {
          setIsExamModalOpen(false);
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

  const showExamModal = () => {
    setIsExamModalOpen(true);
  };
  const handleExamCancel = () => {
    setIsExamModalOpen(false);
  };

  {
    /*============ Recording question to created exam =======*/
  }
  const [question, setQuestion] = useState({
    question: "",
  });
  const handleInputQue = (event) => {
    if (event.target.name === "profile") {
      setQuestion({ ...question, profile: event.target.files[0] });
    } else {
      setQuestion({ ...question, [event.target.name]: event.target.value });
    }
  };
  const [examId, setExamId] = useState([]);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);

  function getSingleExamTo(id) {
    axios
      .get(`http://localhost:9000/api/v1/exams/single/${id}`)
      .then((res) => setExamId(res.data.data))
      .catch((err) => console.log(err));
  }
  const handleSubmitQue = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("question", question.question);
    console.log("Form Data:", formData);
    const token = localStorage.getItem("token");

    if (!token) {
      errors("Login first!!");
    } else {
      try {
        const response = await axios.post(
          `http://localhost:9000/api/v1/questions/record/${examId._id}`,
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
          getExamData();
          setTimeout(() => {
            setIsQuestionModalOpen(false);
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
  const showQuestionModal = () => {
    setIsQuestionModalOpen(true);
  };
  const handleQuestionOk = (event) => {
    event.preventDefault();
    handleSubmitQue(event);
  };
  const handleQuestionCancel = () => {
    setIsQuestionModalOpen(false);
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
                <Title TitleValue="Add exam 🙌" />
                <SubTitle SubTitleValue="Exam's descriptions" />
                <div className=" font-[Poppins] lg:w-[20rem] w-full px-4">
                  <Labels Label="Exam title" />
                  <input
                    type="text"
                    name="title"
                    placeholder="Title of the exam"
                    className=" font-[Poppins] text-[#006991] lg:w-[20rem] w-full lg:text-base
                  md:text-3xl border border-slate-600 
                  lg:p-2 md:p-4 p-2 mt-1 rounded-md 
                  "
                    onChange={handleInput}
                  />
                  <Labels Label="Time" />
                  <input
                    type="number"
                    name="time"
                    placeholder="Time taken to complete exam"
                    className=" font-[Poppins] text-[#006991] lg:w-[20rem] w-full lg:text-base
                  md:text-3xl border border-slate-600 
                  lg:p-2 md:p-4 p-2 mt-1 rounded-md 
                  "
                    onChange={handleInput}
                  />
                  <Labels Label="Category" />
                  <select
                    name="category"
                    id="category"
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

        {/* ===== Display exams===== */}
        <div className=" font-[Poppins] pt-10">
          <section id="services">
            <div className=" font-[Poppins] md:container px-0 py-8">
              <div className=" font-[Poppins] flex gap-5 justify-between flex-wrap group">
                {examData.length > 0 ? (
                  examData.map((news, id) => (
                    <div
                      key={id}
                      data-aos="fade-up"
                      data-aos-delay={id * 600}
                      className=" font-[Poppins] min-w-[20rem] duration-300 border-2 border-slate-200 rounded-xl text-center bg-bg_light_primary p-6 flex-1 group-hover:blur-sm hover:!blur-none"
                    >
                      <p className=" font-[Poppins] text-2xl text-[#006991] w-full">
                        {news.title}
                      </p>
                      <h6 className=" font-[Poppins] text-lg pt-5 text-extrabold ">
                        Category: {news.category}
                      </h6>
                      <h6 className=" font-[Poppins] text-gray-700 text-lg pt-5 text-extrabold ">
                        Marks: {news.marks}
                      </h6>
                      <h6 className=" font-[Poppins] text-gray-700 text-lg pt-5 text-extrabold ">
                        Time: {news.time} Mins
                      </h6>
                      <div className=" font-[Poppins] flex gap-5">
                        <Link to={`/admins/questions/${news._id}`}>
                          <h6
                            className=" font-[Poppins] my-3 text-[#006991] lg:text-xs md:text-lg text-medium font-bold "
                            onClick={(e) => {
                              getSingleExamTo(news._id);
                            }}
                          >
                            Questions: {news.questions.length}
                          </h6>
                        </Link>
                        <h6 className=" font-[Poppins] my-3 text-[#006991] lg:text-xs md:text-lg text-medium font-bold ">
                          Users: ({news.conductedBy.length})
                        </h6>
                      </div>
                      <div className=" font-[Poppins] flex gap-5">
                        <div
                          className=" font-[Poppins] flex justify-between items-center cursor-pointer bg-[#006991] p-2 lg:w-44 md:w-48 w-32 rounded-md mt-10 mb-4"
                          onClick={(e) => {
                            getSingleExamTo(news._id);
                            showQuestionModal();
                          }}
                        >
                          <button
                            className=" font-[Poppins] text-white  lg:text-xl md:text-3xl"
                            type="submit"
                          >
                            Question
                          </button>
                          <GoPlus className=" font-[Poppins] bg-white text-[#006991] rounded-full lg:text-xl md:text-3xl" />
                        </div>
                        <div className=" font-[Poppins] flex gap-5 mt-10">
                          <button
                            className=" font-[Poppins] lg:w-10 md:w-14 cursor-pointer lg:h-10 md:h-14 w-10 h-10 rounded-full flex justify-center items-center py-4 lg:ml-[5rem] md:ml-[18rem] ml-12 bg-[#006991]"
                            title="Update exam"
                            onClick={(e) => {
                              getSingleExam(news._id);
                              showExamModal();
                            }}
                          >
                            <MdOutlineEdit className=" font-[Poppins] text-white lg:text-base md:text-2xl" />
                          </button>
                          <Popconfirm
                            title="Delete Exam"
                            description="Are you sure to delete this exam?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={(e) => handleDeleteExam(news._id)}
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
                  <p>No exam data available</p>
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
            open={isExamModalOpen}
            onOk={handleExamUpdate}
            onCancel={handleExamCancel}
          >
            <div
              className=" font-[Poppins] absolute lg:top-[12px] lg:right-[12px] md:right-1 md:top-1 top-3 right-3 md:w-12 lg:w-8 lg:h-8 md:h-12 w-8 h-8 bg-[#006991] rounded-full flex justify-center items-center cursor-pointer"
              onClick={handleExamCancel}
            >
              <AiOutlineClose className=" font-[Poppins] lg:text-base md:text-xl text-xl text-black" />
            </div>
            <div className=" font-[Poppins] add__dimension">
              <form onSubmit={handleExamUpdate}>
                <div className=" font-[Poppins] flex flex-col lg:justify-center items-center">
                  <Title TitleValue="Edite exam 🙌" />
                  <SubTitle SubTitleValue="Exam's descriptions" />
                </div>
                <div className=" font-[Poppins] add__dimension-row">
                  <div>
                    <Labels Label="Title" />

                    <input
                      type="text"
                      id="title"
                      value={examDataEdit.title}
                      name="name"
                      placeholder="Name of business"
                      className=" font-[Poppins] text-[#006991] w-full lg:text-base
                      md:text-3xl border border-slate-600 
                      lg:p-2 md:p-4 p-2 mt-1 rounded-md 
                      "
                      onChange={(e) => {
                        setExamDataEdit({
                          ...examDataEdit,
                          title: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div>
                    <Labels Label="Time" />

                    <input
                      type="text"
                      id="description"
                      value={examDataEdit.time}
                      name="description"
                      placeholder="Business description"
                      className=" font-[Poppins] text-[#006991] w-full lg:text-base
                      md:text-3xl border border-slate-600 
                      lg:p-2 md:p-4 p-2 mt-1 rounded-md 
                      "
                      onChange={(e) => {
                        setExamDataEdit({
                          ...examDataEdit,
                          time: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div>
                  <Labels Label="Category" />
                  <select
                    name="type"
                    value={examDataEdit.category}
                    className=" font-[Poppins] text-[#006991] w-full lg:text-base
                    md:text-3xl border border-slate-600 
                    lg:p-2 md:p-4 p-2 mt-1 rounded-md 
                    "
                    onChange={(e) => {
                      setExamDataEdit({
                        ...examDataEdit,
                        category: e.target.value,
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

        {/* ======Add question to exam======= */}
        <div>
          <Modal
            style={{
              top: 200,
            }}
            open={isQuestionModalOpen}
            onOk={handleQuestionOk}
            onCancel={handleQuestionCancel}
          >
            <div
              className=" font-[Poppins] absolute lg:top-[12px] lg:right-[12px] md:right-1 md:top-1 top-3 right-3 md:w-12 lg:w-8 lg:h-8 md:h-12 w-8 h-8 bg-[#006991] rounded-full flex justify-center items-center cursor-pointer"
              onClick={handleExamCancel}
            >
              <AiOutlineClose className=" font-[Poppins] lg:text-base md:text-xl text-xl text-black" />
            </div>
            <div className=" font-[Poppins] add-question">
              <form action="#" onSubmit={handleSubmitQue}>
                <div className=" font-[Poppins] flex flex-col lg:justify-center items-center">
                  <Title TitleValue="Add question 🙌" />
                  <SubTitle SubTitleValue="Add questions to exam" />
                </div>
                <div className=" font-[Poppins] ">
                  <div>
                    <Labels Label="Question" />
                    <input
                      type="text"
                      id="question"
                      name="question"
                      placeholder="Question"
                      className=" font-[Poppins] text-[#006991] w-full lg:text-base
                      md:text-3xl border border-slate-600 
                      lg:p-2 md:p-4 p-2 mt-1 rounded-md 
                      "
                      onChange={handleInputQue}
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

export default AdminExams;
