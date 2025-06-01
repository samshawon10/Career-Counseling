import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import "./index.css";
import AuthProvider from "./context/AuthProvider";

import "swiper/css";
import "swiper/css/pagination";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";





ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
     <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </AuthProvider>
  </React.StrictMode>
);
