// src/pages/Login.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { motion as Motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import ParticleBackground from "../components/ParticleBackground";


const Login = () => {
  const { login, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await login(email, password);
      toast.success("Logged in successfully");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Logged in with Google");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-purple-300 via-pink-200 to-indigo-300 px-4 overflow-hidden">
       
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>

      <Helmet>
        <title>Login | Career Counsel+</title>
      </Helmet>

      {/* Login Card */}
      <Motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl px-8 py-12 w-full max-w-md border border-purple-300"
      >
                <Motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-purple-700 mb-6"
        >
          Sign In to Your Account
        </Motion.h2>


        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500 text-lg">
              <FaEnvelope />
            </span>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="pl-12 pr-4 py-3 w-full border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition bg-white shadow-sm placeholder:text-sm"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-500 text-lg">
              <FaLock />
            </span>
            <input
              name="password"
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className="pl-12 pr-10 py-3 w-full border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition bg-white shadow-sm placeholder:text-sm"
              required
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-500 cursor-pointer text-lg"
              title="Toggle Password"
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <Motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 w-full rounded-lg shadow-md transition duration-300"
          >
            Login
          </Motion.button>
        </form>

        <div className="text-center mt-4">
          <Link to="/forgot-password" className="text-sm text-purple-600 hover:underline">
            Forgot password?
          </Link>
        </div>

        <div className="divider my-6">OR</div>

        <Motion.button
          whileHover={{ scale: 1.03 }}
          onClick={handleGoogle}
          className="flex items-center justify-center gap-3 w-full border border-gray-300 rounded-lg py-3 bg-white hover:bg-gray-100 transition shadow-sm"
        >
          <FcGoogle className="text-2xl" />
          <span className="font-medium text-sm">Continue with Google</span>
        </Motion.button>

        <p className="text-sm text-center mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-purple-600 hover:underline font-medium">
            Register
          </Link>
        </p>
      </Motion.div>
    </div>
  );
};

export default Login;
