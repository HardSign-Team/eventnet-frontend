import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import globalStore from "../../stores/GlobalStore";

export const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const isAuth = globalStore.userStore.getIsAuth();
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};
