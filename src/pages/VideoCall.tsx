import React, { useCallback, useEffect, useRef, useState } from "react";
//@ts-ignore
// import SampleVideo from "../assets/sample.mp4";
import {
  IoMicOffOutline,
  IoMicOutline,
  IoVideocamOffOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import { MdOutlineCallEnd } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import peer from "../service/peer";
import { SocketContextType, useSocket } from "../context/socketContext";

export default function VideoCall() {
  const navigate = useNavigate();
  const { socket } = useSocket() as SocketContextType;
  const [searchParams] = useSearchParams();
  const [micOn, setMicOn] = useState<boolean>(true);
  const [cameraOn, setCameraOn] = useState<boolean>(true);
  // const selfSocketRef = useRef<string>(atob(searchParams.get("self") || ""));
  const guestSocketRef = useRef<string>(atob(searchParams.get("guest") || ""));
  const initiatorRef = useRef<string>(
    atob(searchParams.get("initiator") || "")
  );
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const [myStream, setMyStream] = useState<MediaStream>();
  const [remoteStream, setRemoteStream] = useState<MediaStream>();
  const manualEndRef = useRef<boolean>(false);

  const startCall = useCallback(async () => {
    const stream = await navigator.mediaDevices?.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket?.emit("user:call", { to: guestSocketRef.current, offer });
    setMyStream(stream);
  }, [socket, guestSocketRef, setMyStream]);

  const handleIncomingCall = useCallback(
    async (data: { from: string; offer: RTCSessionDescriptionInit }) => {
      const { from, offer } = data;
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      const ans = await peer.getAnswer(offer);
      socket?.emit("call:accepted", { to: from, ans });
    },
    [socket, setMyStream]
  );

  const sendStream = useCallback(() => {
    console.log("///// sending track /////");
    if (!myStream) return;
    console.log("///// preparing track /////");
    for (const track of myStream?.getTracks()) {
      console.log("///// adding track /////");
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    async (data: { from: string; ans: RTCSessionDescriptionInit }) => {
      const { from, ans } = data;
      console.log("//// Call Accepted /////", from, ans);
      await peer.setLocalDescription(ans);
      console.log("$$$$$ sending stream 1");
      sendStream();
    },
    [sendStream]
  );

  const handleNegoNeed = useCallback(
    async (data: { from: string; offer: RTCSessionDescriptionInit }) => {
      const { from, offer } = data;
      console.log("///// nego done /////", from, offer);
      const ans = await peer.getAnswer(offer);
      socket?.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleStreamRequest = useCallback(() => {
    if (initiatorRef.current !== "yes") sendStream();
  }, [sendStream, initiatorRef]);

  const handleNegoFinal = useCallback(
    async (data: { from: string; ans: RTCSessionDescriptionInit }) => {
      const { from, ans } = data;
      console.log("///// nego Final /////", from, ans);
      await peer.setLocalDescription(ans);
      socket?.emit("call:stream:request", { to: from });
    },
    [socket]
  );

  const handleTrack = useCallback(
    (ev: RTCTrackEvent) => {
      console.log("////// Got The Track ///////");
      const remoteStream = ev.streams;
      setRemoteStream(remoteStream[0]);
    },
    [setRemoteStream]
  );

  const cleanupPeerConnection = useCallback(() => {
    if (peer.peer) {
      // Close all senders (outgoing tracks)
      peer.peer.getSenders().forEach((sender) => {
        if (sender.track) sender.track.stop();
      });

      // Close all receivers (incoming tracks)
      peer.peer.getReceivers().forEach((receiver) => {
        if (receiver.track) receiver.track.stop();
      });

      // Close all transceivers
      peer.peer.getTransceivers().forEach((transceiver) => {
        if (transceiver.sender?.track) transceiver.sender.track.stop();
        if (transceiver.receiver?.track) transceiver.receiver.track.stop();
        transceiver.stop();
      });

      // Close the connection
      peer.peer.close();
    }
  }, []);

  const handleNegoNedded = useCallback(async () => {
    const offer = await peer.getOffer();

    console.log("///// nego needed /////", {
      to: guestSocketRef.current,
      offer,
    });
    socket?.emit("peer:nego:needed", { to: guestSocketRef.current, offer });
  }, [socket, guestSocketRef]);

  const manualEnd = useCallback(() => {
    cleanupPeerConnection();
    manualEndRef.current = true;
    console.log("$$$$$", manualEndRef.current)
    navigate(-1);
  }, [cleanupPeerConnection, navigate])

  const handleVideoCallEnd = useCallback(() => {
    manualEnd();
    socket?.emit("call:end", {to: guestSocketRef.current})
  }, [manualEnd, socket])

  useEffect(() => {
    if (myStream){
      const audioTrack = myStream?.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = micOn;
      }
    }
  }, [myStream, micOn]);
  
  useEffect(() => {
    if (myStream){
      const videoTrack = myStream?.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = cameraOn;
      }
    }
  }, [myStream, cameraOn]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = myStream || null;
    }
  }, [myStream]);

  useEffect(() => {
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream || null;
    }
  }, [remoteStream]);

  useEffect(() => {
    initiatorRef.current === "yes" && startCall();
  }, [startCall]);

  useEffect(() => {
    socket?.on("incoming:call", handleIncomingCall);
    socket?.on("call:accepted", handleCallAccepted);
    socket?.on("call:stream:request", handleStreamRequest);
    socket?.on("peer:nego:needed", handleNegoNeed);
    socket?.on("peer:nego:final", handleNegoFinal);
    socket?.on("call:end", manualEnd);

    return () => {
      socket?.off("incoming:call", handleIncomingCall);
      socket?.off("call:accepted", handleCallAccepted);
      socket?.off("call:stream:request", handleStreamRequest);
      socket?.off("peer:nego:needed", handleNegoNeed);
      socket?.off("peer:nego:final", handleNegoFinal);
      socket?.off("call:end", manualEnd);
    };
  }, [
    initiatorRef,
    socket,
    handleIncomingCall,
    handleCallAccepted,
    handleNegoNeed,
    handleNegoFinal,
    handleStreamRequest,
    manualEnd
  ]);

  useEffect(() => {
    peer.peer.addEventListener("track", handleTrack);
    peer.peer.addEventListener("negotiationneeded", handleNegoNedded);

    return () => {
      peer.peer.removeEventListener("track", handleTrack);
      peer.peer.removeEventListener("negotiationneeded", handleNegoNedded);
    };
  }, [handleTrack, handleNegoNedded]);

  useEffect(() => {
    const guestSocketId = guestSocketRef.current;
    const handleBeforeUnload = () => {
      if (!manualEndRef.current)
        cleanupPeerConnection();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      if (!manualEndRef.current){
        socket?.emit("call:end", { to: guestSocketId })
        cleanupPeerConnection();
      }
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [cleanupPeerConnection, socket, manualEndRef]);

  return (
    <div className="flex-1 bg-slate-800  rounded-xl md:rounded-2xl overflow-hidden border-2 md:border-4 border-violet-600 relative">
      <video
        ref={videoRef}
        autoPlay
        controls={false}
        loop
        className="absolute h-32 w-28 md:h-28 md:w-40 top-3 left-3 rounded-xl md:rounded-2xl bg-slate-900"
        muted
        hidden={!cameraOn}
      ></video>
      <video
        ref={remoteVideoRef}
        autoPlay
        controls={false}
        loop
        className="h-full w-full object-contain bg-slate-800"
      ></video>
      <div className="flex items-center justify-center gap-4 md:gap-6 z-10 w-full bottom-4 text-white absolute">
        {micOn ? (
          <div className="flex justify-center items-center h-12 w-12 rounded-full cursor-pointer border-2 bg-violet-400 ring-red-600">
            <IoMicOutline size={24} onClick={() => setMicOn(!micOn)} />
          </div>
        ) : (
          <div className="flex justify-center items-center h-12 w-12 rounded-full cursor-pointer bg-red-600">
            <IoMicOffOutline size={24} onClick={() => setMicOn(!micOn)} />
          </div>
        )}
        {cameraOn ? (
          <div className="flex justify-center items-center h-12 w-12 rounded-full cursor-pointer border-2 bg-violet-400 ring-red-600">
            <IoVideocamOutline
              size={24}
              onClick={() => setCameraOn(!cameraOn)}
            />
          </div>
        ) : (
          <div className="flex justify-center items-center h-12 w-12 rounded-full cursor-pointer bg-red-600">
            <IoVideocamOffOutline
              size={24}
              onClick={() => setCameraOn(!cameraOn)}
            />
          </div>
        )}
        <div className="flex justify-center items-center h-12 w-12 rounded-full cursor-pointer bg-red-600">
          <MdOutlineCallEnd
            size={24}
            onClick={handleVideoCallEnd}
          />
        </div>
      </div>
    </div>
  );
}
