/*
 * FileUpload.tsx
 * author: evan kirkiles
 * created on Thu Aug 25 2022
 * 2022 the nobot space,
 */
import s from './FileUpload.module.scss';
import { FiX, FiCheckCircle, FiUpload } from 'react-icons/fi';
import {
  ChangeEventHandler,
  HTMLAttributes,
  MouseEventHandler,
  useRef,
} from 'react';

type FileUploadProps = {
  file: File | string | null;
  setFile: (newFile: File | string | null) => void;
  accept?: string;
  withIcon?: boolean;
  children?: React.ReactNode;
  style?: HTMLAttributes<HTMLLabelElement>['style'];
  showName?: boolean;
};

const FileUpload: React.FC<FileUploadProps> = function FileUpload({
  file,
  accept,
  setFile,
  children,
  withIcon,
  style,
  showName,
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!event.target.files) return;
    setFile(event.target.files[0]);
  };

  const onClearClick: MouseEventHandler = (event) => {
    event.stopPropagation();
    setFile(null);
    if (inputRef.current) inputRef.current.value = '';
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
        style={style}
      >
        {children}
        {withIcon ? (
          <>
            <div className={s.spacer}>
              {file ? (
                <>
                  <FiCheckCircle />
                  {showName
                    ? typeof file === 'string'
                      ? file.split('/').pop()
                      : file.name
                    : null}
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
