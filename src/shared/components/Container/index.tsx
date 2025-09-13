import { twMerge } from "tailwind-merge";
import { TContainerProps } from "./type";

const Container = ({
  children,
  className,
  removeSpaceBottom = false,
  removeSpaceTop = false,
  removeSpaceRight = false,
  removeSpaceLeft = false,
}: TContainerProps) => {
  return (
    <div
      className={twMerge(
        "p-5",
        className,
        removeSpaceBottom && "pb-0",
        removeSpaceTop && "pt-0",
        removeSpaceRight && "pr-0",
        removeSpaceLeft && "pl-0"
      )}
    >
      {children}
    </div>
  );
};

export default Container;
