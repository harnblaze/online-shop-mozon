import React, { FC, useState } from 'react';
import styles from './Sort.module.scss';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const Sort: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState(false);
  const [currentSort, setCurrentSort] = useState(0);
  const sort = [
    { sortName: 'популярности', sortProperty: 'rating' },
    { sortName: 'цене', sortProperty: 'price' },
    {
      sortName: 'алфавиту',
      sortProperty: 'title',
    },
  ];
  const { products, limit, skip, total } = useTypedSelector(
    state => state.product,
  );
  const { setSortingProductsPage } = useActions();

  const handleOrderClick = (): void => {
    setOrder(prevState => !prevState);
    handleSortingClick(sort[currentSort], currentSort);
  };
  const handleSortingClick = (
    sortType: { sortName: string; sortProperty: string },
    id: number,
  ): void => {
    setCurrentSort(id);
    const newProducts = !order
      ? products.sort(
          // @ts-expect-error
          (a, b) => b[sortType.sortProperty] - a[sortType.sortProperty],
        )
      : products.sort(
          // @ts-expect-error
          (a, b) => a[sortType.sortProperty] - b[sortType.sortProperty],
        );
    setSortingProductsPage(newProducts, limit, skip, total);
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
        <span onClick={() => setIsOpen(!isOpen)}>
          {sort[currentSort].sortName}
        </span>
      </div>
      {isOpen && (
        <div className={styles.popup}>
          <ul className={styles.ul}>
            {sort.map((sortType, id) => (
              <li
                onClick={() => handleSortingClick(sortType, id)}
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
