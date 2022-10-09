/*
 * MultiFileUpload.tsx
 * author: evan kirkiles
 * created on Thu Aug 25 2022
 * 2022 the nobot space,
 */
import s from './MultiFileUpload.module.scss';
import * as APIt from '../../supabase/types';
import { FiX, FiCheckCircle, FiUpload } from 'react-icons/fi';
import { ChangeEventHandler, DragEventHandler, useRef, useState } from 'react';

type MultiFileUploadProps = {
  files: (File | APIt.Picture)[] | null;
  setFiles: (newFiles: (File | APIt.Picture)[] | null) => void;
  accept?: string;
  withIcon?: boolean;
  children?: React.ReactNode;
};

const MultiFileUpload: React.FC<MultiFileUploadProps> =
  function MultiFileUpload({ files, accept, setFiles, children }) {
    const inputRef = useRef<HTMLInputElement>(null);
    // adds the files to the upload list
    const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      if (!event.target.files) return;
      setFiles([...(files || []), ...Array.from(event.target.files)]);
      if (inputRef.current) inputRef.current.value = '';
    };

    // drag events for dropping images
    const [dragActive, setDragActive] = useState(false);
    const onDrag: DragEventHandler = function (e) {
      e.stopPropagation();
      e.preventDefault();
      if (e.type === 'dragenter' || e.type === 'dragover') {
        setDragActive(true);
      } else if (e.type === 'dragleave') {
        setDragActive(false);
      }
    };
    const onDrop: DragEventHandler = function (e) {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      // make sure files are being dropped
      if (!e.dataTransfer.files || !e.dataTransfer.files[0]) return;
      // now filter the files for the accepts type
      let actualFiles: File[] = Array.from(e.dataTransfer.files);
      if (accept) {
        var MIMEtype = new RegExp(accept.replace('*', '.*'));
        actualFiles = actualFiles.filter((file) => MIMEtype.test(file.type));
      }
      const newFiles = [...(files || []), ...actualFiles];
      if (!newFiles || newFiles.length === 0) setFiles(null);
      else setFiles(newFiles);
    };

    return (
      <>
        <label
          className={files ? s.file_input_filled : s.file_input}
          onDragEnter={onDrag}
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
                    {(file as File).name !== undefined
                      ? (file as File).name
                      : (file as APIt.Picture).key.split('/').pop()}
                  </div>
                  <div className={s.file_icon}>
                    <FiX
                      onClick={() => {
                        if (files.length == 1) setFiles(null);
                        else setFiles(files.filter((_, ind) => ind !== i));
                      }}
                    />
                  </div>
                </div>
              ))}
              <div
                className={s.file_add_row}
                onClick={() => inputRef.current?.click()}
              >
                + add more +
              </div>
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
            <div style={{ marginLeft: '5px' }}>
              {files ? files.length : 0} image
              {files && files.length == 1 ? '' : 's'}.
            </div>
          </div>
          {dragActive && (
            <div
              className={s.drag_pad}
              onDragEnter={onDrag}
              onDragLeave={onDrag}
              onDragOver={onDrag}
              onDrop={onDrop}
            ></div>
          )}
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
