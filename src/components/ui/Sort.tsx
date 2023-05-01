import React, { FC, ReactElement } from 'react';
import { ISortType } from '../../types/products';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import {
  getOrder,
  getSort,
  setSortingProducts,
} from '../../store/actionCreators/sort';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { BsSortDown, BsSortDownAlt } from 'react-icons/bs';

const Sort: FC = () => {
  const dispatch = useAppDispatch();
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

  const onSortOptionChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const newSort = sort.find(el => el.sortProperty === event.target.value);
    if (newSort !== undefined) {
      dispatch(setSortingProducts({ currentSort: newSort, order }));
    }
  };

  const onSortReverseChange = (): void => {
    dispatch(setSortingProducts({ currentSort, order: !order }));
  };

  const getSortIcon = (): ReactElement => {
    return order ? <BsSortDown /> : <BsSortDownAlt />;
  };

  return (
    <Form.Group controlId="sort-select">
      <Form.Label>Сортировать по:</Form.Label>
      <Row>
        <Col xs={'auto'}>
          <Form.Select
            value={currentSort.sortProperty}
            onChange={onSortOptionChange}
          >
            {sort.map(option => (
              <option key={option.sortProperty} value={option.sortProperty}>
                {option.sortName}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col>
          <Button variant="link" onClick={onSortReverseChange}>
            {getSortIcon()}
          </Button>
        </Col>
      </Row>
    </Form.Group>
  );
};

export default Sort;
