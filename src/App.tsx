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
import { CompletedRegister } from "./pages/register/completedRegister";
import { EventPage } from "./pages/eventPage";
import { ProtectedRoute } from "./shared/ProtectedRoute";

export const App = () => {
  return (
    <Router>
      <div className={"app"}>
        <Header userStore={globalStore.userStore} />
        <div className={"content-wrapper"}>
          <Routes>
            <Route path="/" element={<Navigate to="/events" replace />} />
            <Route path="/events" element={<Events />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/completed-register" element={<CompletedRegister />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/login"
              element={<Login userStore={globalStore.userStore} />}
            />
            <Route path="/event-page" element={<EventPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile userStore={globalStore.userStore} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/event-creation"
              element={
                <ProtectedRoute>
                  <EventCreation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-events"
              element={
                <ProtectedRoute>
                  <UserEvents />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};
