import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TiArrowBackOutline } from "react-icons/ti";
import { FaArrowRight } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/SharedComponents/Loader";
import Hello from "../components/Hello/Hello";
const ConductExam = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [examData, setExamData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(() => {
    const savedTime = localStorage.getItem("timeRemaining");
    return savedTime ? parseInt(savedTime, 10) : 20 * 60 * 1000;
  });
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

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:9000/api/v1/exams/single/${id}`)
      .then((response) => response.json())
      .then((data) => setExamData(data.data))
      .catch((error) => console.error("Error fetching exam data:", error));
  }, [id]);

  useEffect(() => {
    if (examData) {
      setIsLoading(false);
      const savedOptions =
        JSON.parse(localStorage.getItem("selectedOptions")) || {};
      const currentQuestionId = examData.questions[currentQuestionIndex]._id;
      setSelectedOption(savedOptions[currentQuestionId] || null);
    }
  }, [currentQuestionIndex, examData]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime > 0) {
          const newTime = prevTime - 1000;
          localStorage.setItem("timeRemaining", newTime);
          return newTime;
        } else {
          submitData();
          navigate("/");
          return 0;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  const handleOptionChange = (event) => {
    const currentQuestionId = examData.questions[currentQuestionIndex]._id;
    setSelectedOption(event.target.value);

    const savedOptions =
      JSON.parse(localStorage.getItem("selectedOptions")) || {};
    savedOptions[currentQuestionId] = event.target.value;
    localStorage.setItem("selectedOptions", JSON.stringify(savedOptions));
  };

  const handleNext = () => {
    if (currentQuestionIndex < examData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitData = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Ntakikuranga nkaho winjiye kuri sisiteme");
      alert("Banza winjire kuri sisiteme.");
      navigate("/login");
      return;
    }

    const savedOptions =
      JSON.parse(localStorage.getItem("selectedOptions")) || {};
    const responses = Object.keys(savedOptions).map((questionId) => ({
      questionId,
      selectedOptionId: savedOptions[questionId],
    }));

    const payload = {
      examId: examData._id,
      responses,
    };

    fetch(
      `http://localhost:9000/api/v1/newresponses/add/${examData._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === "200") {
          success("Your response has been saved");
          localStorage.removeItem("selectedOptions");
          localStorage.removeItem("timeRemaining");
          setSelectedOption(null);
          navigate("/responses");
        } else {
          console.error("Submission failed:", data);
          errors(data.message || "Submission failed");
        }
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        errors("Error submitting data");
      });
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("selectedOptions");
    localStorage.removeItem("timeRemaining");
    setSelectedOption(null);
  };

  if (!examData) {
    return <div>Loading...</div>;
  }

  const currentQuestion = examData.questions[currentQuestionIndex];
  const minutes = Math.floor(timeRemaining / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  return (
    <div>
      <Hello />
      {isLoading && <Loader />}

      <div className="font-[Poppins] flex justify-center">
        <div className="font-[Poppins] relative bg-white rounded-md p-12 lg:w-full md:w-[45rem] w-full lg:mt-14 md:mt-36 mt-14 lg:pb-5 pb-20 shadow-2xl">
          <div className="font-[Poppins] flex md:gap-20 gap-5 pb-10 justify-center">
            <h1 className="font-[Poppins]">{examData.title}</h1>
            <h1 className="font-[Poppins]">
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </h1>
          </div>
          <div className="font-[Poppins]">
            <p className="font-[Poppins] lg:text-2xl md:text-4xl text-2xl">
              {currentQuestion.question}
            </p>
            {currentQuestion.options.map((option) => (
              <div key={option._id} className="font-[Poppins]">
                <input
                  type="radio"
                  id={option._id}
                  name="option"
                  className="font-[Poppins] lg:w-3 lg:h-3 w-6 h-6 border-2 border-slate-400 mt-10 cursor-pointer"
                  value={option._id}
                  checked={selectedOption === option._id}
                  onChange={handleOptionChange}
                />
                <label
                  htmlFor={option._id}
                  className="font-[Poppins] lg:text-lg text-2xl ml-4 cursor-pointer"
                >
                  {option.option}
                </label>
              </div>
            ))}
          </div>
          <div className="font-[Poppins] flex lg:gap-24 gap-5 justify-center">
            <button
              onClick={handleBack}
              disabled={currentQuestionIndex === 0}
              className={`text-white lg:text-base md:text-3xl 
              flex justify-between items-center
              p-2 lg:w-28 md:w-48 w-32 rounded-md lg:mt-20 mt-32 mb-4 ${
                currentQuestionIndex === 0
                  ? "bg-gray cursor-not-allowed"
                  : "bg-[#006991] hover:bg-[#004766]"
              }`}
            >
              <TiArrowBackOutline className="font-[Poppins] bg-transparent text-white rounded-full lg:text-xl md:text-3xl" />{" "}
              Garuka{" "}
            </button>

            <button
              onClick={handleNext}
              disabled={currentQuestionIndex === examData.questions.length - 1}
              className={`text-white lg:text-xl md:text-3xl
              flex justify-between items-center
              p-2 lg:w-44 md:w-48 w-32 rounded-md lg:mt-20 mt-32 mb-4 ${
                currentQuestionIndex === examData.questions.length - 1
                  ? "bg-gray cursor-not-allowed"
                  : "bg-[#006991] hover:bg-[#004766]"
              }`}
            >
              {" "}
              Komeza{" "}
              <FaArrowRight className="font-[Poppins] bg-transparent text-white rounded-full lg:text-xl md:text-3xl" />
            </button>
            <button
              onClick={submitData}
              disabled={currentQuestionIndex === 0}
              className={`text-white lg:text-xl md:text-3xl
              flex justify-between items-center cursor-pointer
              p-2 lg:w-32 md:w-48 w-32 rounded-md lg:mt-20 mt-32 mb-4 ${
                currentQuestionIndex === 0
                  ? "bg-gray cursor-not-allowed"
                  : "bg-[#006991] hover:bg-[#004766]"
              }`}
            >
              {" "}
              Ohereza{" "}
              <GoPlus className="font-[Poppins] bg-transparent text-white rounded-full lg:text-xl md:text-3xl" />
            </button>
          </div>
          <div className="font-[Poppins] flex gap-10 justify-center text-xl font-bold cursor-pointer hover:text-[#006991]">
            <button onClick={clearLocalStorage}>Siba ibyo wasubije</button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ConductExam;
