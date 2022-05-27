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
import { UserEvents } from "./pages/userEvents";
import globalStore from "./stores/GlobalStore";
import { CompletedRegister } from "./pages/register/completedRegister";
import { EventPage } from "./pages/eventPage";
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

const getDefaultParams = () => {
  const dto = new RequestEventDto(
    {
      radiusLocation: new LocationFilterModel(
        new Location(DEFAULT_MAP_STATE.center[0], DEFAULT_MAP_STATE.center[1]),
        DEFAULT_MAP_STATE.radius
      ),
    },
    new PageInfoDto(1, 5)
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
            <Route path="/register" element={<Registration />} />
            <Route
              path="/profile"
              element={<Profile userStore={globalStore.userStore} />}
            />
            <Route
              path="/login"
              element={<Login userStore={globalStore.userStore} />}
            />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/event-creation" element={<EventCreation />} />
            <Route path="/user-events" element={<UserEvents />} />
            <Route path="/completed-register" element={<CompletedRegister />} />
            <Route
              path="/"
              element={
                <Navigate to={`/events?${getDefaultParams()}`} replace />
              }
            />
            <Route path="/event-page" element={<EventPage />} />
            <Route path="/events" element={<Events />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};
