import React, { useState, useEffect } from "react";
import Footer from "../../Footer/Footer";
import { Title, SubTitle, Labels } from "../../SharedComponents/Inputs";
import { AiOutlineClose } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineEdit } from "react-icons/md";
import { Modal } from "antd";
import Loader from "../../SharedComponents/Loader";

const Notifications = () => {
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

  // Fetching Notifications
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `https://heroes-driving-be.onrender.com/api/v1/notifications/notify`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.data;
      setNotifications(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString().replace(/\//g, "-");
    return formattedDate;
  };

  // Edit Option
  const [editPayment, setEditPayment] = useState({
    code: "",
    status: "",
  });
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const getSinglePayment = (code) => {
    axios
      .get(`https://heroes-driving-be.onrender.com/api/v1/payments/all/${code}`)
      .then((res) => {
        const paymentData = res.data.data[0];
        setEditPayment({
          ...paymentData,
          status: paymentData.status,
        });
        setIsPaymentModalOpen(true);
      })
      .catch((err) => console.log(err));
  };

  const handlePaymentUpdate = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("status", editPayment.status);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `https://heroes-driving-be.onrender.com/api/v1/payments/${editPayment.code}`,
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
        getNotifications();
        setTimeout(() => {
          setIsPaymentModalOpen(false);
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

  const handlePaymentCancel = () => {
    setIsPaymentModalOpen(false);
  };

  return (
    <div>
      {/* Display notifications */}
      <div className="font-[Poppins] pt-10">
        {isLoading && <Loader />}
        <section id="services">
          <div className="font-[Poppins] md:container px-0 py-8">
            <div className="font-[Poppins] flex gap-5 justify-between flex-wrap group">
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <div
                    key={index}
                    data-aos="fade-up"
                    data-aos-delay={index * 600}
                    className="font-[Poppins] min-w-[18rem] duration-300 border-2 border-slate-200 rounded-xl text-center bg-bg_light_primary p-6 flex-1 group-hover:blur-sm hover:!blur-none"
                  >
                    <h6 className="flex flex-col justify-center items-center text-base font-[Poppins] py-4 capitalize">
                      Umwirondoro w'uwishyuye
                    </h6>

                    <p className="font-[Poppins] text-base text-[#006991] w-full">
                      {notification.names}
                    </p>
                    <h6 className="font-[Poppins] text-gray-700 text-lg pt-5 text-extrabold">
                      {notification.phone}
                    </h6>
                    <h6 className="font-[Poppins] text-gray-700 text-lg pt-5 text-extrabold">
                      Code: {notification.code}
                    </h6>
                    <h6 className="font-[Poppins] text-gray-700 text-lg pt-5 text-extrabold">
                      Status: {notification.status}
                    </h6>
                    <h6 className="font-[Poppins] text-gray-700 text-lg pt-5 text-extrabold">
                      Date: {formatDate(notification.paidOn)}
                    </h6>
                    <div className="font-[Poppins]">
                      <div className="font-[Poppins] flex justify-center items-center py-5">
                        <button
                          className="font-[Poppins] lg:w-10 md:w-14 cursor-pointer lg:h-10 md:h-14 w-10 h-10 rounded-full flex justify-center items-center py-4 lg:ml-[5rem] md:ml-[18rem] ml-12 bg-[#006991]"
                          title="Update option"
                          onClick={() => getSinglePayment(notification.code)}
                        >
                          <MdOutlineEdit className="font-[Poppins] text-white lg:text-base md:text-2xl" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No pending notifications</p>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Edit model */}
      <div className="font-[Poppins] fixed z-20">
        <Modal
          style={{
            top: 100,
          }}
          open={isPaymentModalOpen}
          onOk={handlePaymentUpdate}
          onCancel={handlePaymentCancel}
        >
          <div
            className="font-[Poppins] absolute lg:top-[12px] lg:right-[12px] md:right-1 md:top-1 top-3 right-3 md:w-12 lg:w-8 lg:h-8 md:h-12 w-8 h-8 bg-[#006991] rounded-full flex justify-center items-center cursor-pointer"
            onClick={handlePaymentCancel}
          >
            <AiOutlineClose className="font-[Poppins] lg:text-base md:text-xl text-xl text-black" />
          </div>
          <div className="font-[Poppins] add__dimension">
            <form onSubmit={handlePaymentUpdate}>
              <div className="font-[Poppins] flex flex-col lg:justify-center items-center">
                <Title TitleValue="Edit Payment 🙌" />
                <SubTitle SubTitleValue="Edit Payment Status" />
              </div>
              <div className="font-[Poppins]">
                <div>
                  <Labels Label="Status" />
                  <select
                    name="status"
                    value={editPayment.status}
                    className="font-[Poppins] text-[#006991] w-full lg:text-base md:text-3xl border border-slate-600 lg:p-2 md:p-4 p-2 mt-1 rounded-md"
                    onChange={(e) => {
                      setEditPayment({
                        ...editPayment,
                        status: e.target.value,
                      });
                    }}
                  >
                    <option value="Ntiremeza">Ntiremeza</option>
                    <option value="Yemejwe">Yemejwe</option>
                  </select>
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

export default Notifications;
