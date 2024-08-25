import type { ButtonHTMLAttributes } from "react";
import React from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
};

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`bg-Lime hover:bg-opacity-50 text-Slate900 text-lg font-bold cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
