import React, { FC, useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { Button, Form, FormControl } from 'react-bootstrap';
import { setSearchQuery } from '../../store/actionCreators/search';
import { BsX } from 'react-icons/bs';

const Search: FC = () => {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    dispatch(setSearchQuery(value));
  };

  const handleClearClick = (): void => {
    setValue('');
    dispatch(setSearchQuery(''));
  };

  return (
    <Form onSubmit={handleSubmit} style={{ minWidth: '500px' }}>
      <Form.Label>Поиск на Mozon:</Form.Label>
      <div className="position-relative d-flex">
        <FormControl
          type="text"
          placeholder="Я ищу..."
          className="mr-sm-4 pr-40"
          value={value}
          onChange={handleInputChange}
        />
        {value !== '' && (
          <Button
            variant="link"
            className="position-absolute top-50 translate-middle-y text-muted p-0"
            style={{ right: '80px' }}
            onClick={handleClearClick}
          >
            <BsX />
          </Button>
        )}
        <Button
          variant="primary"
          type="submit"
          className="position-absolute top-50 end-0 translate-middle-y"
        >
          Search
        </Button>
      </div>
    </Form>
  );
};

export default Search;
