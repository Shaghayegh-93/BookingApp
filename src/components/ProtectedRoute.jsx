import React, { useEffect } from "react";
import { useAuth } from "./context/AuthProvider";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAthenticated) navigate("/");
  }, [isAthenticated]);
  return isAthenticated ? children : null;
};

export default ProtectedRoute;
