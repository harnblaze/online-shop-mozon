import React, { FC, memo } from 'react';
import { Pagination } from 'react-bootstrap';

interface IPaginationProps {
  pageNumbers: number[];
  activePage: number;
  handlePageChange: (page: number) => void;
}

const MyPagination: FC<IPaginationProps> = ({
  pageNumbers,
  activePage,
  handlePageChange,
}) => {
  if (pageNumbers.length === 1) return null;

  return (
    <Pagination className={'mb-4 mx-3'}>
      {pageNumbers.map(number => {
        return (
          <Pagination.Item
            key={number}
            active={number === activePage}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </Pagination.Item>
        );
      })}
    </Pagination>
  );
};

export default memo(MyPagination);
