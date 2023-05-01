import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { BsGear } from 'react-icons/bs';

const SettingsButton: FC = () => {
  const history = useHistory();

  const handleClickEdit = (): void => {
    history.push(history.location.pathname + '/edit');
  };

  return (
    <Button variant="secondary" onClick={handleClickEdit}>
      <BsGear className={'mb-1'} /> &nbsp;Редактировать
    </Button>
  );
};

export default SettingsButton;
