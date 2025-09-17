import { TFakeEventFile } from "@/shared/types/types";

export type TImageUploaderProps = {
  readOnly?: boolean;
  showEdit?: boolean;
  name: string;
  error?: string;
  label?: string;
  defaultValue?: string | File;
  onChange?: (e: TFakeEventFile) => void;
  onClickTrash?: () => void;
  classNamePreview?: string;
};