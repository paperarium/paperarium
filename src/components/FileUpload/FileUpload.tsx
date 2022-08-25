/*
 * FileUpload.tsx
 * author: evan kirkiles
 * created on Thu Aug 25 2022
 * 2022 the nobot space,
 */
import s from "./FileUpload.module.scss";
import { FiX, FiCheckCircle, FiUpload } from "react-icons/fi";
import { ChangeEventHandler, MouseEventHandler, useRef } from "react";

type FileUploadProps = {
  files: FileList | null;
  setFiles: (newFile: FileList | null) => void;
  multiple?: boolean;
  accept?: string;
  withIcon?: boolean;
  children?: React.ReactNode;
};

const FileUpload: React.FC<FileUploadProps> = function FileUpload({
  files,
  multiple,
  accept,
  setFiles,
  children,
  withIcon,
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!event.target.files) return;
    console.log(event.target.files);
    setFiles(event.target.files);
  };

  const onClearClick: MouseEventHandler = (event) => {
    event.stopPropagation();
    setFiles(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <>
      <label
        className={files ? s.file_input_filled : s.file_input}
        onClick={
          !files
            ? () => {
                if (!inputRef.current) return;
                inputRef.current.click();
              }
            : undefined
        }
      >
        {children}
        {withIcon ? (
          <>
            <div className={s.spacer}>
              {files ? (
                <>
                  <FiCheckCircle />
                  {files[0].name}
                </>
              ) : null}
            </div>
            <div className={s.file_icon}>
              {files ? <FiX onClick={onClearClick} /> : <FiUpload />}
            </div>
          </>
        ) : null}
      </label>
      <input
        type="file"
        multiple={multiple}
        ref={inputRef}
        accept={accept}
        className={files ? s.file_input_real_populated : s.file_input_real}
        onChange={onChange}
      />
    </>
  );
};

export default FileUpload;
