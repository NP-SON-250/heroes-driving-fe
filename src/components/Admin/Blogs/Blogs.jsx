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
import { Modal, Popconfirm } from "antd";
import Loader from "../../SharedComponents/Loader";

const AdminBlogs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [blogs, setBlogs] = useState({
    title: "",
    description: "",
    image: "",
  });

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
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
    if (event.target.name === "image") {
      setBlogs({ ...blogs, image: event.target.files[0] });
    } else {
      setBlogs({ ...blogs, [event.target.name]: event.target.value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", blogs.title);
    formData.append("description", blogs.description);
    formData.append("image", blogs.image);

    const token = localStorage.getItem("token");

    if (!token) {
      errors("Login first!!");
      return;
    }

    try {
      const response = await axios.post(
        `https://heroes-driving-be.onrender.com/api/v1/posts`,
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
          getBlogsData();
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

  // ============= fetching Blogs =================
  const [fetchedData, setFetchedData] = useState([]);
  useEffect(() => {
    getBlogsData();
  }, []);

  const getBlogsData = async () => {
    setIsLoading(true); // Set loading to true when fetching data
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "https://heroes-driving-be.onrender.com/api/v1/posts",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data;
      setFetchedData(data);
      setIsLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false); // Set loading to false in case of error
    }
  };

  // ================== delete Category =====================
  async function handleDeleteBlog(id) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `https://heroes-driving-be.onrender.com/api/v1/posts/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      success(response.data.message);
      getBlogsData();
    } catch (err) {
      console.error(err);
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString().replace(/\//g, "-");
    return formattedDate;
  };
  // ============ Edit Category =========

  const [blogDataEdit, setBlogDataEdit] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);

  function getSingleBlog(id) {
    axios
      .get(`https://heroes-driving-be.onrender.com/api/v1/posts/${id}`)
      .then((res) => setBlogDataEdit(res.data.data))
      .catch((err) => console.log(err));
  }

  const handleBlogUpdate = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", blogDataEdit.title);
    formData.append("description", blogDataEdit.description);
    formData.append("image", blogDataEdit.image);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `https://heroes-driving-be.onrender.com/api/v1/posts/${blogDataEdit._id}`,
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
        getBlogsData();
        setTimeout(() => {
          setIsBlogModalOpen(false);
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

  const showBlogModal = () => {
    setIsBlogModalOpen(true);
  };
  const handleBlogCancel = () => {
    setIsBlogModalOpen(false);
  };
  return (
    <>
      <div className=" font-[Poppins] ">
        <div
          className=" font-[Poppins] fixed z-20 flex justify-between items-center cursor-pointer bg-[#006991] p-2
      gap-5 rounded-md"
          onClick={togglePopup}
        >
          <button className="font-[Poppins] text-white  lg:text-xl md:text-3xl">
            Blogs
          </button>
          <GoPlus className=" font-[Poppins] bg-white text-[#006991] rounded-full lg:text-xl md:text-3xl" />
        </div>
        <h1 className="flex justify-center items-center md:text-3xl text-xl text-extrabold pt-12">
          Manage all blog posts..
        </h1>
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
                <Title TitleValue="Add Blogs 🙌" />
                <SubTitle SubTitleValue="Blog's Data" />
                <div className=" font-[Poppins] lg:w-[20rem] w-full px-4">
                  <Labels Label="Title" />
                  <input
                    type="text"
                    name="title"
                    placeholder="Title of Blog"
                    className=" font-[Poppins] text-[#006991] lg:w-[20rem] w-full lg:text-base
                  md:text-3xl border border-slate-600 
                  lg:p-2 md:p-4 p-2 mt-1 rounded-md 
                  "
                    onChange={handleInput}
                  />
                  <Labels Label="Descriptions" />
                  <input
                    type="text"
                    name="description"
                    placeholder="Description of blog"
                    className=" font-[Poppins] text-[#006991] lg:w-[20rem] w-full lg:text-base
                  md:text-3xl border border-slate-600 
                  lg:p-2 md:p-4 p-2 mt-1 rounded-md 
                  "
                    onChange={handleInput}
                  />
                  <Labels Label="Image" />
                  <input
                    type="file"
                    name="image"
                    placeholder="Duration of expires in days eg: 1 for one day"
                    className=" font-[Poppins] text-[#006991] lg:w-[20rem] w-full lg:text-base
                  md:text-3xl border border-slate-600 
                  lg:p-2 md:p-4 p-2 mt-1 rounded-md 
                  "
                    accept="image/*"
                    onChange={handleInput}
                  />
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

        {/* ===== Display Blogs===== */}
        <div className=" font-[Poppins] pt-10">
          {isLoading && <Loader />}
          <section id="services">
            <div className=" font-[Poppins] md:container px-0 py-8">
              <div className=" font-[Poppins] grid lg:grid-cols-2 grid-cols-1 gap-5 group">
                {fetchedData.length > 0 ? (
                  fetchedData.map((blogs, id) => (
                    <div
                      key={id}
                      data-aos="fade-up"
                      data-aos-delay={id * 600}
                      className=" font-[Poppins] lg:max-w-[25rem] duration-300 border-2 border-slate-200 rounded-xl text-center bg-bg_light_primary p-6 flex-1 group-hover:blur-sm hover:!blur-none"
                    >
                      <div className=" font-[Poppins] w-full h-[30vh] flex justify-center items-center rounded-full py-4">
                        <img
                          src={blogs.image}
                          alt="News"
                          className=" font-[Poppins] rounded-md"
                        />
                      </div>
                      <h6 className=" font-[Poppins] lg:text-lg md:text-3xl text-sm pt-5 text-extrabold">
                        Added On: {formatDate(blogs.addedOn)}
                      </h6>
                      <h6 className=" font-[Poppins] text-[#006991] lg:text-base text-sm md:text-3xl font-bold ">
                        {blogs.title}
                      </h6>
                      <p className=" font-[Poppins] lg:text-base md:text-2xl pt-2 text-extrabold ">
                        {blogs.description}
                      </p>

                      <div className=" font-[Poppins] flex lg:gap-52 md:gap-24 gap-16 lg:-ml-0 md:-ml-28 mt-4">
                        <button
                          className=" font-[Poppins] lg:w-10 md:w-14 cursor-pointer lg:h-10 md:h-14 w-10 h-10 rounded-full flex justify-center items-center py-4 lg:ml-[1rem] md:ml-[18rem] ml-12 bg-[#006991]"
                          title="Update Blog"
                          onClick={(e) => {
                            getSingleBlog(blogs._id);
                            showBlogModal();
                          }}
                        >
                          <MdOutlineEdit className=" font-[Poppins] text-white lg:text-base md:text-2xl" />
                        </button>
                        <Popconfirm
                          title="Delete Blog"
                          description="Are you sure to delete this Category?"
                          okText="Yes"
                          cancelText="No"
                          onConfirm={(e) => handleDeleteBlog(blogs._id)}
                        >
                          <button
                            className=" font-[Poppins] lg:w-10 md:w-14 cursor-pointer lg:h-10 md:h-14 w-10 h-10 rounded-full flex justify-center items-center py-4 lg:ml-2 md:ml-10 bg-red-600"
                            title="Delete Blog"
                          >
                            <RiDeleteBin6Line className=" font-[Poppins] text-white lg:text-base md:text-2xl" />
                          </button>
                        </Popconfirm>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No blog data available</p>
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
            open={isBlogModalOpen}
            onOk={handleBlogUpdate}
            onCancel={handleBlogCancel}
          >
            <div
              className=" font-[Poppins] absolute lg:top-[12px] lg:right-[12px] md:right-1 md:top-1 top-3 right-3 md:w-12 lg:w-8 lg:h-8 md:h-12 w-8 h-8 bg-[#006991] rounded-full flex justify-center items-center cursor-pointer"
              onClick={handleBlogCancel}
            >
              <AiOutlineClose className=" font-[Poppins] lg:text-base md:text-xl text-xl text-black" />
            </div>
            <div className=" font-[Poppins] add__dimension">
              <form onSubmit={handleBlogUpdate}>
                <div className=" font-[Poppins] flex flex-col lg:justify-center items-center">
                  <Title TitleValue="Edite Blog 🙌" />
                  <SubTitle SubTitleValue="Blog's Data" />
                </div>
                <div className=" font-[Poppins]">
                  <div>
                    <Labels Label="Title" />

                    <input
                      type="text"
                      id="title"
                      value={blogDataEdit.title}
                      name="title"
                      placeholder="Titlr of blog"
                      className=" font-[Poppins] text-[#006991] w-full lg:text-base
                      md:text-3xl border border-slate-600 
                      lg:p-2 md:p-4 p-2 mt-1 rounded-md 
                      "
                      onChange={(e) => {
                        setBlogDataEdit({
                          ...blogDataEdit,
                          title: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div>
                    <Labels Label="Description" />

                    <input
                      type="text"
                      id="description"
                      value={blogDataEdit.description}
                      name="description"
                      placeholder="Blog description"
                      className=" font-[Poppins] text-[#006991] w-full lg:text-base
                      md:text-3xl border border-slate-600 
                      lg:p-2 md:p-4 p-2 mt-1 rounded-md 
                      "
                      onChange={(e) => {
                        setBlogDataEdit({
                          ...blogDataEdit,
                          description: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div>
                    <Labels Label="Image" />

                    <input
                      type="file"
                      id="duration"
                      accept="image/*"
                      name="image"
                      className=" font-[Poppins] text-[#006991] w-full lg:text-base
                      md:text-3xl border border-slate-600 
                      lg:p-2 md:p-4 p-2 mt-1 rounded-md 
                      "
                      onChange={(e) => {
                        setBlogDataEdit({
                          ...blogDataEdit,
                          image: e.target.files[0],
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
      </div>
      <ToastContainer />
    </>
  );
};

export default AdminBlogs;
