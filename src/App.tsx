import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Registration } from "./pages/register/Registration";
import { Login } from "./pages/login/Login";
import EventCreation from "./pages/eventCreation";
import "./App.css";
import { ResetPassword } from "./pages/resetPassword/ResetPassword";
import Header from "./shared/Header/Header";
import Profile from "./pages/profile";
import { Footer } from "./shared/Footer";
import { UserEvents, UserEventsTypes } from "./pages/userEvents";
import globalStore from "./stores/GlobalStore";
import { CompletedRegister } from "./pages/register/completedRegister";
import { EventPage } from "./pages/eventPage";
import { ProtectedRoute } from "./shared/ProtectedRoute";
import { RequestEventDto } from "./dto/RequestEventDto";
import { LocationFilterModel } from "./dto/LocationFilterModel";
import { Location } from "./dto/Location";
import { PageInfoDto } from "./dto/PageInfoDto";
import { buildRequestEventsParams } from "./api/events/getEvents";
import Events from "./pages/events/Events";

const DEFAULT_MAP_STATE = {
  center: [56.84168, 60.614947],
  radius: 100,
};

export const getDefaultParams = () => {
  const dto = new RequestEventDto(
    {
      radiusLocation: new LocationFilterModel(
        new Location(DEFAULT_MAP_STATE.center[0], DEFAULT_MAP_STATE.center[1]),
        DEFAULT_MAP_STATE.radius
      ),
    },
    new PageInfoDto(1, 100)
  );
  return buildRequestEventsParams(dto);
};

export const App = () => {
  return (
    <Router>
      <div className={"app"}>
        <Header userStore={globalStore.userStore} />
        <div className={"content-wrapper"}>
          <Routes>
            <Route
              path="/"
              element={
                <Navigate to={`/events?${getDefaultParams()}`} replace />
              }
            />
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
                  <UserEvents type={UserEventsTypes.Own} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-subscriptions"
              element={
                <ProtectedRoute>
                  <UserEvents type={UserEventsTypes.Subscribed} />
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
