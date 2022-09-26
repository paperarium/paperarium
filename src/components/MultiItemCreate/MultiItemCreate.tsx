/*
 * MultiItemCreate.tsx
 * author: evan kirkiles
 * created on Mon Sep 26 2022
 * 2022 the nobot space,
 */

import s from './MultiItemCreate.module.scss';

type GenericOptionType = { id: number };
export type ItemRendererProps<T> = {
  item: T;
  validateItem: (item: T) => boolean;
  onUpdate: (newItem: T) => void;
  onDelete: () => void;
};

type MultiItemCreateProps<T extends GenericOptionType> = {
  contentsAddButton: string;
  ItemComponent: React.FC<ItemRendererProps<T>>;
  items: T[];
  defaultItem: Omit<T, 'id'>;
  setItems: (items: T[]) => void;
  validateItem: (option: T) => boolean;
};

const MultiItemCreate = function MultiItemCreate<T extends GenericOptionType>({
  contentsAddButton,
  items,
  defaultItem,
  setItems,
  validateItem,
  ItemComponent,
}: MultiItemCreateProps<T>) {
  return (
    <>
      <div className={s.container}>
        {items.map((item, i) => (
          <ItemComponent
            item={item}
            key={item.id}
            validateItem={validateItem}
            onUpdate={(newItem: T) => {
              const newItems = [...items];
              newItems[i] = newItem;
              setItems(newItems);
            }}
            onDelete={() => {
              const newItems = [...items];
              newItems.splice(i, 1);
              setItems(newItems);
            }}
          />
        ))}
      </div>
      <div
        className={s.add_button}
        onClick={() => {
          setItems([
            ...items,
            {
              ...defaultItem,
              id: Math.floor(Math.random() * 10000),
            } as T,
          ]);
        }}
      >
        {contentsAddButton}
      </div>
    </>
  );
};

export default MultiItemCreate;
