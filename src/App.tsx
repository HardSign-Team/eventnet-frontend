import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Events from "./pages/events/Events";
import { Registration } from "./pages/register/Registration";
import { Login } from "./pages/login/Login";
import EventCreation from "./pages/eventCreation";
import "./App.css";
import { ResetPassword } from "./pages/resetPassword/ResetPassword";
import Header from "./shared/Header/Header";
import Profile from "./pages/profile";
import { Footer } from "./shared/Footer";
import { UserEvents } from "./userEvents";
import globalStore from "./stores/GlobalStore";
import { CompletedRegister } from "./completedRegister";
import { EventPage } from "./eventPage";

export const App = () => {
  return (
    <Router>
      <div className={"app"}>
        <Header userStore={globalStore.userStore} />
        <div className={"content-wrapper"}>
          <Routes>
            <Route path="/register" element={<Registration />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/login"
              element={<Login userStore={globalStore.userStore} />}
            />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/event-creation" element={<EventCreation />} />
            <Route path="/user-events" element={<UserEvents />} />
            <Route path="/completed-register" element={<CompletedRegister />} />
            <Route path="/" element={<Navigate to="/events" replace />} />
            <Route path="/event-page" element={<EventPage />} />
            <Route path="/events" element={<Events />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};
