import React, { createContext, useCallback, useContext, useState } from "react";
import { RxCross2 } from "react-icons/rx";

type Notification = {
  id: number;
  type: "success" | "warning" | "failed" | "info";
  msg: string;
};
export interface NotificationContext {
  msgArray: Notification[];
  success: (msg: string) => void;
  failed: (msg: string) => void;
  warn: (msg: string) => void;
  info: (msg: string) => void;
}

const notificationContext = createContext<NotificationContext | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [msgArray, setMsgArray] = useState<Notification[]>([]);

  const colorClass = {
    success: "text-green-700",
    failed: "text-red-600",
    warning: "text-yellow-600",
    info: "text-sky-600",
  };

  const ringClass = {
    success: "ring-green-700",
    failed: "ring-red-600",
    warning: "ring-yellow-600",
    info: "ring-sky-600",
  };

  const autoRemove = useCallback(
    (id: number) => {
      setTimeout(() => {
        setMsgArray((prevData) => prevData.filter((data) => data.id !== id));
      }, 3000);
    },
    [setMsgArray]
  );

  const manualRemove = useCallback(
    (id: number) => {
      setMsgArray((prevData) => prevData.filter((data) => data.id !== id));
    },
    [setMsgArray]
  );

  const success = useCallback(
    (msg: string) => {
      const id = Date.now();
      setMsgArray((prevData) => [...prevData, { id, msg, type: "success" }]);
      autoRemove(id);
    },
    [setMsgArray, autoRemove]
  );

  const failed = useCallback(
    (msg: string) => {
      const id = Date.now();
      setMsgArray((prevData) => [...prevData, { id, msg, type: "failed" }]);
      autoRemove(id);
    },
    [setMsgArray, autoRemove]
  );

  const warn = useCallback(
    (msg: string) => {
      const id = Date.now();
      setMsgArray((prevData) => [...prevData, { id, msg, type: "warning" }]);
      autoRemove(id);
    },
    [setMsgArray, autoRemove]
  );

  const info = useCallback(
    (msg: string) => {
      const id = Date.now();
      setMsgArray((prevData) => [...prevData, { id, msg, type: "info" }]);
      autoRemove(id);
    },
    [setMsgArray, autoRemove]
  );

  return (
    <notificationContext.Provider
      value={{ msgArray, success, failed, warn, info }}
    >
      {children}
      <div className="absolute top-2 right-2">
        {msgArray.map((notice) => (
          <>
            <div
              key={notice.id}
              className={`rounded bg-white p-2 ring-1 flex items-center mb-1 ${
                ringClass[notice.type]
              }`}
            >
              <RxCross2
                size={16}
                onClick={() => manualRemove(notice.id)}
                className="order-2 ms-2 cursor-pointer"
              />
              <p className="capitalize grow">
                <b className={`mr-1 ${colorClass[notice.type]}`}>
                  {notice.type}
                </b>
                {notice.msg}
              </p>
            </div>
          </>
        ))}
      </div>
    </notificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(notificationContext);
};
