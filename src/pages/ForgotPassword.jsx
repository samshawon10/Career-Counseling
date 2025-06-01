import { useEffect, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

const ForgotPassword = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const emailFromLogin = location.state?.email;
    if (emailFromLogin) setEmail(emailFromLogin);
  }, [location]);

  const handleReset = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset email sent! Please check your inbox.");
      setShowModal(true); // Show modal instead of redirecting
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to send reset email");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow rounded">
      <Helmet><title>Forgot Password | Career Counsel+</title></Helmet>
      <h2 className="text-2xl font-bold mb-4 text-center">Reset Your Password</h2>

      <form onSubmit={handleReset} className="space-y-4">
        <input
          type="email"
          className="input input-bordered w-full"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="btn w-full bg-purple-600 text-white hover:bg-purple-700"
        >
          Reset Password
        </button>
      </form>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
            <h3 className="text-xl font-semibold text-purple-700 mb-2">Check Your Email</h3>
            <p className="text-gray-700 mb-4">
              A password reset link has been sent to <span className="font-medium">{email}</span>.
              <br />Please follow the instructions to reset your password.
            </p>
            <div className="space-y-2">
              <a
                href="https://mail.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn w-full bg-purple-600 text-white hover:bg-purple-700"
              >
                Go to Gmail
              </a>
              <button
                onClick={() => setShowModal(false)}
                className="btn w-full border bg-white hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
