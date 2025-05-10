import React from "react";
import { FaFemale } from "react-icons/fa";
import { FaMale } from "react-icons/fa";

interface GenderSelectionProps {
  selectedGender: "Male" | "Female" | null;
  onSelectGender: (val: "Male" | "Female") => void;
}

export default function GenderSelection({
  onSelectGender,
  selectedGender,
}: GenderSelectionProps) {
  return (
    <div className="flex justify-around items-center">
      <div
        className={`h-20 w-20 rounded-lg shadow flex justify-center items-center cursor-pointer ring-violet-400 ${
          selectedGender === "Female"
            ? "ring-2 bg-violet-200 text-violet-700"
            : "ring-1 bg-violet-100 text-violet-400"
        } hover:ring-2 hover:bg-violet-200 hover:text-violet-700`}
        onClick={() => onSelectGender("Female")}
      >
        <FaFemale size={28} />
      </div>
      <div
        className={`h-20 w-20 rounded-lg shadow flex justify-center items-center cursor-pointer ring-violet-400 ${
          selectedGender === "Male"
            ? "ring-2 bg-violet-200 text-violet-700"
            : "ring-1 bg-violet-100 text-violet-400"
        } hover:ring-2 hover:bg-violet-200 hover:text-violet-700`}
        onClick={() => onSelectGender("Male")}
      >
        <FaMale size={28} />
      </div>
    </div>
  );
}
