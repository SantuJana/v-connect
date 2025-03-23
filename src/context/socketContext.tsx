import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { apiBaseUrl } from "../constants";
import useUserStore from "../store/user.store";

export interface SocketContextType {
  socket: Socket | null;
}

export const SocketContext = createContext<SocketContextType | undefined>(
  undefined
);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { user } = useUserStore();

  useEffect(() => {
    const connection = io(apiBaseUrl);
    setSocket(connection);
    connection.on("connect", () => {
      connection.emit("socketConnect", {
        _id: user?._id,
      });
    });
    return () => {
      connection.disconnect();
    };
  }, [setSocket, user]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
