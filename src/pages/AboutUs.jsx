import React, { useEffect, useState, useRef } from "react";
import { FaLinkedinIn, FaGithub, FaEnvelope } from "react-icons/fa";
import { Helmet } from "react-helmet";

const mentors = [
  {
    id: 1,
    name: "Ayesha Rahman",
    role: "Career Mentor",
    bio: "Expert in career counseling and professional growth strategies.",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    linkedin: "https://linkedin.com/in/ayesharahman",
    github: "https://github.com/ayesharahman",
    email: "ayesha@example.com",
  },
  {
    id: 2,
    name: "Sam Shawon",
    role: "Technical Mentor",
    bio: "Full-stack developer and passionate about mentoring budding developers.",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    linkedin: "https://linkedin.com/in/samshawon",
    github: "https://github.com/samshawon",
    email: "sam@example.com",
  },
  {
    id: 3,
    name: "Rina Khatun",
    role: "Education Specialist",
    bio: "Helping students and professionals maximize their learning potential.",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    linkedin: "https://linkedin.com/in/rinakhatun",
    github: "https://github.com/rinakhatun",
    email: "rina@example.com",
  },
  {
    id: 4,
    name: "Hasan Mahmud",
    role: "Industry Expert",
    bio: "Bridging the gap between academia and industry requirements.",
    img: "https://randomuser.me/api/portraits/men/40.jpg",
    linkedin: "https://linkedin.com/in/hasanmahmud",
    github: "https://github.com/hasanmahmud",
    email: "hasan@example.com",
  },
];

function useOnScreen(ref, rootMargin = "0px") {
  const [isVisible, setVisible] = useState(false);
  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin }
    );
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [ref, rootMargin]);
  return isVisible;
}

