// src/pages/Register.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { updateProfile } from "firebase/auth";
import { motion as Motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import ParticleBackground from "../components/ParticleBackground";

const Register = () => {
  const { register, googleLogin } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const photoURL = form.photoURL.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password)) {
      toast.error("Password must contain uppercase, lowercase & 6+ characters");
      return;
    }

    try {
      const result = await register(email, password);
      await updateProfile(result.user, {
        displayName: name,
        photoURL: photoURL || "https://i.ibb.co/2n4s8LF/default-user.png",
      });

      toast.success("Registration successful!");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Registration failed");
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Logged in with Google");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Google login failed");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-r from-purple-200 via-pink-100 to-purple-300 px-4 overflow-hidden">

      {/* Particle Background */}
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>

      <Helmet>
        <title>Register | Career Counsel+</title>
      </Helmet>

      {/* Register Card */}
      <Motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 bg-white bg-opacity-90 shadow-2xl rounded-2xl px-8 py-10 w-full max-w-md backdrop-blur-md"
      >
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Create an Account 🚀
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            className="input input-bordered w-full px-4 py-2 rounded-lg border border-purple-300 focus:ring-2 focus:ring-purple-500 transition"
            required
          />
          <input
            name="photoURL"
            type="text"
            placeholder="Photo URL"
            className="input input-bordered w-full px-4 py-2 rounded-lg border border-purple-300 focus:ring-2 focus:ring-purple-500 transition"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="input input-bordered w-full px-4 py-2 rounded-lg border border-purple-300 focus:ring-2 focus:ring-purple-500 transition"
            required
          />
          <div className="relative">
            <input
              name="password"
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className="input input-bordered w-full px-4 py-2 rounded-lg border border-purple-300 focus:ring-2 focus:ring-purple-500 transition"
              required
            />
            <span
              className="absolute right-3 top-2.5 text-xl cursor-pointer"
              onClick={() => setShowPass(!showPass)}
              title="Toggle Password"
            >
              {showPass ? "🙈" : "👁️"}
            </span>
          </div>

          <button
            type="submit"
            className="btn bg-purple-600 hover:bg-purple-700 text-white w-full rounded-lg transition duration-300"
          >
            Register
          </button>
        </form>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 hover:underline">
            Login
          </Link>
        </p>

        <div className="divider my-6">OR</div>

        <button
          onClick={handleGoogle}
          className="flex items-center justify-center gap-2 w-full border rounded-lg py-2 bg-white hover:bg-gray-100 transition"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>
      </Motion.div>
    </div>
  );
};

export default Register;
