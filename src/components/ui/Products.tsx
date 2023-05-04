import React, { FC, useMemo } from 'react';
import Categories from './Categories';
import Sort from './Sort';
import ProductsList from './ProductsList';
import { Col, Container, Row } from 'react-bootstrap';
import Search from './Search';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { getCurrentCategory } from '../../store/actionCreators/category';
import { getOrder, getSort } from '../../store/actionCreators/sort';
import { getSearchQuery } from '../../store/actionCreators/search';
import { IProduct } from '../../types/products';

interface IProductsProps {
  products: IProduct[];
}

const Products: FC<IProductsProps> = ({ products }) => {
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
        <Row
          className={
            'justify-content-md-center justify-content-sm-start flex-grow-1'
          }
          xs={1}
        >
          <Col xs={100}>
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
