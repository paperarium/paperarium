/*
 * MultiFileUpload.tsx
 * author: evan kirkiles
 * created on Thu Aug 25 2022
 * 2022 the nobot space,
 */
import s from "./MultiFileUpload.module.scss";
import { FiX, FiCheckCircle, FiUpload } from "react-icons/fi";
import { ChangeEventHandler, MouseEventHandler, useRef } from "react";

type MultiFileUploadProps = {
  files: File[] | null;
  setFiles: (newFiles: File[] | null) => void;
  accept?: string;
  withIcon?: boolean;
  children?: React.ReactNode;
};

const MultiFileUpload: React.FC<MultiFileUploadProps> =
  function MultiFileUpload({ files, accept, setFiles, children }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      if (!event.target.files) return;
      setFiles(Array.from(event.target.files));
      if (inputRef.current) inputRef.current.value = "";
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
          {files ? (
            <div className={s.file_container}>
              {files.map((file, i) => (
                <div className={s.file_row} key={i}>
                <FiCheckCircle />
                  <div className={s.spacer}>
                    {file.name}
                  </div>
                  <div className={s.file_icon}>
                    <FiX onClick={() => {
                      if (files.length == 1) setFiles(null);
                      else setFiles(files.filter((_, ind) => ind !== i))
                    }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <FiUpload size={40} />
              {children}
            </>
          )}
          <div className={s.meta_info_row}>
            {files ? (
              <div
                className={s.clear_all}
                onClick={() => {
                  setFiles(null);
                }}
              >
                <FiX />
                CLEAR
              </div>
            ) : null}
            <div style={{ marginLeft: "5px" }}>
              {files ? files.length : 0} image
              {files && files.length == 1 ? "" : "s"}.
            </div>
          </div>
        </label>
        <input
          type="file"
          multiple={true}
          ref={inputRef}
          accept={accept}
          className={files ? s.file_input_real_populated : s.file_input_real}
          onChange={onChange}
        />
      </>
    );
  };

export default MultiFileUpload;
