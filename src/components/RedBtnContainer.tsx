import { HTMLAttributes, ReactNode } from "react";

type RedBtnContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export default function RedBtnContainer({
  children,
  ...props
}: RedBtnContainerProps) {
  return (
    <div
      {...props}
      className="bg-rich-dark-red text-rich-light-red border-rich-dark-red hover:border-rich-light-red flex cursor-pointer items-center justify-center rounded-md border p-2 transition-colors duration-300"
    >
      {children}
    </div>
  );
}
