import React, { FC, PropsWithChildren, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import {
  fetchingProductsList,
  getProductsErrors,
  getProductsLoadingStatus,
} from '../../store/actionCreators/products';
import {
  fetchingCategories,
  getCategoriesLoadingStatus,
} from '../../store/actionCreators/category';
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
  const productsStatusLoading = useTypedSelector(getProductsLoadingStatus());
  const productsError = useTypedSelector(getProductsErrors());
  const categoriesStatusLoading = useTypedSelector(
    getCategoriesLoadingStatus(),
  );
  const categoriesError = useTypedSelector(getProductsErrors());
  const userLoadingStatus = useTypedSelector(getIsLoadingUser());
  const userError = useTypedSelector(getAuthErrors());
  const userIid = useTypedSelector(getUserID);

  useEffect(() => {
    void dispatch(loadUserData());
    void dispatch(fetchingProductsList());
    void dispatch(fetchingCategories());
  }, [userIid]);

  if (productsError !== null) {
    toast.error(productsError);
  }
  if (categoriesError !== null) {
    toast.error(categoriesError);
  }
  if (userError !== null) {
    toast.error(userError);
  }
  if (productsStatusLoading && categoriesStatusLoading && userLoadingStatus)
    return <Loader />;
  return <>{children}</>;
};
export default AppLoader;