const AboutUs = () => {
  // Refs for scroll animations
  const introRef = useRef();
  const missionRef = useRef();
  const mentorsRef = useRef();
  const ctaRef = useRef();

  const introVisible = useOnScreen(introRef, "-100px");
  const missionVisible = useOnScreen(missionRef, "-100px");
  const mentorsVisible = useOnScreen(mentorsRef, "-100px");
  const ctaVisible = useOnScreen(ctaRef, "-100px");

  return (
    
    <section className="relative min-h-screen py-16 px-6 overflow-hidden text-gray-800 dark:text-gray-200">
         <Helmet>
        <title>About Us | Career Counsel+</title>
      </Helmet>
      {/* Animated gradient background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-animate bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900"
      ></div>

      {/* Floating animated circles */}
      <div aria-hidden="true">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-300 opacity-30 rounded-full blur-3xl animate-floatSlowXY dark:opacity-20"></div>
        <div className="absolute top-32 right-20 w-48 h-48 bg-purple-400 opacity-25 rounded-full blur-2xl animate-floatFastXY dark:opacity-15"></div>
        <div className="absolute bottom-20 left-1/2 w-60 h-60 bg-pink-400 opacity-20 rounded-full blur-2xl animate-floatSlowXY dark:opacity-10"></div>
      </div>

      <div className="relative max-w-7xl mx-auto space-y-20">
        {/* Intro */}
        <div
          ref={introRef}
          className={`max-w-4xl mx-auto text-center transition-all duration-700 ease-out ${
            introVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="mb-4 text-4xl font-extrabold text-indigo-900 dark:text-indigo-400">
            About Career Counsel+
          </h1>
          <p className="mx-auto max-w-3xl leading-relaxed text-gray-700 dark:text-gray-400">
            Career Counsel+ is dedicated to empowering individuals by connecting
            them with top mentors, providing career guidance, and supporting their
            journey toward success. We believe every person deserves the opportunity
            to grow, learn, and achieve their dreams.
          </p>
        </div>

        {/* Mission, Vision, Values */}
        <div
          ref={missionRef}
          className={`max-w-5xl mx-auto grid gap-12 md:grid-cols-3 text-center transition-all duration-700 ease-out delay-150 ${
            missionVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div>
            <h2 className="mb-2 text-2xl font-semibold text-indigo-900 dark:text-indigo-400">
              Our Mission
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              To provide personalized career advice and resources that empower
              individuals to realize their full potential.
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-2xl font-semibold text-indigo-900 dark:text-indigo-400">
              Our Vision
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              To be the leading career guidance platform fostering lifelong learning
              and professional success worldwide.
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-2xl font-semibold text-indigo-900 dark:text-indigo-400">
              Our Values
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Integrity, innovation, empathy, and dedication in helping our community
              thrive.
            </p>
          </div>
        </div>

       {/* Mentor Cards */}
<div
  ref={mentorsRef}
  className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
>
  {mentors.map((mentor, idx) => (
    <div
      key={mentor.id}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl
        ${
          mentorsVisible
            ? "opacity-100 translate-y-0 transition-opacity duration-700 ease-out"
            : "opacity-0 translate-y-10 transition-none"
        }`}
      style={{
        transitionDelay: mentorsVisible ? `${idx * 150}ms` : "0ms",
        position: "relative",
        overflow: "visible",
      }}
    >
      <img
        src={mentor.img}
        alt={mentor.name}
        className="w-28 h-28 mb-4 rounded-full object-cover ring-4 ring-indigo-300 dark:ring-indigo-600"
      />
      <h3 className="mb-1 text-xl font-semibold text-indigo-700 dark:text-indigo-400">
        {mentor.name}
      </h3>
      <p className="mb-2 text-sm font-medium text-indigo-500 dark:text-indigo-300">
        {mentor.role}
      </p>
      <p className="mb-4 text-gray-600 dark:text-gray-400">{mentor.bio}</p>
      <div className="flex space-x-4 text-indigo-600 dark:text-indigo-400 text-lg z-10">
        <a
          href={mentor.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="hover:text-indigo-800 dark:hover:text-indigo-200 transition"
        >
          <FaLinkedinIn />
        </a>
        <a
          href={mentor.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="hover:text-indigo-800 dark:hover:text-indigo-200 transition"
        >
          <FaGithub />
        </a>
        <a
          href={`mailto:${mentor.email}`}
          aria-label="Email"
          className="hover:text-indigo-800 dark:hover:text-indigo-200 transition"
        >
          <FaEnvelope />
        </a>
      </div>

      {/* Smoke effect at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: "-20px",
          left: "50%",
          width: "130%",
          height: "40px",
          background:
            "radial-gradient(ellipse at center, rgba(99,102,241,0.4), transparent 80%)",
          filter: "blur(15px)",
          transform: "translateX(-50%)",
          pointerEvents: "none",
          borderRadius: "50%",
          zIndex: 0,
        }}
      />
    </div>
  ))}
</div>


        {/* Call to Action */}
        <div
          ref={ctaRef}
          className={`max-w-3xl mx-auto text-center py-12 rounded-lg bg-purple-600 text-white shadow-lg transition-all duration-700 ease-out ${
            ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="mb-4 text-3xl font-bold">Ready to take the next step?</h2>
          <p className="mb-6 text-lg max-w-xl mx-auto">
            Join thousands of learners and professionals who have transformed their
            careers with Career Counsel+. Get started today!
          </p>
         <button
  onClick={() => window.location.href = "/register"}
  aria-label="Sign Up Now"
  style={{
    display: "inline-flex",
    alignItems: "center",
    padding: "1rem 2.5rem",
    fontSize: "1.125rem",
    fontWeight: 800,
    borderRadius: "9999px",
    background: "linear-gradient(90deg, #6366F1, #7C3AED, #EC4899)", // Indigo to purple to pink
    color: "#fff",
    boxShadow: "0 0 8px 0 rgba(139, 92, 246, 0.7), 0 0 20px 5px rgba(139, 92, 246, 0.5)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    outline: "none",
    border: "none",
    userSelect: "none",
    animation: "glowPulse 2.5s ease-in-out infinite",
  }}
  onMouseEnter={e => {
    e.currentTarget.style.transform = "scale(1.05)";
    e.currentTarget.style.boxShadow = "0 0 15px 3px rgba(139, 92, 246, 1), 0 0 30px 10px rgba(139, 92, 246, 0.7)";
  }}
  onMouseLeave={e => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "0 0 8px 0 rgba(139, 92, 246, 0.7), 0 0 20px 5px rgba(139, 92, 246, 0.5)";
  }}
>
  Sign Up Now
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    style={{
      width: "1.5rem",
      height: "1.5rem",
      marginLeft: "0.75rem",
      marginRight: "-0.25rem",
      animation: "bounce 1.5s infinite",
    }}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>

  {/* Inline keyframe animations */}
  <style>
    {`
      @keyframes glowPulse {
        0%, 100% {
          box-shadow:
            0 0 8px 0 rgba(139, 92, 246, 0.7),
            0 0 20px 5px rgba(139, 92, 246, 0.5);
        }
        50% {
          box-shadow:
            0 0 15px 3px rgba(139, 92, 246, 1),
            0 0 30px 10px rgba(139, 92, 246, 0.7);
        }
      }
      @keyframes bounce {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-6px);
        }
      }
    `}
  </style>
</button>

        </div>
      </div>

      <style jsx>{`
        @keyframes floatSlowXY {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(15px, 15px); }
        }
        @keyframes floatFastXY {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, 20px); }
        }
        .animate-floatSlowXY {
          animation: floatSlowXY 8s ease-in-out infinite;
        }
        .animate-floatFastXY {
          animation: floatFastXY 5s ease-in-out infinite;
        }
        .bg-gradient-animate {
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutUs;
