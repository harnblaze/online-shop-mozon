import React, { FC, PropsWithChildren, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { toast } from 'react-toastify';
import {
  getAuthErrors,
  getIsLoadingUser,
  loadUserData,
} from '../../store/actionCreators/auth';
import Loader from '../common/Loader';
import { getUserID } from '../../services/localStorage.service';

const AppLoader: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const userLoadingStatus = useTypedSelector(getIsLoadingUser());
  const userError = useTypedSelector(getAuthErrors());
  const userIid = useTypedSelector(getUserID);

  useEffect(() => {
    void dispatch(loadUserData());
  }, [userIid]);

  if (userError !== null) {
    toast.error(userError);
  }
  if (userLoadingStatus) return <Loader />;
  return <>{children}</>;
};
export default AppLoader;
