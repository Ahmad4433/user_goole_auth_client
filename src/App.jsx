import React from "react";
import "./components/auth.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgetPassword from "./components/ForgetPassword";
import Verification from "./components/Verification";
import NewPassword from "./components/NewPassword";
import Profile from "./components/Profile";
import Super from "./components/Super";
const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/password/forgot" element={<ForgetPassword />} />

      <Route element={<Super />}>
        <Route path="/" element={<Profile />} />
        <Route path="/otp/verify" element={<Verification />} />
        <Route path="/password/change" element={<NewPassword />} />
      </Route>
    </Routes>
  );
};

export default App;
