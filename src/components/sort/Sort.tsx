import React, { FC, useState } from 'react';
import styles from './Sort.module.scss';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

const Sort: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState(true);
  const [currentSort, setCurrentSort] = useState(0);
  const sort = [
    { sortName: 'популярности', sortProperty: 'rating' },
    { sortName: 'цене', sortProperty: 'price' },
    {
      sortName: 'алфавиту',
      sortProperty: 'title',
    },
  ];
  return (
    <div className={styles.sort}>
      <div className={isOpen ? styles.label : styles.labelDown}>
        {order ? (
          <AiFillCaretDown className={styles.svg} />
        ) : (
          <AiFillCaretUp className={styles.svg} />
        )}
        <b onClick={() => setOrder(!order)}>Сортировать по:</b>
        <span onClick={() => setIsOpen(!isOpen)}>
          {sort[currentSort].sortName}
        </span>
      </div>
      {isOpen && (
        <div className={styles.popup}>
          <ul className={styles.ul}>
            {sort.map((sortType, id) => (
              <li
                onClick={() => setCurrentSort(id)}
                className={currentSort === id ? styles.liActive : styles.li}
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
