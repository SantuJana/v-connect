import React from "react";

interface Item {
  id: number;
  item: string;
}

interface TabProps {
  tabItems: Item[];
  selectedItem: number;
  onTabChange: (val: number) => void;
}

export default function Tab({ tabItems, selectedItem, onTabChange }: TabProps) {
  return (
    <div className="flex flex-row gap-4 items-center border-b border-violet-300 text-slate-600">
      {tabItems.map((item) => (
        <div
          key={item.id}
          className={`py-2 cursor-pointer ${
            selectedItem === item.id &&
            "border-b-4 border-violet-600 text-violet-600 cursor-default"
          }`}
          onClick={() => onTabChange(item.id)}
        >
          {item.item}
        </div>
      ))}
    </div>
  );
}
