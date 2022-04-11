import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./main/Main";
import Registration from "./register/Registration";
import Login from "./login/Login";
import "./App.css";
import Header from "./shared/Header/Header";
import Profile from "./profile/Profile/Profile";
import { ResetPassword } from "./resetPassword/ResetPassword";
import EventCreation from "./eventCreation/EventCreation";

export default function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/event-creation" element={<EventCreation />} />
          <Route path="/" element={<Main />} />
        </Routes>
      </div>
    </Router>
  );
}
