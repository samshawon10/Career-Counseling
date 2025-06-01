import React from "react";
import { Helmet } from "react-helmet";
import { motion as Motion } from "framer-motion";
import Slider from "../components/Slider";
import Testimonials from "../components/Testimonials";
import ContactUs from "./ContactUs";
import { Briefcase, ClipboardList, MessageSquareHeart } from "lucide-react";
import ServicesPreview from "../components/ServicesPreview";

const styleSheet = `
  @keyframes gradientBackground {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
`;

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | Career Counsel+</title>
      </Helmet>
      <style>{styleSheet}</style>

      {/* Hero Section */}
      <Motion.section
        className="bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 md:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto text-center mb-10">
          <Motion.h1
            className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-4 leading-tight"
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
          >
            Welcome to{" "}
            <span className="text-indigo-600 dark:text-indigo-300">
              Career Counseling
            </span>
          </Motion.h1>
          <Motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
          >
            Discover your future career path with expert advice, resources, and
            personalized guidance.
          </Motion.p>
        </div>
        <div className="max-w-6xl mx-auto">
          <Slider />
        </div>
      </Motion.section>

      {/* Services Preview */}
      <Motion.section
        className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-100 to-white rounded-lg shadow-md"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-indigo-800 mb-8 text-center">
            Our Top Services
          </h2>
          <ServicesPreview />
        </div>
      </Motion.section>

      {/* Why Choose Us */}
      <Motion.section
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-indigo-50 to-white text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="max-w-6xl mx-auto">
          <Motion.h2
            className="text-4xl font-extrabold text-indigo-800 mb-6"
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
          >
            Why Choose <span className="text-purple-600">Career Counsel+</span>
          </Motion.h2>
          <Motion.p
            className="text-gray-700 text-lg leading-relaxed mb-12"
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
          >
            At{" "}
            <span className="font-semibold text-indigo-700">
              Career Counsel+
            </span>
            , we provide{" "}
            <span className="font-semibold text-indigo-700">
              expert career guidance
            </span>{" "}
            tailored to your unique strengths and goals. Our mission is to help
            you thrive in a career you truly love.
          </Motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-left">
            <Motion.div
              className="flex flex-col items-center text-center"
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={textVariants}
            >
              <Briefcase className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold text-indigo-800 mb-2">
                Certified Experts
              </h3>
              <p className="text-gray-600">
                Work with accredited counselors who understand today’s career
                landscape and hiring trends.
              </p>
            </Motion.div>
            <Motion.div
              className="flex flex-col items-center text-center"
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={textVariants}
            >
              <ClipboardList className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold text-indigo-800 mb-2">
                Personalized Plans
              </h3>
              <p className="text-gray-600">
                Receive career roadmaps and support tailored to your strengths,
                interests, and ambitions.
              </p>
            </Motion.div>
            <Motion.div
              className="flex flex-col items-center text-center"
              custom={4}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={textVariants}
            >
              <MessageSquareHeart className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold text-indigo-800 mb-2">
                Ongoing Support
              </h3>
              <p className="text-gray-600">
                Get continued coaching and resources as you grow and evolve
                throughout your career journey.
              </p>
            </Motion.div>
          </div>
        </div>
      </Motion.section>

      {/* Testimonials */}
      <Motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className=" mx-auto">
          <Testimonials />
        </div>
      </Motion.section>

      {/* Contact Section */}
      <Motion.div
       
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className=" mx-auto">
          <ContactUs />
        </div>
      </Motion.div>
    </div>
  );
};

export default Home;
