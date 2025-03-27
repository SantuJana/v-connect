import React, { useRef } from "react";
// import styles from "../css/Input.module.css";

interface InputProps {
  name: string;
  value: string | number;
  placeholder?: string;
  width?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DatePicker({
  name,
  value,
  placeholder = "",
  width,
  onChange,
}: InputProps) {
  const dateInputRef = useRef<HTMLInputElement>(null);
  // const textInputRef = useRef<HTMLInputElement>(null);

  // const handleInputFocus = () => {
  //   dateInputRef.current?.showPicker();
  //   dateInputRef.current?.click();
  // };

  // const handleDateInputFocusOut = () => {
  //   console.log("bjk");
  //   textInputRef.current?.blur();
  // };

  const handleClick = () => {
    dateInputRef.current?.showPicker();
  };

  return (
    <div className="flex flex-col justify-center">
      {/* <input
            ref={textInputRef}
            className="border-2 p-2 focus:border-transparent focus:outline-none focus:ring ring-violet-300 rounded"
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            style={{width: width || "auto"}}
            onFocus={handleInputFocus}
        /> */}
      <input
        ref={dateInputRef}
        type="date"
        name={name}
        id=""
        value={value}
        onChange={onChange}
        onClick={handleClick}
        className="border-2 p-2 focus:border-transparent focus:outline-none focus:ring ring-violet-300 rounded"
      />
    </div>
  );
}
