/*
 * ItemRendererVariant.tsx
 * author: evan kirkiles
 * created on Mon Sep 26 2022
 * 2022 the nobot space,
 */
import React from 'react';
import {
  BsCheckSquare,
  BsCheckSquareFill,
  BsExclamationSquareFill,
} from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';
import * as APIt from '../../supabase/types';
import FileUpload from '../FileUpload/FileUpload';
import { ItemRendererProps } from './MultiItemCreate';
import s from './MultiItemCreate.module.scss';

const ItemRendererVariant: React.FC<
  ItemRendererProps<APIt.PapercraftVariantLocal>
> = function ItemRendererVariant({ item, validateItem, onUpdate, onDelete }) {
  const isValid = validateItem(item);

  return (
    <div className={s.item_container}>
      <div className={s.item_column}>
        <div className={s.item_row}>
          <input
            type="text"
            className={s.input_field}
            placeholder={'Name'}
            value={item.title}
            onChange={(e) => {
              onUpdate({
                ...item,
                title: e.target.value,
              });
            }}
          />
          <FileUpload
            file={item.pdo_url}
            setFile={(newFile) => {
              onUpdate({
                ...item,
                pdo_url: newFile,
              });
            }}
            accept={'.pdo'}
            withIcon
            style={{ width: 'auto' }}
          >
            .PDO
          </FileUpload>
        </div>
        <div className={s.item_row}>
          <FileUpload
            file={item.pdf_lineless_url}
            setFile={(newFile) => {
              onUpdate({
                ...item,
                pdf_lineless_url: newFile,
              });
            }}
            accept={'.pdf'}
            style={{ width: 'auto' }}
            withIcon
          >
            .PDF - lineless
          </FileUpload>
          <FileUpload
            file={item.pdf_lined_url}
            setFile={(newFile) => {
              onUpdate({
                ...item,
                pdf_lined_url: newFile,
              });
            }}
            accept={'.pdf'}
            withIcon
            style={{ width: 'auto' }}
          >
            .PDF - lined
          </FileUpload>
        </div>
      </div>
      <div className={s.item_column} style={{ flex: 'unset' }}>
        <div className={s.item_delete_button} onClick={onDelete}>
          <GrClose />
        </div>
        <div className={`${s.item_status_button} ${isValid ? 'valid' : ''}`}>
          {isValid ? <BsCheckSquareFill /> : <BsExclamationSquareFill />}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ItemRendererVariant);
