import React from "react";
import styles from "../css/button.module.css";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  title: string;
  width?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({ type, title, width, onClick }: ButtonProps) {
  return (
    <button
      className={styles.button}
      type={type || "button"}
      style={{ width: width || "auto" }}
    >
      {title}
    </button>
  );
}
