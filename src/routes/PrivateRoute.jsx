import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // Show loading while auth state is being checked
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading...
      </div>
    );
  }

  // If user is authenticated, render the children components
  if (user) {
    return children;
  }

  // If not authenticated, redirect to login page and save current location
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
