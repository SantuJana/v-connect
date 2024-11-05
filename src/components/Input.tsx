import React from "react";
import styles from "../css/Input.module.css";

interface InputProps {
  name: string;
  value: string | number;
  type?: string;
  placeholder?: string;
  width?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  name,
  value,
  type = "text",
  placeholder = "",
  width,
  onChange,
}: InputProps) {
  return (
    <input
      className={styles.input}
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      style={{width: width || "auto"}}
    />
  );
}
