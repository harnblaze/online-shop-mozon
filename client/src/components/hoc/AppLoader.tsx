import React, { FC, PropsWithChildren, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import {
  fetchingProductsList,
  getIsMockDataLoaded,
  getProductsErrors,
  getProductsLoadingStatus,
} from '../../store/actionCreators/products';
import {
  fetchingCategories,
  getCategoriesLoadingStatus,
} from '../../store/actionCreators/category';
import { toast } from 'react-toastify';
import Loader from '../common/Loader';

const AppLoader: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const productsStatusLoading = useTypedSelector(getProductsLoadingStatus());
  const productsError = useTypedSelector(getProductsErrors());
  const categoriesStatusLoading = useTypedSelector(
    getCategoriesLoadingStatus(),
  );
  const categoriesError = useTypedSelector(getProductsErrors());
  const isMockDataLoaded = useTypedSelector(getIsMockDataLoaded());

  useEffect(() => {
    void dispatch(fetchingProductsList());
    void dispatch(fetchingCategories());
  }, [isMockDataLoaded]);

  if (productsError !== null) {
    toast.error(productsError);
  }
  if (categoriesError !== null) {
    toast.error(categoriesError);
  }
  if (productsStatusLoading && categoriesStatusLoading) return <Loader />;
  return <>{children}</>;
};
export default AppLoader;
