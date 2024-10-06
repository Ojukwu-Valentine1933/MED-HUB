import React, { Suspense } from "react";
// import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom"; // import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from "../Pages/Homepage";
import Error404Page from "../Pages/Erorr404Page";
import Login from "../Component/AuthComponents/Login";
import SignupPage from "../Pages/SignupPage";
import AboutPage from "../Pages/AboutPage";
import RecoverPage from "../Pages/RecoverPage";
import ResetPage from "../Pages/ResetPage.js";
import AccountSuccessPage from "../Pages/AccountSuccessPage.js";
import DashPage from "../Pages/DashPage";
import ProtectedRoutes from "../Layout/protectedRoutes";
const ChatPage = React.lazy(() => import("../Pages/Chat"));
const AppRoutes = () => {
  // const { user } = useSelector((state) => state.userState);
  // console.log("Rendering AppRoutes with user:", user);

  const user = {
    user: "chris",
  };

  return (
    <Routes>
      <Route path="*" element={<Error404Page />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/recover" element={<RecoverPage />} />
      <Route path="/recover-success" element={<ResetPage />} />
      <Route path="/account-success" element={<AccountSuccessPage />} />
      <Route path="/dashboard" element={<DashPage />} />
      <Route
        path="/chat"
        element={
          <Suspense fallback={<div></div>}>
            <ProtectedRoutes user={user} children={<ChatPage />} />
          </Suspense>
        }
      >
        {console.log("Rendering /chat with user:", user)}
      </Route>
      <Route path="/login" element={<Login />} />
      <Route
        path="/chat/:chatTitle"
        element={
          <Suspense fallback={<div></div>}>
            <ProtectedRoutes user={user} children={<ChatPage />} />
          </Suspense>
        }
      >
        {console.log("Rendering /chat/:chatTitle with user:", user)}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
