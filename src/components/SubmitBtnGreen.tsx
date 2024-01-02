import { ButtonHTMLAttributes, ReactNode } from "react";

type SubmitBtnGreenProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  isDisabled: boolean;
  isActive: boolean;
};

export default function SubmitBtnGreen({
  children,
  isDisabled,
  isActive,
  ...props
}: SubmitBtnGreenProps) {
  return (
    <button
      {...props}
      disabled={isDisabled}
      className={`flex cursor-pointer items-center justify-center rounded-md border p-2 outline-none transition duration-200 ease-in ${
        isActive ? "border-rich-light-green" : ""
      } ${
        isDisabled
          ? "border-zinc-600 bg-zinc-900 text-zinc-600"
          : "bg-rich-dark-green text-rich-light-green hover:border-rich-light-green border-rich-dark-green"
      }`}
    >
      {children}
    </button>
  );
}
