import React, { FC, useState } from 'react';
import styles from './Sort.module.scss';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { ISortType } from '../../../types/products';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import {
  getOrder,
  getSort,
  setSortingProducts,
} from '../../../store/actionCreators/products';

const Sort: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const order = useTypedSelector(getOrder());
  const currentSort = useTypedSelector(getSort());

  const sort: ISortType[] = [
    { sortName: 'популярности', sortProperty: 'rating' },
    { sortName: 'цене', sortProperty: 'price' },
    {
      sortName: 'алфавиту',
      sortProperty: 'title',
    },
  ];

  const handleOrderClick = (): void => {
    setSortingProducts({ currentSort, order: !order });
  };
  const handleSortingClick = (sortType: ISortType, id: number): void => {
    setIsOpen(false);
  };

  return (
    <div className={styles.sort}>
      <div className={isOpen ? styles.label : styles.labelDown}>
        {order ? (
          <AiFillCaretDown className={styles.svg} />
        ) : (
          <AiFillCaretUp className={styles.svg} />
        )}
        <b onClick={() => handleOrderClick()}>Сортировать по:</b>
        <span onClick={() => setIsOpen(!isOpen)}>{currentSort.sortName}</span>
      </div>
      {isOpen && (
        <div className={styles.popup}>
          <ul className={styles.ul}>
            {sort.map((sortType, id) => (
              <li
                onClick={() => handleSortingClick(sortType, id)}
                className={
                  currentSort.sortProperty === sortType.sortProperty
                    ? styles.liActive
                    : styles.li
                }
                key={sortType.sortName}
              >
                {sortType.sortName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
