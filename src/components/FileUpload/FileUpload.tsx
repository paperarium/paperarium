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
  file: File | null;
  setFile: (newFile: File | null) => void;
  accept?: string;
  withIcon?: boolean;
  children?: React.ReactNode;
};

const FileUpload: React.FC<FileUploadProps> = function FileUpload({
  file,
  accept,
  setFile,
  children,
  withIcon,
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!event.target.files) return;
    console.log(event.target.files);
    setFile(event.target.files[0]);
  };

  const onClearClick: MouseEventHandler = (event) => {
    event.stopPropagation();
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <>
      <label
        className={file ? s.file_input_filled : s.file_input}
        onClick={
          !file
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
              {file ? (
                <>
                  <FiCheckCircle />
                  {file.name}
                </>
              ) : null}
            </div>
            <div className={s.file_icon}>
              {file ? <FiX onClick={onClearClick} /> : <FiUpload />}
            </div>
          </>
        ) : null}
      </label>
      <input
        type="file"
        multiple={false}
        ref={inputRef}
        accept={accept}
        className={file ? s.file_input_real_populated : s.file_input_real}
        onChange={onChange}
      />
    </>
  );
};

export default FileUpload;
