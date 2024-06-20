import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../SharedComponents/Loader";
import Hello from "../Hello/Hello";

const FreeCategories = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    getCategoriesData();
  }, []);

  const getCategoriesData = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      // Handle scenario where token is not present (user is logged out)
      setIsLoading(false);
      setCategoriesData([]); // Clear any existing data
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:9000/api/v1/categories/all/free",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data;
      setCategoriesData(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="font-[Poppins] pt-10">
        <Hello />
        {isLoading && <Loader />}
        <section id="services">
          <div className="font-[Poppins] md:container px-0 py-8">
            <div className="font-[Poppins] flex gap-5 justify-between flex-wrap group">
              {categoriesData.length > 0 ? (
                categoriesData.map((category, id) => (
                  <div
                    key={id}
                    data-aos="fade-up"
                    data-aos-delay={id * 600}
                    className=""
                  >
                    <h6 className="font-[Poppins] text-lg text-extrabold w-full px-4">
                      Wemerewe imyitozo {category.examsNumber} itishyuzwa, nyuma
                      kukomeza kwimenyereza no kwagura ubumenyi biragusaba
                      kugura kode..
                    </h6>
                    <div className="font-[Poppins] flex justify-center items-center">
                      <Link to={`/users/exams/${category._id}`}>
                        <h6
                          className="font-[Poppins] my-3 text-[#006991] hover:text-[#D2691E] lg:text-xs md:text-lg text-medium font-bold"
                          onClick={(e) => {
                            // Handle click event if needed
                          }}
                        >
                          Reba Imyitozo
                        </h6>
                      </Link>
                    </div>
                  </div>
                ))
              ) : !isLoading ? (
                <p className="text-xl font-extrabold">Banza winjire......</p>
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FreeCategories;
