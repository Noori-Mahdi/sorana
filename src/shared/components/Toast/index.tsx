import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { TToastProps } from "../../types/componentsType";
import { twMerge } from "tailwind-merge";

const Toast = ({ message, type, onClose }: TToastProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible || !message) return null;

  return (
    <div className="relative w-80 bg-opacity-75 transform bg-gray-50 p-4 rounded-lg  shadow-lg z-[99999999999] flex items-center justify-between">
      <div
        className={twMerge(
          `text-sm font-medium tracking-wide`,
          type === "error"
            ? "text-red-500"
            : type === "warning"
            ? "text-yellow-500"
            : "text-green-500"
        )}
      >
        {message}
      </div>
      <div className="cursor-pointer">
        <IoIosClose
          className="hover:text-red-700"
          onClick={() => {
            setVisible(false);
            if (onClose) onClose();
          }}
        />
      </div>
      <div className="absolute z-[99999999999999999999] bottom-0 left-0 h-1 rounded-bl-md rounded-br-md w-full bg-gray-400 overflow-hidden">
        <div
          className={twMerge(
            `absolute bottom-0 left-0 h-1 rounded-bl-md rounded-br-md toast-progress transition-all duration-500`,
            type === "error"
              ? "bg-red-500"
              : type === "warning"
              ? "bg-yellow-500"
              : "bg-green-500"
          )}
        ></div>
      </div>
    </div>
  );
};

export default Toast;
