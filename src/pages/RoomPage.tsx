import React, { useCallback, useEffect, useState } from "react";
import { SocketContextType, useSocket } from "../context/socketContext";
import peer from "../service/peer";
import ReactPlayer from "react-player";

export default function RoomPage() {
  const [remoteSocketId, setRemoteSocketId] = useState<string>();
  const [myStream, setMyStream] = useState<MediaStream>();
  const [remoteStream, setRemoteStream] = useState<MediaStream>();
  const { socket } = useSocket() as SocketContextType;

  const handleUserJoin = useCallback(
    (data: { email: string; id: string }) => {
      console.log("//////// User Joined //////", data);
      setRemoteSocketId(data.id);
    },
    [setRemoteSocketId]
  );

  const handleIncomingCall = useCallback(
    async (data: { from: string; offer: RTCSessionDescriptionInit }) => {
      const { from, offer } = data;
      console.log("/////// Incoming Call ///////", from, offer);
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      const ans = await peer.getAnswer(offer);
      socket?.emit("call:accepted", { to: from, ans });
    },
    [setRemoteSocketId, socket]
  );

  const sendStream = useCallback(() => {
    console.log("///// sending track /////")
    if (!myStream) return;
    console.log("///// preparing track /////")
    for (const track of myStream?.getTracks()) {
        console.log("///// adding track /////")
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    async (data: { from: string; ans: RTCSessionDescriptionInit }) => {
      const { from, ans } = data;
      console.log("//// Call Accepted /////", from, ans);
      await peer.setLocalDescription(ans);
      // sendStream();
    },
    []
  );

  const handleNegoNeed = useCallback(
    async (data: { from: string; offer: RTCSessionDescriptionInit }) => {
      const { from, offer } = data;
      console.log("///// nego done /////", from, offer)
      const ans = await peer.getAnswer(offer);
      socket?.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
);

const handleNegoFinal = useCallback(
    async (data: { from: string; ans: RTCSessionDescriptionInit }) => {
        const { from, ans } = data;
        console.log("///// nego Final /////", from, ans)
      await peer.setLocalDescription(ans);
    },
    []
  );

  const handleCall = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket?.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [socket, remoteSocketId, setMyStream]);

  const handleTrack = useCallback(
    (ev: RTCTrackEvent) => {
      console.log("////// Got The Track ///////");
      const remoteStream = ev.streams;
      setRemoteStream(remoteStream[0]);
    },
    [setRemoteStream]
  );

  const handleNegoNedded = useCallback(async () => {
      const offer = await peer.getOffer();
      
      console.log("///// nego needed /////", { to: remoteSocketId, offer })
    socket?.emit("peer:nego:needed", { to: remoteSocketId, offer });
  }, [socket, remoteSocketId]);

  useEffect(() => {console.log("//// remote socket id //////", remoteSocketId)}, [remoteSocketId])

  useEffect(() => {
    socket?.on("user:join", handleUserJoin);
    socket?.on("incoming:call", handleIncomingCall);
    socket?.on("call:accepted", handleCallAccepted);
    socket?.on("peer:nego:needed", handleNegoNeed);
    socket?.on("peer:nego:final", handleNegoFinal);

    return () => {
      socket?.off("user:join", handleUserJoin);
      socket?.off("incoming:call", handleIncomingCall);
      socket?.off("call:accepted", handleCallAccepted);
      socket?.off("peer:nego:needed", handleNegoNeed);
      socket?.off("peer:nego:final", handleNegoFinal);
    };
  }, [socket, handleUserJoin, handleIncomingCall, handleCallAccepted, handleNegoNeed, handleNegoFinal]);

  useEffect(() => {
    peer.peer.addEventListener("track", handleTrack);
    peer.peer.addEventListener("negotiationneeded", handleNegoNedded);

    return () => {
      peer.peer.removeEventListener("track", handleTrack);
      peer.peer.removeEventListener("negotiationneeded", handleNegoNedded);
    };
  }, [handleTrack, handleNegoNedded]);

  return (
    <>
      <h1>RoomPage</h1>
      <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4>
      {myStream && <button onClick={sendStream}>Send Stream</button>}
      {remoteSocketId && <button onClick={handleCall}>Call</button>}
      {myStream && (
        <div className="bg-red-200">
          <h1>My Stream</h1>
          <ReactPlayer playing muted height={100} width={200} url={myStream} />
        </div>
      )}
      {remoteStream && (
        <div className="bg-green-300">
          <h1>Remote Stream</h1>
          <ReactPlayer
            playing
            // muted
            height={100}
            width={200}
            url={remoteStream}
          />
        </div>
      )}
    </>
  );
}
