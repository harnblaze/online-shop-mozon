import React, { FC, useEffect } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { logOut } from '../store/actionCreators/auth';

const LogOut: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(logOut());
  }, []);
  return <h1>Loading...</h1>;
};

export default LogOut;
