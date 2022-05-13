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
import { UserEvents } from "./pages/userEvents";
import globalStore from "./stores/GlobalStore";
import { EventPage } from "./pages/eventPage";
import { CompletedRegister } from "./pages/completedRegister";

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
            <Route
              path="/reset-password"
              element={<ResetPassword userStore={globalStore.userStore} />}
            />
            <Route path="/event-creation" element={<EventCreation />} />
            <Route path="/user-events" element={<UserEvents />} />
            <Route
              path="/completed-register/:userId/:confirmKey"
              element={<CompletedRegister />}
            />
            <Route path="/" element={<Navigate to="/events" replace />} />
            <Route path="/events" element={<Events />} />
            <Route path="/event-page" element={<EventPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};
