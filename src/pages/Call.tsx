import React, { useCallback, useEffect, useState } from "react";
import Input from "../components/Input";
import { SocketContextType, useSocket } from "../context/socketContext";
import { useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  room: number;
}

export default function Call() {
  const initialValue: FormData = {
    email: "",
    room: 0,
  };
  const [formData, setFormData] = useState<FormData>(initialValue);
  const { socket } = useSocket() as SocketContextType;
  const navigate = useNavigate();

  const handleRoomJoin = useCallback(
    (data: { email: string; room: number }) => {
      console.log("-----", data)
      const { room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket?.on("room:join", handleRoomJoin);

    return () => {
      socket?.off("room:join", handleRoomJoin);
    };
  }, [socket, handleRoomJoin]);

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    },
    [setFormData]
  );

  const handleFormSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { email, room } = formData;

      if (!email || !room) {
        alert("Please enter an email and room to join");
        return;
      }

      socket?.emit("room:join", formData);
    },
    [socket, formData]
  );

  return (
    <div>
      <form method="post" onSubmit={handleFormSubmit}>
        <div>
          <label>Email:</label>
          <Input
            type="email"
            name="email"
            value={formData?.email}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label>Room:</label>
          <Input
            type="number"
            name="room"
            value={formData?.room}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <button type="submit">Join</button>
        </div>
      </form>
    </div>
  );
}
