import { ReactNode } from "react";

type SubmitBtnGreenProps = {
  children: ReactNode;
};

export default function SubmitBtnGreen({ children }: SubmitBtnGreenProps) {
  return (
    <button
      type="submit"
      role="button"
      className="bg-rich-dark-green text-rich-light-green focus:border-rich-light-green hover:border-rich-light-green border-rich-dark-green flex items-center justify-center rounded-md border p-2 outline-none transition duration-200 ease-in"
    >
      {children}
    </button>
  );
}
