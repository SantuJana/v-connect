import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  title: string;
  width?: string;
  loading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
  type,
  title,
  width,
  loading,
  onClick,
}: ButtonProps) {
  return (
    <button
      // className={styles.button}
      className={`bg-violet-500 text-white rounded text-lg py-2 hover:bg-violet-700 focus:ring ring-violet-300 flex items-center justify-center gap-1 ${
        loading ? "pointer-events-none" : ""
      }`}
      type={type || "button"}
      style={{ width: width || "auto" }}
    >
      {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
      {title}
    </button>
  );
}
