import React, { FC } from 'react';
import { createArrayOfNumbers } from '../../../utils/utils';
import styles from './Pagination.module.scss';

interface IPaginationProps {
  pagesCount: number;
  currentPage: number;
  changePage: (page: number) => void;
}

const Pagination: FC<IPaginationProps> = ({
  pagesCount,
  currentPage,
  changePage,
}) => {
  const pages = createArrayOfNumbers(1, pagesCount + 1);
  return (
    <>
      {pagesCount !== 1 && (
        <div className={styles.pagination}>
          {pages.map(page => {
            return (
              <button
                className={
                  page !== currentPage
                    ? styles.item
                    : [styles.active, styles.item].join(' ')
                }
                key={page}
                onClick={() => changePage(page)}
              >
                {page}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Pagination;
