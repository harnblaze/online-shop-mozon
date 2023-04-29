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

const AppLoader: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const productsStatusLoading = useTypedSelector(getProductsLoadingStatus());
  const productsError = useTypedSelector(getProductsErrors());
  const categoriesStatusLoading = useTypedSelector(
    getCategoriesLoadingStatus(),
  );
  const categoriesError = useTypedSelector(getProductsErrors());
  useEffect(() => {
    // for (const prod of products) {
    //   void httpService.put(`product/${prod._id}`, prod);
    // }
    //
    // for (const cat of categories) {
    //   void httpService.put(`category/${cat._id}`, cat);
    // }

    void dispatch(fetchingProductsList());
    void dispatch(fetchingCategories());
  }, []);
  if (productsError !== null) {
    toast.error(productsError);
  }
  if (categoriesError !== null) {
    toast.error(categoriesError);
  }
  if (productsStatusLoading && categoriesStatusLoading) return <>Loading...</>;
  return <>{children}</>;
};
export default AppLoader;
