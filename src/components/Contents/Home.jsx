import React, { createElement, useRef } from "react";
import { Contents } from "../SharedComponents/Content";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import Button from "../Buttons/Button";
import FreeCategories from "../FreeCategories/FreeCategories";
const Home = () => {
  const { services } = Contents;
  const { News } = Contents;

  const { Contact } = Contents;
  const form = useRef();

  // Sending Email
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_cb17jsj",
        "template_fdhf7y3",
        form.current,
        "qqqTfRTvIE39HYr3H"
      )
      .then(
        (result) => {
          console.log(result.text);
          form.current.reset();
          toast.success("Email sent successfully");
        },
        (error) => {
          console.log(error.text);
          toast.error("Failed to send email");
        }
      );
  };
  return (
    <>
      <div>
        <FreeCategories />
        <div className=" font-[Poppins] flex justify-center pt-4">
          <div>
            <h1 className=" font-[Poppins] text-2xl font-extrabold  capitalize text-[#1D1F30] text-center">
              Ibyerekeye Heroes College
            </h1>
            <p className=" font-[Poppins] flex justify-center pl-4 ">
              "Ikigo cy’ubwiganze, ubuhanga, n’udushya mu kwagura ubumenyi
              bw’amtegeko y’umuhanda"
            </p>
            <div className=" font-[Poppins] flex justify-center pt-2">
              <span className=" font-[Poppins] bg-[#006991] md:w-56 w-24 h-[2px] rounded-full"></span>
              <span className=" font-[Poppins] bg-[#006991] md:w-48 w-24 h-[8px] mt-[-3px] rounded-full"></span>
              <span className=" font-[Poppins] bg-[#006991] md:w-56 w-24 h-[2px] rounded-full"></span>
            </div>
          </div>
        </div>
        <section id="services">
          <div className=" font-[Poppins] md:container px-5 py-14">
            <div className=" font-[Poppins] flex gap-5 justify-between flex-wrap group">
              {services.service_content.map((content, i) => (
                <div
                  key={i}
                  data-aos="fade-up"
                  data-aos-delay={i * 600}
                  className=" font-[Poppins] min-w-[14rem] duration-300 cursor-pointer border-2 border-slate-200 rounded-xl text-center bg-bg_light_primary p-6 flex-1 group-hover:blur-sm 
                  hover:!blur-none"
                >
                  <div className=" font-[Poppins] bg-[#006991] w-10 h-10 lg:ml-[6rem] ml-[7rem] flex justify-center items-center rounded-full py-4">
                    <p className=" font-[Poppins] text-white items-center text-lg font-extrabold">
                      {content.logo}
                    </p>
                  </div>
                  <h6 className=" font-[Poppins] my-3 text-[#006991] text-medium font-bold ">
                    {content.title}
                  </h6>
                  <p className=" font-[Poppins] leading-7 ">{content.para}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className=" font-[Poppins] flex justify-center pt-4">
          <div>
            <h1 className=" font-[Poppins]  text-2xl font-extrabold  capitalize text-[#1D1F30] text-center">
              Amakuru agezweho
            </h1>
            <p className=" font-[Poppins] flex justify-center pl-4 ">
              "Aya ni amakuru agezweho kandi yagufasha kwigira no kubona
              provisoire"
            </p>
            <div className=" font-[Poppins] flex justify-center pt-2">
              <span className=" font-[Poppins] bg-[#006991] md:w-56 w-24 h-[2px] rounded-full"></span>
              <span className=" font-[Poppins] bg-[#006991] md:w-48 w-24 h-[8px] mt-[-3px] rounded-full"></span>
              <span className=" font-[Poppins] bg-[#006991] md:w-56 w-24 h-[2px] rounded-full"></span>
            </div>
          </div>
        </div>
        <section id="services">
          <div className=" font-[Poppins] md:container px-5 py-14">
            <div className=" font-[Poppins] flex gap-5 justify-between flex-wrap group">
              {News.import_News.map((news, i) => (
                <div
                  key={i}
                  data-aos="fade-up"
                  data-aos-delay={i * 600}
                  className=" font-[Poppins] min-w-[14rem] duration-300 cursor-pointer border-2 border-slate-200 rounded-xl text-center bg-bg_light_primary p-6 flex-1 group-hover:blur-sm 
                  hover:!blur-none"
                  >
                  <div className=" font-[Poppins] w-full h-[30vh] flex justify-center items-center rounded-full py-4">
                    <img
                      src={news.image}
                      alt="News"
                      className=" font-[Poppins] rounded-md"
                    />
                  </div>
                  <h6 className=" font-[Poppins] text-gray-700 text-lg pt-5 text-extrabold ">
                    Added On: {news.date}
                  </h6>
                  <h6 className=" font-[Poppins] my-3 text-[#006991] text-medium font-bold ">
                    {news.heading}
                  </h6>
                  <p className=" font-[Poppins] leading-7 ">{news.para}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className=" font-[Poppins] bg-white text-dark_primary"
          id="contact"
        >
          <Toaster />
          <div className=" font-[Poppins] md:container px-5 py-14 text-center">
            <h4 className=" font-[Poppins] subtitle " data-aos="fade-down">
              {Contact.subtitle}
            </h4>
            <h2
              className=" font-[Poppins] title !text-dark_primary "
              data-aos="fade-down"
            >
              {Contact.title}
            </h2>
            <br />
            <div className=" font-[Poppins] flex gap-10 lg:flex-row flex-col lg:pl-96 ">
              <form
                ref={form}
                onSubmit={sendEmail}
                data-aos="fade-up"
                className=" font-[Poppins] flex-1 flex flex-col gap-5 justify-center"
              >
                <input
                  type="text"
                  name="from_name"
                  placeholder="Amazina yawe yombi"
                  required
                  className=" font-[Poppins] border border-slate-600 p-3 rounded "
                />
                <input
                  type="email"
                  name="user_email"
                  placeholder="Emeri yawe"
                  required
                  className=" font-[Poppins] border border-slate-600 p-3 rounded "
                />
                <textarea
                  name="message"
                  placeholder="Ikibazo cyagwa inyunganizi"
                  className=" font-[Poppins] border border-slate-600 p-3 rounded h-44 "
                  required
                ></textarea>
                <Button>Ohereza</Button>
              </form>
              <div className=" font-[Poppins] flex-1 flex lg:flex-col flex-row gap-5 justify-center">
                {Contact.social_media.map((content, i) => (
                  <div
                    key={i}
                    data-aos="fade-down"
                    data-aos-delay={i * 430}
                    title={content.title}
                    className=" font-[Poppins] flex items-center gap-2"
                  >
                    <a
                      className=" font-[Poppins]"
                      href={content.link}
                      target="_blank"
                    >
                      <h4 className=" font-[Poppins] text-dark_primary ">
                        {createElement(content.icon)}
                      </h4>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
