import React from 'react';

interface TooltipProp {
    text: string;
    children: React.ReactNode;
}

const Tooltip = ({ text, children }: TooltipProp) => {
  return (
    <div className="relative group inline-block cursor-pointer">
      {/* The element triggering the tooltip */}
      {children}

      {/* Tooltip text */}
      <div className="absolute bottom-full mb-2 hidden group-hover:block w-max px-2 py-1 bg-gray-700 text-white text-xs rounded-md whitespace-nowrap z-10">
        {text}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-full border-8 border-transparent border-t-gray-700"></div> {/* Tooltip arrow */}
      </div>
    </div>
  );
};

export default Tooltip;
