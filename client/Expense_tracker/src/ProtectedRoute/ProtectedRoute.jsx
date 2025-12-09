import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("https://mern-expense-tracker-1-frontend.onrender.com/auth/", {
          withCredentials: true,
        });
        console.log(res);
        if (res.data.userID) setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);
  if (loading) return <div>Loading....</div>;
  if (!isAuthenticated) return <Navigate to="/authentication" />;
  return children;
};

export default ProtectedRoute;
