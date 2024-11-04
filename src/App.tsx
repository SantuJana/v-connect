import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RoomPage from "./pages/RoomPage";

function App() {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="room/:roomId" element={<RoomPage />} />
    </Routes>
  );
}

export default App;
