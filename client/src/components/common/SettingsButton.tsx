import React, { FC } from 'react';
import { Button } from 'react-bootstrap';
import { BsGear } from 'react-icons/bs';

interface ISettingsButtonProps {
  onClick: () => void;
}

const SettingsButton: FC<ISettingsButtonProps> = ({ onClick }) => {
  return (
    <Button variant="secondary" onClick={onClick}>
      <BsGear className={'mb-1 d-none d-sm-inline'} /> &nbsp;Редактировать
    </Button>
  );
};

export default SettingsButton;
