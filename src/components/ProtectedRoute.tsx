import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { SocketProvider } from "../context/socketContext";
import { AppProvider } from "../context/appContext";
import { CallProvider } from "../context/callContext";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");

  return token ? (
    <SocketProvider>
      <CallProvider>
        <AppProvider>
          <Outlet />
        </AppProvider>
      </CallProvider>
    </SocketProvider>
  ) : (
    <Navigate to={"/login"} replace />
  );
}
