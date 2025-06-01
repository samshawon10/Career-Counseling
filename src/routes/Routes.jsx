import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ServiceDetails from "../pages/ServiceDetails";
import ForgotPassword from "../pages/ForgotPassword";

import PrivateRoute from "./PrivateRoute";
import MyProfile from "../pages/MyProfile";
import AboutUs from "../pages/AboutUs";
import Course from "../pages/Course";
import NotFoundPage from "../components/NotFoundPage";
import ContactUs from "../pages/ContactUs";
import BlogPage from "../pages/BlogPage";
import Services from "../components/Services";




const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement:<NotFoundPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {path: "/about", element: <AboutUs /> }, 
      {path: "/contact", element: <ContactUs /> }, 
      {path: '/courses', element: <Course /> }, 
      {path:'/blogs', element: <BlogPage/>},
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/profile", element: <PrivateRoute><MyProfile /></PrivateRoute> },
          {
        
        path: '/service',
        element: <Services/>,
        loader: () => fetch('/data/services.json')


      },
      {
        path: '/service/:id',
        element: (
          <PrivateRoute>
            <ServiceDetails />
          </PrivateRoute>
        )
      },

      
    ],
  },
]);

export default router;
