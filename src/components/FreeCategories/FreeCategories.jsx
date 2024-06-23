import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Hello from "../Hello/Hello";
import Loader from "../SharedComponents/Loader";
import { FaBackward, FaForward } from "react-icons/fa";

const FreeCategories = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [examData, setExamData] = useState([]);
  const [paidExams, setPaidExams] = useState([]);
  const [hasResponded, setHasResponded] = useState(false);
  const [code, setCode] = useState("");
  const [isValidCode, setIsValidCode] = useState(false);
  const [showNoDataMessage, setShowNoDataMessage] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paidCurrentIndex, setPaidCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(1); // Default to 1 item for small/medium devices
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user login status
  const navigate = useNavigate();

  // Handle screen resizing to set itemsToShow
  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(window.innerWidth >= 1024 ? 3 : 1);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Check if user is logged in on component mount
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
    getExamData();
  }, []);

  // Fetch exam data for free exams
  const getExamData = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      setExamData([]);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:9000/api/v1/exams/freeExams",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (
        response.status === 201 &&
        response.data.message.includes(
          "Wasoje gukora ikizamini cy'ubuntu, gura kode"
        )
      ) {
        setHasResponded(true);
      } else if (response.status === 200) {
        setExamData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching exam data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSingleExamTo = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await axios.get(`http://localhost:9000/api/v1/exams/single/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      navigate(`/users/conduct/${id}`);
    } catch (error) {
      console.error("Error fetching single exam data:", error);
    }
  };

  const getPaidExams = async (code) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:9000/api/v1/payments/all/${code}`
      );
      if (response.status === 200) {
        const exams = response.data.data.flatMap((payment) =>
          payment.paidCategory.exams.filter((exam) => exam.questions.length > 0)
        );
        setPaidExams(exams);
        setShowNoDataMessage(exams.length === 0);
      }
    } catch (error) {
      console.error("Error fetching paid exams:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeChange = (e) => {
    const inputCode = e.target.value;
    setCode(inputCode);

    // Validate the code format
    const codePattern = /^[A-Z0-9]{4}-[A-Z0-9]{4}$/;
    setIsValidCode(codePattern.test(inputCode));
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    if (isValidCode) {
      getPaidExams(code);
    }
  };

  const handleNext = () => {
    if (currentIndex + itemsToShow < examData.length) {
      setCurrentIndex(currentIndex + itemsToShow);
    }
  };

  const handlePrevious = () => {
    if (currentIndex - itemsToShow >= 0) {
      setCurrentIndex(currentIndex - itemsToShow);
    }
  };

  const handlePaidNext = () => {
    if (paidCurrentIndex + itemsToShow < paidExams.length) {
      setPaidCurrentIndex(paidCurrentIndex + itemsToShow);
    }
  };

  const handlePaidPrevious = () => {
    if (paidCurrentIndex - itemsToShow >= 0) {
      setPaidCurrentIndex(paidCurrentIndex - itemsToShow);
    }
  };

  return (
    <>
      <div className="font-[Poppins]">
        <Hello />
        {isLoading && <Loader />}
        <div className="font-[Poppins] ">
          <section id="services">
            <h6 className="flex flex-col justify-center items-center text-base font-[Poppins] py-4 capitalize">
              imyitozo itishyuzwa wemerewe
            </h6>
            <div className="font-[Poppins] md:container px-4">
              <div className="font-[Poppins] flex gap-5 justify-center flex-wrap group">
                {examData.length > 0 ? (
                  examData
                    .slice(currentIndex, currentIndex + itemsToShow)
                    .map((news, id) => (
                      <div
                        key={id}
                        data-aos="fade-up"
                        data-aos-delay={id * 600}
                        className="font-[Poppins] lg:min-w-[20rem] md:max-w-[30rem] min-w-[20rem] duration-300 border-2 border-slate-200 rounded-xl text-center bg-bg_light_primary p-6 flex-1 group-hover:blur-sm hover:!blur-none"
                      >
                        <p className="font-[Poppins] text-xl text-[#006991]">
                          {news.title}
                        </p>
                        <h6 className="font-[Poppins] text-lg pt-2 text-extrabold ">
                          Amanota: {news.marks}
                        </h6>
                        <h6 className="font-[Poppins] text-lg pt-2 text-extrabold ">
                          Muminota: {news.time}
                        </h6>
                        <h6 className="font-[Poppins] my-1 text-[#006991] lg:text-xs md:text-lg text-medium font-bold ">
                          Ibibazo: {news.questions ? news.questions.length : 0}
                        </h6>
                        <div className="font-[Poppins] flex gap-5 cursor-pointer">
                          <h6
                            className={`font-[Poppins] my-1 text-[#006991] lg:text-xs md:text-lg text-medium font-bold ${
                              news.questions && news.questions.length <= 0
                                ? "cursor-not-allowed text-gray"
                                : "cursor-pointer"
                            }`}
                            onClick={() => {
                              if (news.questions && news.questions.length > 0) {
                                getSingleExamTo(news._id);
                              }
                            }}
                          >
                            Kora ikizamini
                          </h6>
                        </div>
                      </div>
                    ))
                ) : hasResponded ? (
                  <div>
                    <h6 className="flex flex-col justify-center items-center text-base font-[Poppins] py-4">
                      Imyitozo itishyuzwa wemerewe rwarangiye.{" "}
                      <span className="px-4 text-[#006991] hover:text-[#D2691E]">
                        Gura Kode
                      </span>
                    </h6>
                  </div>
                ) : (
                  <p className="text-center">
                    Injira kuri sisitemu kugirango utangire gukora imyitozo
                  </p>
                )}
              </div>
              {examData.length > itemsToShow && (
                <div className="flex justify-center mt-4 gap-12">
                  <button
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className={`py-2 px-4 text-white rounded ${
                      currentIndex === 0
                        ? "bg-[#909699] cursor-not-allowed"
                        : "bg-[#006991]"
                    }`}
                  >
                    <FaBackward />
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentIndex + itemsToShow >= examData.length}
                    className={`py-2 px-4 ml-4 text-white rounded ${
                      currentIndex + itemsToShow >= examData.length
                        ? "bg-[#909699] cursor-not-allowed"
                        : "bg-[#006991]"
                    }`}
                  >
                    <FaForward />
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
        {isLoggedIn && ( // Check if user is logged in before rendering paid exams section
          <div>
            <section id="services">
              <h6 className="flex flex-col justify-center items-center text-base font-[Poppins] py-4 capitalize">
                shyiramo kode kugirango ukore imyitozo yishyuwe
              </h6>
              <div className="flex flex-col md:items-center items-start md:ml-0 ml-8">
                <form onSubmit={handleCodeSubmit} className="flex items-center">
                  <input
                    type="text"
                    placeholder="Shyiramo Kode"
                    value={code}
                    onChange={handleCodeChange}
                    className="lg:min-w-[20rem] md:min-w-[30rem] max-w-[17rem] lg:text-base md:text-2xl text-xl border-2 border-gray rounded-full bg-transparent lg:py-2 md:py-[1.1rem] py-[0.6rem] text-start px-5 "
                  />
                  <button
                    type="submit"
                    disabled={!isValidCode}
                    className={`lg:py-[10px] md:py-[17.8px] py-[13.4px] px-2 rounded-e-full absolute lg:left-[45.8rem] md:left-[36rem] left-[15rem] lg:text-base md:text-3xl font-extrabold ${
                      !isValidCode
                        ? "bg-gray text-[#004766] cursor-not-allowed"
                        : "bg-[#006991] text-gray hover:bg-[#004766]"
                    }`}
                  >
                    Search
                  </button>
                </form>
              </div>
              {showNoDataMessage && (
                <p className="text-center mt-4">
                  Nta myitozo ibonetse kuri iyi kode.
                </p>
              )}
              <div className="font-[Poppins] md:container px-4 py-4">
                <div className="font-[Poppins] flex gap-5 justify-center flex-wrap group">
                  {paidExams.length > 0 &&
                    paidExams
                      .slice(paidCurrentIndex, paidCurrentIndex + itemsToShow)
                      .map((exam, id) => (
                        <div
                          key={id}
                          data-aos="fade-up"
                          data-aos-delay={id * 600}
                          className="font-[Poppins] lg:min-w-[20rem] md:max-w-[30rem] min-w-[20rem] duration-300 border-2 border-slate-200 rounded-xl text-center bg-bg_light_primary p-6 flex-1 group-hover:blur-sm hover:!blur-none"
                        >
                          <p className="font-[Poppins] text-xl text-[#006991]">
                            {exam.title}
                          </p>
                          <h6 className="font-[Poppins] text-lg pt-2 text-extrabold ">
                            Amanota: {exam.marks}
                          </h6>
                          <h6 className="font-[Poppins] text-lg pt-2 text-extrabold ">
                            Muminota: {exam.time}
                          </h6>
                          <h6 className="font-[Poppins] my-1 text-[#006991] lg:text-xs md:text-lg text-medium font-bold ">
                            Ibibazo: {exam.questions ? exam.questions.length : 0}
                          </h6>
                          <div className="font-[Poppins] flex gap-5 cursor-pointer">
                            <h6
                              className={`font-[Poppins] my-1 text-[#006991] lg:text-xs md:text-lg text-medium font-bold ${
                                exam.questions && exam.questions.length <= 0
                                  ? "cursor-not-allowed text-gray"
                                  : "cursor-pointer"
                              }`}
                              onClick={() => {
                                if (exam.questions && exam.questions.length > 0) {
                                  getSingleExamTo(exam._id);
                                }
                              }}
                            >
                              Kora ikizamini
                            </h6>
                          </div>
                        </div>
                      ))}
                </div>
                {paidExams.length > itemsToShow && (
                  <div className="flex justify-center mt-4 gap-12">
                    <button
                      onClick={handlePaidPrevious}
                      disabled={paidCurrentIndex === 0}
                      className={`py-2 px-4 text-white rounded ${
                        paidCurrentIndex === 0
                          ? "bg-[#909699] cursor-not-allowed"
                          : "bg-[#006991]"
                      }`}
                    >
                      <FaBackward />
                    </button>
                    <button
                      onClick={handlePaidNext}
                      disabled={
                        paidCurrentIndex + itemsToShow >= paidExams.length
                      }
                      className={`py-2 px-4 ml-4 text-white rounded ${
                        paidCurrentIndex + itemsToShow >= paidExams.length
                          ? "bg-[#909699] cursor-not-allowed"
                          : "bg-[#006991]"
                      }`}
                    >
                      <FaForward />
                    </button>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </>
  );
};

export default FreeCategories;
