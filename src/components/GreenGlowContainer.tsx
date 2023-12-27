import { ReactNode } from "react";

type greenGlowContainerProps = {
  children: ReactNode;
  onClick: () => void;
};

export default function GreenGlowContainer({
  children,
  onClick,
}: greenGlowContainerProps) {
  return (
    <div
      onClick={onClick}
      className="border-rich-light-green bg-green-glow-radial text-rich-light-green flex flex-grow cursor-pointer items-center justify-center rounded-md border p-2"
    >
      {children}
    </div>
  );
}
