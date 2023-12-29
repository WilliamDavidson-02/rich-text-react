import { HTMLAttributes, ReactNode } from "react";

type greenGlowContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export default function GreenGlowContainer({
  children,
  ...props
}: greenGlowContainerProps) {
  return (
    <div
      {...props}
      className="border-rich-light-green bg-green-glow-radial text-rich-light-green flex h-full flex-grow cursor-pointer items-center justify-center rounded-md border p-2"
    >
      {children}
    </div>
  );
}
