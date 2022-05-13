import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Events from "./pages/events/Events";
import { Registration } from "./pages/register/Registration";
import { Login } from "./pages/login/Login";
import EventCreation from "./pages/eventCreation";
import "./App.css";
import { ResetPassword } from "./pages/resetPassword/ResetPassword";
import Header from "./shared/Header/Header";
import Profile from "./pages/profile";
import { Footer } from "./shared/Footer";
import { UserEvents } from "./pages/userEvents";
import globalStore from "./stores/GlobalStore";

export const App = () => {
  return (
    <Router>
      <div className={"app"}>
        <Header />
        <div className={"content-wrapper"}>
          <Routes>
            <Route
              path="/register"
              element={<Registration userStore={globalStore.userStore} />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/login"
              element={<Login userStore={globalStore.userStore} />}
            />
            <Route
              path="/resetPassword"
              element={<ResetPassword userStore={globalStore.userStore} />}
            />
            <Route path="/event-creation" element={<EventCreation />} />
            <Route path="/user-events" element={<UserEvents />} />
            <Route path="/" element={<Events />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};
