import React, {FC} from 'react';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {getProducts} from '../store/actionCreators/products';
import NoProducts from '../components/common/NoProducts';
import Products from '../components/ui/Products';

const Catalog: FC = () => {
    const products = useTypedSelector(getProducts());
    if (products === null || products === undefined || products.length === 0) return <NoProducts/>;
    return <Products products={products}/>;
};

export default Catalog;
