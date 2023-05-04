import React, { FC } from 'react';
import useMockData from '../../hooks/useMockData';
import { Button, Container } from 'react-bootstrap';

const MockDataButton: FC = () => {
  const { error, initialize, progress, status } = useMockData();
  const handleClick = (): void => {
    void initialize();
  };
  return (
    <Container className={'align-items-center justify-content-center'}>
      <ul>
        <h5>Загрузка данных в firebase</h5>
        <li>Статус: {status}</li>
        <li>Прогресс: {progress}%</li>
        {error !== null ? <li>Ошибка:{error}</li> : ''}
      </ul>
      <div>
        <Button className={'mx-4'} onClick={handleClick}>
          Загрузить
        </Button>
      </div>
    </Container>
  );
};

export default MockDataButton;
