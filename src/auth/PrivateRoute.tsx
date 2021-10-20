import React from "react";
import { Redirect, Route } from "react-router-dom";
import useAuth from "./useAuth";
import { token } from "../pages/Auth/Auth";

const PrivateRoute = ({ ...rest }) => {
  const auth = useAuth();

  if (typeof token === "string" || auth.checkAuth) return <Route {...rest} />;
  return <Redirect to="/login" />;
};

export const LoginRoute = ({ ...rest }) => {
  const auth = useAuth();

  if (typeof token === "string" || auth.checkAuth) return <Redirect to="/maps" />;

  return <Route {...rest} />;
};

export default PrivateRoute;
