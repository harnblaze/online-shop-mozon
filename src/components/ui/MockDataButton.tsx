import React, { FC } from 'react';
import useMockData from '../../hooks/useMockData';

const MockDataButton: FC = () => {
  const { error, initialize, progress, status } = useMockData();
  const handleClick = (): void => {
    void initialize();
  };
  return (
    <div className={'d-flex align-items-center'}>
      <ul>
        <h5>Загрузка данных в firebase</h5>
        <li>Статус: {status}</li>
        <li>Прогресс: {progress}%</li>
        {error !== null ? <li>Ошибка:{error}</li> : ''}
      </ul>
      <div>
        <button className={'btn btn-primary'} onClick={handleClick}>
          Загрузить
        </button>
      </div>
    </div>
  );
};

export default MockDataButton;
