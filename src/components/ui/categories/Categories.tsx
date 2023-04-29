import React, { FC } from 'react';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import {
  getCategories,
  getCurrentCategory,
  setCurrentCategory,
} from '../../../store/actionCreators/category';
import { Form } from 'react-bootstrap';
import { useAppDispatch } from '../../../hooks/useAppDispatch';

const Categories: FC = () => {
  const dispatch = useAppDispatch();
  const categories = useTypedSelector(getCategories());
  const currentCategory = useTypedSelector(getCurrentCategory());
  console.log(currentCategory);
  const onCategoryChange = (category: string): void => {
    dispatch(setCurrentCategory(category));
  };

  return (
    <Form.Group controlId="category-select">
      <Form.Label>Выберите категорию:</Form.Label>
      <Form.Control
        as="select"
        value={currentCategory}
        onChange={e => onCategoryChange(e.target.value)}
      >
        <option value={undefined}>All</option>
        {categories.map(category => (
          <option key={category._id} value={category.name}>
            {category.name}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export default Categories;
