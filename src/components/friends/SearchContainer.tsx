import React, { useCallback, useRef } from "react";
import { IoIosSearch } from "react-icons/io";

interface SearchContainerProps {
  badgeCount?: number;
  title: string;
  enableSearch?: boolean;
  handleSearchChange?: (val: string) => void
}

export default function SearchContainer({
  badgeCount,
  title,
  enableSearch,
  handleSearchChange
}: SearchContainerProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSearchClick = useCallback(() => {
    if (handleSearchChange){
      handleSearchChange(inputRef.current?.value || '');
    }
  }, [handleSearchChange])

  return (
    <div className="mb-3 flex flex-col justify-between">
      <p className="text-2xl text-slate-800 font-bold">
        {title}{" "}
        {badgeCount ? (
          <span className="text-sm font-bold text-slate-800 bg-slate-300 py-1 px-2 rounded-full">
            {badgeCount}
          </span>
        ) : (
          ""
        )}
      </p>
      {enableSearch && (
        <div className="flex gap-2 items-center md:justify-end w-full px-1">
          <input
            ref={inputRef}
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            className="flex-grow md:flex-grow-0 md:w-[300px] sm:flex px-5 py-2 mt-[2px] rounded-full outline-violet-700 text-slate-700 shadow-md text-sm"
          />
          <div className="flex-shrink-0 text-slate-800 rounded-lg cursor-pointer flex justify-center items-center " onClick={handleSearchClick}>
            <IoIosSearch size={28} />
          </div>
        </div>
      )}
    </div>
  );
}
