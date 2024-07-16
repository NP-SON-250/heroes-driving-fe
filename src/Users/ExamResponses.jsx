import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/SharedComponents/Loader";
import { FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FaBackward, FaForward } from "react-icons/fa";

// Utility function to calculate time difference
const timeDifference = (timestamp) => {
  const now = new Date();
  const submissionTime = new Date(timestamp);
  const diffInSeconds = Math.floor((now - submissionTime) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} days ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} months ago`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} years ago`;
};

const ExamResponses = () => {
  const [exam, setExam] = useState();
  const [visibleResponses, setVisibleResponses] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://heroes-driving-be.onrender.com/api/v1/newresponses/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setExam(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const toggleResponses = (id) => {
    setVisibleResponses((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleNext = () => {
    if (currentIndex < exam.data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (!exam) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (exam.data.length === 0) {
    return (
      <div className="text-center text-xl">Ntabwo ibisubizo biraboneka.</div>
    );
  }

  const Mexam = exam.data[currentIndex];

  return (
    <div className="lg:py-14 md:py-52 py-20">
      <div className="flex justify-center items-center">
        <p className="md:text-3xl text-base font-[Poppins] lg:pb-5 md:pb-24 pb-5 font-extrabold capitalize">
          Urutonde rw'inyitozo umaje gukora
        </p>
      </div>
      <div className="grid grid-cols-1">
        <div
          key={currentIndex}
          className="mb-4 lg:py-0 md:py-12 lg:ml-[27rem]  md:px-0 px-2"
        >
          <div
            data-aos="fade-up"
            data-aos-delay={currentIndex * 600}
            className="font-[Poppins] lg:max-w-[24rem] md:max-w-[30rem] duration-300 border-2
           border-slate-200 rounded-xl text-center bg-bg_light_primary 
           p-6 group-hover:blur-sm hover:!blur-none lg:ml-0 md:ml-[12rem]"
          >
            <h3 className="font-[Poppins] text-xl font-semibold pb-3">
              {Mexam.title}
            </h3>
            <p className="text-lg pb-1">
              Cyakozwe:{" "}
              <span className="font-bold">
                {timeDifference(Mexam.submittedAt)}
              </span>
            </p>
            <p className="text-lg pb-1">
              Wabonye:{" "}
              <span className="font-bold">
                {Mexam.totalPoints} / {Mexam.responses.length}
              </span>
            </p>
            <div className="ml-32">
              <button
                onClick={() => toggleResponses(currentIndex)}
                className="text-start text-xl text-[#006991] -ml-[6rem] pt-2 hover:text-[#D2691E]"
              >
                {visibleResponses[currentIndex]
                  ? "Hisha ibisubizo"
                  : "Garagaza ibisubizo"}
              </button>
            </div>
          </div>
          <div className="flex md:gap-[17rem] gap-[6rem] mt-5 lg:ml-5 ml-14 md:ml-[15rem] ">
            <button
              onClick={handlePrevious}
              className="bg-[#006991] text-white px-4 py-2 rounded disabled:bg-[#909699]"
              disabled={currentIndex === 0}
            >
              <FaBackward />
            </button>
            <button
              onClick={handleNext}
              className="bg-[#006991] text-white px-4 py-2 rounded disabled:bg-[#909699]"
              disabled={currentIndex === exam.data.length - 1}
            >
              <FaForward />
            </button>
          </div>
          {visibleResponses[currentIndex] && (
            <div
              data-aos="fade-up"
              data-aos-delay={currentIndex * 600}
              className="font-[Poppins] duration-300 p-3 group-hover:blur-sm hover:!blur-none mt-10 lg:ml-[-10rem] md:ml-[5rem]"
            >
              <h3 className="font-[Poppins] text-start md:text-3xl text-base pb-5 font-extrabold">
                Uko wakoze, ibibazo n' ibisubizo
              </h3>
              {Mexam.responses.map((response, index) => {
                const correctOption = Mexam.correctOptionId.find(
                  (option) => option.questionId === response._id
                );
                const isCorrect =
                  response.selectedOption._id === correctOption._id;
                return (
                  <div key={index} className="">
                    <p className="text-start p-2 lg:text-base md:text-xl text-lg">
                      <strong className="mr-1">{index + 1}:</strong>{" "}
                      {response.question}
                    </p>
                    <div className="flex items-start">
                      <p className="text-start p-2 lg:text-base md:text-xl text-lg ">
                        <strong className="mr-1">Wasubije:</strong>{" "}
                        {response.selectedOption.option}
                        {isCorrect ? (
                          <FaCheck className="text-green-500 ml-2" />
                        ) : (
                          <IoMdClose className="text-red-500 ml-2" />
                        )}
                      </p>
                    </div>
                    <p className="text-start p-2 lg:text-base md:text-xl text-lg">
                      <strong className="mr-1">Amanota:</strong>{" "}
                      {response.selectedOption.points}
                    </p>
                    <p className="text-start p-2 lg:text-base md:text-xl text-lg">
                      <strong className="mr-1">Igisubizo Nyacyo:</strong>{" "}
                      {correctOption ? correctOption.option : "N/A"}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamResponses;
