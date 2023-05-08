import React, { FC, useEffect } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { logOut } from '../store/actionCreators/auth';
import Loader from '../components/common/Loader';

const LogOut: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(logOut());
  }, []);
  return <Loader />;
};

export default LogOut;
