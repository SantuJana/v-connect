import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import RoomPage from "./pages/RoomPage";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="" element={<Login />} />
      <Route path="room/:roomId" element={<RoomPage />} />
    </Routes>
  );
}

export default App;
