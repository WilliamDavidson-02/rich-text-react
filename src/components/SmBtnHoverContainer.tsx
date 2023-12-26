import { ReactNode } from "react";

type SmBtnHoverContainerProps = {
  children: ReactNode;
  onClick: () => void;
};

export default function SmBtnHoverContainer({
  children,
  onClick,
}: SmBtnHoverContainerProps) {
  return (
    <div
      className="bg-rich-dark-green text-rich-light-green hover:border-rich-light-green border-rich-dark-green cursor-pointer rounded border outline-none transition-colors duration-200 ease-in"
      onClick={onClick}
    >
      {children}
    </div>
  );
}
