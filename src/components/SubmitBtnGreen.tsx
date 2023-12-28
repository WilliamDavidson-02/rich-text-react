import { ReactNode } from "react";

type SubmitBtnGreenProps = {
  children: ReactNode;
  isDisabled: boolean;
};

export default function SubmitBtnGreen({
  children,
  isDisabled,
}: SubmitBtnGreenProps) {
  return (
    <button
      disabled={isDisabled}
      type="submit"
      role="button"
      className={`flex items-center justify-center rounded-md border p-2 outline-none transition duration-200 ease-in ${
        isDisabled
          ? "border-zinc-600 bg-zinc-900 text-zinc-600"
          : "bg-rich-dark-green text-rich-light-green focus:border-rich-light-green hover:border-rich-light-green border-rich-dark-green"
      }`}
    >
      {children}
    </button>
  );
}
