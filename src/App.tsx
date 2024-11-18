import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import RoomPage from "./pages/RoomPage";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { NotificationProvider } from "./context/notificationContext";
import Landing from "./pages/Landing";

function App() {
  return (
    <NotificationProvider>
      <Routes>
        <Route path="" element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="landing" element={<Home />} />
        <Route path="room/:roomId" element={<RoomPage />} />
      </Routes>
    </NotificationProvider>
  );
}

export default App;
