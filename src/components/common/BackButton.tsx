import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { AiFillCaretLeft } from 'react-icons/ai';

const BackHistoryButton: FC = () => {
  const history = useHistory();
  return (
    <Button variant="secondary" onClick={() => history.goBack()}>
      <AiFillCaretLeft className={'mb-1 d-none d-sm-inline'} /> &nbsp; Назад
    </Button>
  );
};

export default BackHistoryButton;
