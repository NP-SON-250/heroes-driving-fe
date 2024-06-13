import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Hello from "../Hello/Hello";
const UserPaidExams = () => {
  const [examData, setExamData] = useState([]);
  const [hasResponded, setHasResponded] = useState(false);
  const navigate = useNavigate();

  const getExamData = async () => {
    const token = localStorage.getItem("token");
    // Check if token exists
    if (!token) {
      // Handle the case where the user is not logged in
      setExamData([]);
      return;
    }
    try {
      const response = await axios.get(
        "https://heroes-driving-be.onrender.com/api/v1/exams/all/paid",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201 && response.data.message.includes("")) {
        setHasResponded(true);
      } else if (response.status === 200) {
        const data = response.data.data;
        setExamData(data);
      }
    } catch (error) {
      console.error("Error fetching exam data:", error);
    }
  };

  useEffect(() => {
    getExamData();
  }, []);

  const getSingleExamTo = async (id) => {
    const token = localStorage.getItem("token");
    try {
      if (!token) {
        navigate("/login");
      } else {
        const response = await axios.get(
          `https://heroes-driving-be.onrender.com/api/v1/exams/single/${id}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        navigate(`/users/conduct/${id}`);
      }
    } catch (error) {
      console.error("Error fetching single exam data:", error);
    }
  };

  return (
    <div className="font-[Poppins]">
      <Hello/>
      <div className="font-[Poppins] pt-10">
        <section id="services">
          <div className="font-[Poppins] md:container px-0 py-8 flex justify-center">
            <div className="font-[Poppins] flex gap-5 justify-between flex-wrap group">
              {examData.length > 0 ? (
                examData.map((news, id) => (
                  <div
                    key={id}
                    data-aos="fade-up"
                    data-aos-delay={id * 600}
                    className="font-[Poppins] min-w-[20rem] duration-300 border-2 border-slate-200 rounded-xl text-center bg-bg_light_primary p-6 flex-1 group-hover:blur-sm hover:!blur-none"
                  >
                    <p className="font-[Poppins] text-2xl text-[#006991] w-full">
                      {news.title}
                    </p>
                    <h6 className="font-[Poppins] text-gray-700 text-lg pt-5 text-extrabold ">
                      Amanota: {news.marks}
                    </h6>
                    <h6 className="font-[Poppins] text-gray-700 text-lg pt-5 text-extrabold ">
                      Muminota: {news.time}
                    </h6>
                    <h6 className="font-[Poppins] my-3 text-[#006991] lg:text-xs md:text-lg text-medium font-bold ">
                      Ibibazo: {news.questions ? news.questions.length : 0}
                    </h6>
                    <div className="font-[Poppins] flex gap-5 cursor-pointer">
                      <h6
                        className={`font-[Poppins] my-3 text-[#006991] lg:text-xs md:text-lg text-medium font-bold ${
                          news.questions && news.questions.length === 0
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
                  <p className=" text-center text-xl">
                    Kode yawe ibizamini ntarengwa yemerewe byageze, <br />
                    <Link to={"/getcode"} className="text-[#006991] pr-2">
                      gura indi
                    </Link>
                    urahabwa inyongera y'ibizamini bibiri. <br />
                    Niba ushaka kumenya amanota wagize <br /> mubizamini wakoze,
                    <Link to={"responses"} className="text-[#006991] pl-2">
                      kanda hano.
                    </Link>
                  </p>
                </div>
              ) : (
                <p className=" text-center">
                  Injira kuri sisitemu ubone amakuru y'ibizamini
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserPaidExams;
