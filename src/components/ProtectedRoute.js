import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminContext } from "../contexts/AdminContext";

const ProtectedRoute = ({ children }) => {
  const { isAdmin } = useContext(AdminContext);
  return isAdmin ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
