import { createContext, useContext, useMemo } from "react";
import { io, Socket } from "socket.io-client";

export interface SocketContextType {
  socket: Socket | null;
}

export const SocketContext = createContext<SocketContextType | undefined>(
  undefined
);

export const SocketProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const socket = useMemo(() => io("http://192.168.0.200:8000"), []);

    return <SocketContext.Provider value={{socket}} >{children}</SocketContext.Provider>
}

export const useSocket = () => {
  return useContext(SocketContext);
};
