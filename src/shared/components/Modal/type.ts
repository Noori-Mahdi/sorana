export type TModalProps = {
  isDrawer?: boolean;
  type?: null | "warning" | "info" | "error" | "map";
  isOpen?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  modalClassName?: string;
  classNameBox?: string;
  size?: string;
  label?: string | React.ReactNode;
  force?: boolean;
};