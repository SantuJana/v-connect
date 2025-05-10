import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import RoomPage from "./pages/RoomPage";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { NotificationProvider } from "./context/notificationContext";
import Landing from "./pages/Landing";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Favorites from "./pages/Favorites";
import Chats from "./pages/Chats";
import Register from "./pages/Register";
import VideoCall from "./pages/VideoCall";
import Friends from "./pages/Friends";
import { LoaderProvider } from "./context/loaderContext";
// import Call from "./pages/Call";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <NotificationProvider>
        <LoaderProvider>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="" element={<Landing />} />
            <Route element={<ProtectedRoute />}>
              <Route path="landing" element={<Home />} />
              <Route path="room/:roomId" element={<RoomPage />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/chats" element={<Chats />} />
              <Route path="/video-call" element={<VideoCall />} />
            </Route>
          </Routes>
        </LoaderProvider>
      </NotificationProvider>
    </QueryClientProvider>
  );
}

export default App;
