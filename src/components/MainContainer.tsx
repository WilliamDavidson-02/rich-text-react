import { ReactNode } from "react";

type mainContainerProps = {
  children: ReactNode;
};

export default function MainContainer({ children }: mainContainerProps) {
  return (
    <main className="mx-auto max-w-[1440px] px-6 lg:px-16">{children}</main>
  );
}
