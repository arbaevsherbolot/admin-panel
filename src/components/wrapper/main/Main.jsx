import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";
import { Login } from "../../pages/auth/login/Login";
import Home from "../../pages/home/Home";
import Error from "../../pages/error/Error";

export const Main = () => {
  const auth = useAuthUser();
  return (
    <>
      <Routes>
        <Route element={auth() ? <Home /> : <Login />} path="/" />
        <Route element={<Error />} path="*" />
      </Routes>
    </>
  );
};
