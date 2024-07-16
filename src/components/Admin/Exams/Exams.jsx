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

const Exams = () => {
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
  // ============= fetching exams for chosen category =================
  const [categoryExams, setCategoryExams] = useState([]);
  useEffect(() => {
    getCategoriesExam();
  }, []);
  const getCategoriesExam = async () => {
    setIsLoading(true); // Set loading to true when fetching data
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `https://heroes-driving-be.onrender.com/api/v1/exams/all/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data;
      setCategoryExams(data);
      setIsLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false); // Set loading to false in case of error
    }
  };

  // ============ Edit exams =========

  const [examDataEdit, setExamDataEdit] = useState({
    examsNumber: "",
    amount: "",
    duration: "",
    type: "",
  });
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);

  function getSingleExam(id) {
    axios
      .get(`https://heroes-driving-be.onrender.com/api/v1/exams/single/${id}`)
      .then((res) => setExamDataEdit(res.data.data))
      .catch((err) => console.log(err));
  }

  const handleExamUpdate = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("examsNumber", examDataEdit.examsNumber);
    formData.append("amount", examDataEdit.amount);
    formData.append("duration", examDataEdit.duration);
    formData.append("type", examDataEdit.type);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `https://heroes-driving-be.onrender.com/api/v1/exams/update/${examDataEdit._id}`,
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
        getCategoriesExam();
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

  // ================== delete exam =====================
  async function handleDeleteExam(id) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `https://heroes-driving-be.onrender.com/api/v1/exams/delete/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        console.log(response.data);
        success(response.data.message);
        getCategoriesExam();
        setTimeout(() => {}, 2000);
      }
    } catch (err) {
      errors(response.data.message);
      console.log(response.data.message);
      setTimeout(() => {}, 2000);
    }
  }

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
      .get(`https://heroes-driving-be.onrender.com/api/v1/exams/single/${id}`)
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
          `https://heroes-driving-be.onrender.com/api/v1/questions/record/${examId._id}`,
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
          getCategoriesExam();
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
    <div>
      {/* ===== Display exams===== */}
      <div className=" font-[Poppins] pt-10">
        {isLoading && <Loader />}
        <section id="services">
          <div className=" font-[Poppins] md:container px-0 py-8">
            <div className=" font-[Poppins] flex gap-5 justify-between flex-wrap group">
              {categoryExams.length > 0 ? (
                categoryExams.map((exams, id) => (
                  <div
                    key={id}
                    data-aos="fade-up"
                    data-aos-delay={id * 600}
                    className=" font-[Poppins] min-w-[18rem] duration-300 border-2 border-slate-200 rounded-xl text-center bg-bg_light_primary p-6 flex-1 group-hover:blur-sm hover:!blur-none"
                  >
                    <p className=" font-[Poppins] text-2xl text-[#006991] w-full">
                      {exams.title}
                    </p>
                    <h6 className=" font-[Poppins] text-gray-700 text-lg pt-5 text-extrabold ">
                      Marks: {exams.marks}
                    </h6>
                    <h6 className=" font-[Poppins] text-gray-700 text-lg pt-5 text-extrabold ">
                      Time: {exams.time} Mins
                    </h6>
                    <div className=" font-[Poppins] flex lg:gap-[10.8rem] md:gap-[21rem] gap-[1.4rem]">
                      <Link to={`/admins/questions/${exams._id}`}>
                        <h6
                          className=" font-[Poppins] my-3 text-[#006991] lg:text-xs md:text-lg text-medium font-bold "
                          onClick={(e) => {
                            getSingleExamTo(exams._id);
                          }}
                        >
                          Questions: {exams.questions.length}
                        </h6>
                      </Link>
                      <h6 className=" font-[Poppins] my-3 text-[#006991] lg:text-xs md:text-lg text-medium font-bold ">
                        Done By: {exams.conductedBy.length}
                      </h6>
                    </div>
                    <div className=" font-[Poppins] flex lg:gap-16 gap-4">
                      <div
                        className=" font-[Poppins] flex justify-between items-center cursor-pointer bg-[#006991] p-2 gap-5 rounded-md mt-10 mb-4"
                        onClick={(e) => {
                          getSingleExamTo(exams._id);
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
                          className=" font-[Poppins] lg:w-10 md:w-14 cursor-pointer lg:h-10 md:h-14 w-10 h-10 rounded-full flex justify-center items-center py-4  bg-[#006991]"
                          title="Update category"
                          onClick={(e) => {
                            getSingleExam(exams._id);
                            showExamModal();
                          }}
                        >
                          <MdOutlineEdit className=" font-[Poppins] text-white lg:text-base md:text-2xl" />
                        </button>
                        <Popconfirm
                          title="Delete category"
                          description="Are you sure to delete this exam?"
                          okText="Yes"
                          cancelText="No"
                          onConfirm={(e) => handleDeleteExam(exams._id)}
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
                <Title TitleValue="Edite Exam 🙌" />
                <SubTitle SubTitleValue="Exam's data" />
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
            onClick={handleQuestionCancel}
          >
            <AiOutlineClose className=" font-[Poppins] lg:text-base md:text-xl text-xl text-black" />
          </div>
          <div className=" font-[Poppins] add-question">
            <form action="#" onSubmit={handleSubmitQue}>
              <div className=" font-[Poppins] flex flex-col lg:justify-center items-center">
                <Title TitleValue="Add Questions 🙌" />
                <SubTitle SubTitleValue="Add questions to exam" />
              </div>
              <div className=" font-[Poppins] ">
                <div>
                  <Labels Label="Question" />
                  <input
                    type="text"
                    id="question"
                    name="question"
                    placeholder="Question text"
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
      <ToastContainer />
    </div>
  );
};

export default Exams;
