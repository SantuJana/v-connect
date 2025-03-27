import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { SocketContextType, useSocket } from "./socketContext";
import { NotificationContext, useNotification } from "./notificationContext";
import useUserStore from "../store/user.store";
import CallDialog from "../components/CallDialog";
import CallerDialog from "../components/CallerDialog";
import { useNavigate } from "react-router-dom";
//@ts-ignore
import CallerTone from "../assets/caller.mp3";
//@ts-ignore
import RingTone from "../assets/ring.mp3";

export interface CallContextInterface {
  handleVideoClick: (user: any) => void;
}

const CallContext = createContext<CallContextInterface | undefined>(undefined);

export const CallProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [showCallDialog, setShowCallDialog] = useState<any | null>(null);
  const [showCallerDialog, setShowCallerDialog] = useState<any | null>(null);
  const [callStatus, setCallStatus] = useState<string>("");
  const callTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const selfSocketRef = useRef<string | null>(null);
  const guestSocketRef = useRef<string | null>(null);
  const { socket } = useSocket() as SocketContextType;
  const { failed } = useNotification() as NotificationContext;
  const { user: self } = useUserStore();
  const ringToneRef = useRef<HTMLAudioElement | null>(null);
  const callerToneRef = useRef<HTMLAudioElement | null>(null);

  const playCallerTone = useCallback(() => {
    callerToneRef.current = new Audio(CallerTone);
    callerToneRef.current.play().catch(() => "");
  }, []);

  const stopCallerTone = useCallback(() => {
    if (callerToneRef.current) {
      callerToneRef.current.pause();
      callerToneRef.current.currentTime = 0;
      callerToneRef.current = null;
    }
  }, []);

  const playRingTone = useCallback(() => {
    ringToneRef.current = new Audio(RingTone);
    ringToneRef.current.play().catch(() => "");
  }, []);

  const stopRingTone = useCallback(() => {
    if (ringToneRef.current) {
      ringToneRef.current.pause();
      ringToneRef.current.currentTime = 0;
      ringToneRef.current = null;
    }
  }, []);

  const handleVideoCall = useCallback(
    (data: any) => {
      setShowCallDialog({
        _id: data._id,
        name: data?.name,
        image: data?.image,
      });
      selfSocketRef.current = data.self;
      guestSocketRef.current = data.guest;
    },
    [setShowCallDialog]
  );

  const handleVideoCallCancelClick = useCallback(() => {
    if (callTimeoutRef.current) {
      clearTimeout(callTimeoutRef.current);
      callTimeoutRef.current = null;
    }

    showCallerDialog &&
      socket?.emit("video:call:cancel", {
        from: self._id,
        to: showCallerDialog._id,
      });
    setShowCallerDialog(null);
  }, [socket, setShowCallerDialog, showCallerDialog, self?._id]);

  const handleVideoClick = useCallback(
    (user: any) => {
      if (socket?.connected) {
        socket.emit("video:call", { from: self?._id, to: user?._id });
        setShowCallerDialog(user);
        setCallStatus("Ringing...");
      } else {
        failed("Connection failed please try again");
      }
    },
    [socket, failed, self?._id, setShowCallerDialog, setCallStatus]
  );

  const handleVideoCallDecline = useCallback(() => {
    setCallStatus("Declined");
    setTimeout(() => {
      setShowCallerDialog(null);
    }, 2000);
  }, [setShowCallerDialog]);

  const handleVideoCallCancel = useCallback(() => {
    setShowCallDialog(null);

    selfSocketRef.current = null;
    guestSocketRef.current = null;
  }, [setShowCallDialog]);

  const handleVideoCallAccept = useCallback(
    (data: { guest: string; self: string }) => {
      const { guest, self } = data;
      stopCallerTone();
      setShowCallerDialog(null);
      navigate(
        `/video-call?self=${btoa(self)}&guest=${btoa(guest)}&initiator=${btoa(
          "yes"
        )}`
      );
    },
    [setShowCallerDialog, navigate, stopCallerTone]
  );

  useEffect(() => {
    if (showCallerDialog)
      callTimeoutRef.current = setTimeout(handleVideoCallCancelClick, 60000);
  }, [showCallerDialog, handleVideoCallCancelClick]);

  useEffect(() => {
    socket?.on("video:call", handleVideoCall);
    socket?.on("video:call:decline", handleVideoCallDecline);
    socket?.on("video:call:cancel", handleVideoCallCancel);
    socket?.on("video:call:accept", handleVideoCallAccept);

    return () => {
      socket?.off("video:call", handleVideoCall);
      socket?.off("video:call:decline", handleVideoCallDecline);
      socket?.off("video:call:cancel", handleVideoCallCancel);
      socket?.off("video:call:accept", handleVideoCallAccept);
    };
  }, [
    socket,
    handleVideoCall,
    handleVideoCallDecline,
    handleVideoCallCancel,
    handleVideoCallAccept,
  ]);

  return (
    <CallContext.Provider value={{ handleVideoClick }}>
      {children}

      {(showCallDialog || showCallerDialog) && (
        <div className="absolute top-0 right-0 h-full left-0">
          {/* Background */}
          <div className="bg-white/30 backdrop-blur-sm border border-white/20 p-6 shadow-lg absolute top-0 right-0 bottom-0 left-0"></div>
          {/* Call dialog */}
          {showCallDialog && (
            <CallDialog
              user={showCallDialog}
              self={self}
              setUser={setShowCallDialog}
              socket={socket}
              selfSocketRef={selfSocketRef}
              guestSocketRef={guestSocketRef}
              playRingTone={playRingTone}
              stopRingTone={stopRingTone}
            />
          )}
          {/* Caller dialog */}
          {showCallerDialog && (
            <CallerDialog
              callStatus={callStatus}
              user={showCallerDialog}
              handleVideoCallCancelClick={handleVideoCallCancelClick}
              playCallerTone={playCallerTone}
              stopCallerTone={stopCallerTone}
            />
          )}
        </div>
      )}
    </CallContext.Provider>
  );
};

export const useCallContext = () => {
  return useContext(CallContext);
};
