import React from "react";

type HeaderProps = {
  handleClick: () => void;
};

const Header = ({ handleClick }: HeaderProps) => {
  return (
    <header className="w-full">
      <div className="flex lg:flex-row flex-col items-start gap-2 lg:justify-between lg:items-center w-full">
        <h1 className="text-Slate900 font-bold text-2xl">
          Mortgage Calculator
        </h1>
        <button onClick={handleClick} className="text-Slate700 underline">
          Clear All
        </button>
      </div>
    </header>
  );
};

export default Header;
