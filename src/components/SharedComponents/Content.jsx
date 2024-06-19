import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import News1 from "../../assets/News1.jpg";
import News5 from "../../assets/News5.png";
import News3 from "../../assets/News3.jpg";
import News4 from "../../assets/News4.jpg";
import { GrMail, GrGithub, GrLinkedin } from "react-icons/gr";
import {
  BsWhatsapp,
  BsInstagram,
  BsPeopleFill,
  BsFolder2Open,
} from "react-icons/bs";
import { FaBlog, FaQuestion } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { AiOutlinePayCircle } from "react-icons/ai";
export const Contents = {
  services: {
    service_content: [
      {
        title: "Intego n'indangagaciro zacu:",
        para: "Intego yacu ni ukugufasha gusobanukirwa no kwimenyereza uko wakora ikizamini cyanditse cy'amategeko y'umuhanda. Tunaguha ibitabo wakwifashisha wiga cyangwa witegura ikizamini. ",
        logo: <AiOutlineCheck />,
      },
      {
        title: "Serivise ugenewe:",
        para: "Wakwimenyereza uburyo ikizamini gikorwa, Wasoma bimwe mubitabo bigaragara kuri iyi webusayite, wanabaza ibibazo kandi ugasubizwa ntucikwe!!",
        logo: <AiOutlineCheck />,
      },
      {
        title: "Uburyo wabona izi serivise:",
        para: "Wemerewe ikizamini kimwe kubuntu, arko ibindi bikurikiraho urabyishura, Kwishyura ipaki y'ibizamini biragusaba kubanza ukinjira muri sisiteme.",
        logo: <AiOutlineCheck />,
      },
      {
        title: "Inama cyangwa ubufasha:",
        para: "Ubaye ufite inama watwungura, nabyo biremewe, kandi niba ufite ikibazo urabaza inzobere zacu zikagusubiza, Ntubyihererane!!!",
        logo: <AiOutlineCheck />,
      },
    ],
  },
  News: {
    import_News: [
      {
        image: News1,
        para: "Polisi y'urwanda yashyizeho uburyo bushya bwo gukorera perime, soma inkuru yose!!",
        heading: "Uburyo bushya bwo gukorera perime",
        time: "10-05-2024",
      },
      {
        image: News3,
        para: "Uburyo bwo gukora ikizamini cya provisoire kuri telephone cg mudasobwa",
        heading: "Uburyo bushya bwo gukorera provisoire",
        time: "12-05-2024",
      },
      {
        image: News5,
        para: "Polisi y'urwanda yashyizeho uburyo bushya bwo gukorera perime, soma inkuru yose!!",
        heading: "Uburyo Wakwiga wifashishije Heroes College",
        time: "11-05-2024",
      },
      {
        image: News4,
        para: "Polisi y'urwanda yashyizeho uburyo bushya bwo gukorera perime, soma inkuru yose!!",
        heading: "Uburyo bushya bwo gukorera perime",
        time: "15-05-2024",
      },
    ],
  },

  Contact: {
    title: "Twandikire",
    subtitle: "UFITE UBUFASHA, CYANGWA IKIBAZO?",
    social_media: [
      {
        icon: GrMail,
        link: "mailto:hakizimanaalexis123@gmail.com",
        title: "Email",
      },
      {
        icon: BsWhatsapp,
        link: "https://wa.me/250786731449",
        title: "Whatsapp",
      },
      {
        icon: BsInstagram,
        link: "https://www.instagram.com/npson.alexis/",
        title: "Instagram",
      },
      {
        icon: GrGithub,
        link: "https://github.com/NP-SON-250/",
        title: "GitHub",
      },
      {
        icon: GrLinkedin,
        link: "https://www.linkedin.com/in/hakizimana-alexis-716b04284/",
        title: "Linkedin",
      },
    ],
  },
  Headings: {
    title: {},
    subtitle: {},
  },
};

export const NavData = [
  {
    id: 1,
    icon: <RxDashboard />,
    text: "Dashboard",
    link: "/dashboard",
  },
  {
    id: 2,
    icon: <BsFolder2Open />,
    text: "Categories",
    link: "admin/categories",
  },
  {
    id: 3,
    icon: <BsPeopleFill />,
    text: "Users",
    link: "admin/users",
  },
  {
    id: 4,
    icon: <AiOutlinePayCircle />,
    text: "Payments",
    link: "admin/payments",
  },
  {
    id: 5,
    icon: <FaBlog />,
    text: "Blogs",
    link: "admin/blogs",
  },
  {
    id: 6,
    icon: <FaQuestion />,
    text: "Questions",
    link: "admin/questions",
  },
  {
    id: 7,
    icon: <TbBrandGoogleAnalytics />,
    text: "Reports",
    link: "admin/reports",
  },
];

export const NotificationData = [
  {
    id: 1,
    profile: News1,
    name: "Mukama",
    time: "22:45 pm",
    message: "I want to register and work with you......",
  },
  {
    id: 2,
    profile: News5,
    name: "Kalim",
    time: "06:00 am",
    message: "I want to pay so that I can get code for exam......",
  },
];

export const ExamData = [
  {
    id: 1,
    title: "Test 001",
    time: 30,
    category: "Free",
    marks: 30,
    questions: 20,
    conductedBy: 100,
  },
  {
    id: 2,
    title: "Test 002",
    time: 30,
    category: "Paid",
    marks: 10,
    questions: 10,
    conductedBy: 30,
  },
  {
    id: 3,
    title: "Test 005",
    time: 30,
    category: "Paid",
    marks: 10,
    questions: 14,
    conductedBy: 12,
  },
  {
    id: 4,
    title: "Test 007",
    time: 45,
    category: "Free",
    marks: 25,
    questions: 25,
    conductedBy: 50,
  },
];
