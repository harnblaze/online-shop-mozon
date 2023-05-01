import React, { FC, useMemo } from 'react';
import Categories from '../components/ui/categories/Categories';
import Sort from '../components/ui/sort/Sort';
import ProductsList from '../components/ui/productsList/ProductsList';
import { Col, Container, Row } from 'react-bootstrap';
import Search from '../components/ui/search/Search';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { getCurrentCategory } from '../store/actionCreators/category';
import { getProducts } from '../store/actionCreators/products';
import { getOrder, getSort } from '../store/actionCreators/sort';
import { getSearchQuery } from '../store/actionCreators/search';
import { IProduct } from '../types/products';

const Products: FC = () => {
  const products = useTypedSelector(getProducts());
  const currentCategory = useTypedSelector(getCurrentCategory());
  const searchQuery = useTypedSelector(getSearchQuery());
  const order = useTypedSelector(getOrder());
  const sortType = useTypedSelector(getSort());

  const sortedProducts = useMemo((): IProduct[] => {
    let filteredUsers = products;
    if (searchQuery !== '') {
      filteredUsers = filteredUsers.filter(prod =>
        prod.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    if (currentCategory !== undefined) {
      console.log(currentCategory);
      filteredUsers = filteredUsers.filter(
        prod => prod.category === currentCategory,
      );
    }

    filteredUsers = [...filteredUsers].sort((a, b) => {
      const sortNameA = a[sortType.sortProperty];
      const sortNameB = b[sortType.sortProperty];
      if (typeof sortNameA === 'string' || typeof sortNameB === 'string') {
        if (sortNameB < sortNameA) return order ? -1 : 1;
        if (sortNameB > sortNameA) return order ? 1 : -1;
        return 0;
      } else {
        return order ? sortNameB - sortNameA : sortNameA - sortNameB;
      }
    });

    return filteredUsers;
  }, [products, currentCategory, order, sortType, searchQuery]);
  return (
    <>
      <Container>
        <Row className={'justify-content-around flex-grow-1'}>
          <Col xs={'auto'}>
            <Search />
          </Col>
          <Col xs={'auto'}>
            <Categories />
          </Col>
          <Col xs={'auto'}>
            <Sort />
          </Col>
        </Row>
      </Container>
      <ProductsList products={sortedProducts} />
    </>
  );
};

export default Products;
