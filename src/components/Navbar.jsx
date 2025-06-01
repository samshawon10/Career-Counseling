import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  FaBookOpen,
  FaHome,
  FaInfoCircle,
  FaTools,
  FaGraduationCap,
  FaBell,
  FaUser,
  FaUserShield,
  FaSignOutAlt,
  FaQuestionCircle,
  FaBlog,
} from "react-icons/fa";
import { IoMdContact } from 'react-icons/io';

import { AuthContext } from "../context/AuthProvider";

const Navbar = () => {
  const { user, logout, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();  // added useLocation
  const [scrollY, setScrollY] = useState(window.scrollY);
  const [showMobileNavbar, setShowMobileNavbar] = useState(true);
  const [showMobileTopbar, setShowMobileTopbar] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);  // Scroll to top on route change
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Scroll direction detection for mobile top & bottom navbars
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const scrollingUp = currentScroll < scrollY || currentScroll < 10;

      setShowMobileTopbar(scrollingUp);
      setShowMobileNavbar(!scrollingUp); // Bottom navbar shows only when top navbar hidden

      setScrollY(currentScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  // Active nav link styles
  const navLinkClass = ({ isActive }) =>
    `flex flex-col items-center text-xs transition duration-300 ${
      isActive
        ? "text-indigo-600 dark:text-indigo-400 font-semibold scale-110"
        : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
    }`;

  return (
    <>
      {/* Top Navbar - Desktop */}
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50 bg-opacity-80 backdrop-blur-md dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:bg-opacity-70 shadow-lg px-4 py-3 hidden lg:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <FaBookOpen className="text-2xl text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              <span className="text-indigo-600 dark:text-indigo-400">Career</span> Counsel+
            </h1>
          </Link>

          <ul className="flex items-center gap-6">
            <NavLink to="/" end className={navLinkClass}>Home</NavLink>
            <li><NavLink to="/about" className={navLinkClass}>About Us</NavLink></li>
            <li><NavLink to="/contact" className={navLinkClass}>Contact Us</NavLink></li>
            <li><NavLink to="/service" className={navLinkClass}>Service</NavLink></li>
            <li><NavLink to="/courses" className={navLinkClass}>Courses</NavLink></li>
            <li><NavLink to='/blogs' className={navLinkClass}>Blogs</NavLink></li>
          </ul>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-2">
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt="User"
                    className="w-8 h-8 rounded-full object-cover border-2 border-indigo-500"
                  />
                  <span className="text-sm text-gray-800 dark:text-gray-200 font-medium hidden md:block">
                    {user.displayName || "User"}
                  </span>
                </div>
                <Link to="/profile" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800">Profile</Link>
                <button onClick={handleLogout} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 px-3 py-1">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="border-2 border-indigo-500 dark:border-indigo-400 rounded-full px-4 py-1.5 text-sm text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-400 dark:hover:text-gray-900 transition"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-indigo-500 dark:border-indigo-400 rounded-full px-4 py-1.5 text-sm text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-400 dark:hover:text-gray-900 transition"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Top Mobile Navbar - logo + login/register only */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 px-4 py-2 transition-all duration-500 ease-in-out bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-md lg:hidden ${
          showMobileTopbar ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
        }`}
      >
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <FaBookOpen className="text-xl text-indigo-600 dark:text-indigo-400" />
            <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Career <span className="text-indigo-600 dark:text-indigo-400">Counsel+</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="User"
                  className="w-7 h-7 rounded-full border-2 border-indigo-500 object-cover"
                />
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="text-sm text-indigo-600 dark:text-indigo-400 font-medium"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="text-sm text-indigo-600 dark:text-indigo-400 font-medium"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Bottom Mobile Navbar - Icons */}
      <nav
        className={`fixed bottom-0 left-0 right-0 z-50 transform transition-all duration-500 ease-in-out ${
          showMobileNavbar ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        } bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-2 px-4 flex justify-between items-center shadow-lg lg:hidden`}
      >
        <NavLink to="/" className={navLinkClass}><FaHome className="text-xl" />Home</NavLink>
        <NavLink to="/about" className={navLinkClass}><FaInfoCircle className="text-xl" />About Us</NavLink>
        <NavLink to="/contact" className={navLinkClass}><IoMdContact className="text-xl" />Contact Us</NavLink>
        <NavLink to="/service" className={navLinkClass}><FaTools className="text-xl" />Service</NavLink>
        <NavLink to="/courses" className={navLinkClass}><FaGraduationCap className="text-xl" />Courses</NavLink>

        {user ? (
          <>
            <NavLink to="/notifications" className={navLinkClass}>
              <div className="relative flex flex-col items-center">
                <FaBell className="text-xl" />
                Notifications
                <span className="absolute -top-1 -right-3 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">3</span>
              </div>
            </NavLink>
            <NavLink to="/profile" className={navLinkClass}><FaUser className="text-xl" />Profile</NavLink>
            {isAdmin && (
              <NavLink to="/admin" className={navLinkClass}><FaUserShield className="text-xl" />Admin</NavLink>
            )}
            <button
              onClick={handleLogout}
              className="text-red-600 dark:text-red-400 text-xs px-2 py-1 rounded hover:text-red-800 dark:hover:text-red-300 flex flex-col items-center"
              aria-label="Logout"
            >
              <FaSignOutAlt className="text-xl" />
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/register" className={navLinkClass}><FaQuestionCircle className="text-xl" />Register</NavLink>
            <NavLink to="/login" className={navLinkClass}><FaBlog className="text-xl" />Login</NavLink>
          </>
        )}
      </nav>
    </>
  );
};

export default Navbar;
