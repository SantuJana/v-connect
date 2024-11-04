import React from "react";
import styles from "../css/Input.module.css";

interface InputProps {
  name: string;
  value: string | number;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  name,
  value,
  type = "text",
  onChange,
}: InputProps) {
  return (
    <input
      className={styles.input}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
}
