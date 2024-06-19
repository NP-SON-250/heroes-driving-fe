import React, { useState, useEffect } from "react";
import axios from "axios";

const ExamResponses = () => {
  const [exam, setExam] = useState();
  const [visibleResponses, setVisibleResponses] = useState({});

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

  if (!exam) {
    return <div>Loading...</div>;
  }

  if (exam.data.length === 0) {
    return (
      <div className="text-center text-xl">No exam responses available.</div>
    );
  }

  return (
    <div className="flex justify-center flex-col items-center pt-10">
      <p className="text-3xl font-[Poppins] pb-3 font-extrabold">
        {exam.message}
      </p>
      {exam.data.map((Mexam, id) => (
        <div
          key={id}
          className="flex flex-col justify-center items-center mb-4"
        >
          <div
            data-aos="fade-up"
            data-aos-delay={id * 600}
            className="font-[Poppins] min-w-[20rem] duration-300 border-2
           border-slate-200 rounded-xl text-center bg-bg_light_primary 
           p-6 flex-1 group-hover:blur-sm hover:!blur-none"
          >
            <h3 className="font-[Poppins] text-3xl pb-3">{Mexam.title}</h3>
            <p className="text-xl pb-4">Icyikiro: Ubuntu</p>
            <p className="text-xl pb-4">Muminota: {Mexam.time}</p>
            <p className="text-lg pb-4">Amanota y'ikizami: {Mexam.marks}</p>
            <p className="text-lg pb-4">
              Wakibonyemo:{" "}
              <span className="font-bold">{Mexam.totalPoints} Kuri 20</span>
            </p>
            <p>Cyakozwe: {new Date(Mexam.submittedAt).toLocaleString()}</p>
            <button
              onClick={() => toggleResponses(id)}
              className="text-start text-xl text-[#006991] -ml-[6rem] pt-5"
            >
              {visibleResponses[id] ? "Hisha ibisubizo" : "Garagaza ibisubizo"}
            </button>
          </div>
          {visibleResponses[id] && (
            <div
              data-aos="fade-up"
              data-aos-delay={id * 600}
              className="font-[Poppins] max-w-[50rem] duration-300 border-2
            border-slate-200 rounded-xl text-center bg-bg_light_primary 
            p-6  group-hover:blur-sm hover:!blur-none mt-10"
            >
              <h3 className="font-[Poppins] text-center text-3xl font-extrabold">
                Uko wakoze, ibibazo n' ibisubizo
              </h3>
              {Mexam.responses.map((response, index) => (
                <div key={index} className="">
                  <p className="text-start p-2 lg:text-base md:text-xl text-lg">
                    <strong className="mr-1">{index + 1}:</strong>{" "}
                    {response.question}
                  </p>
                  <p className="text-start p-2 lg:text-base md:text-xl text-lg">
                    <strong className="mr-1 ab">Wasubije:</strong>{" "}
                    {response.selectedOption.option}
                  </p>
                  <p className="text-start p-2 lg:text-base md:text-xl text-lg">
                    <strong className="mr-1">Amanota:</strong>{" "}
                    {response.selectedOption.points}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExamResponses;
