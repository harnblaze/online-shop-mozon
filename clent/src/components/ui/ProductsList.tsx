import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import ProductItem from './ProductItem';
import { Container, Row } from 'react-bootstrap';
import { IProduct } from '../../types/products';
import MyPagination from '../common/MyPagination';

interface IProductsListProps {
  products: IProduct[];
}

const productsPerPage = 12;
const ProductsList: FC<IProductsListProps> = ({ products }) => {
  const [activePage, setActivePage] = useState(1);

  const indexOfLastProduct = useMemo(
    () => activePage * productsPerPage,
    [activePage],
  );
  const indexOfFirstProduct = useMemo(
    () => indexOfLastProduct - productsPerPage,
    [indexOfLastProduct],
  );
  const currentProducts = useMemo(
    () => products.slice(indexOfFirstProduct, indexOfLastProduct),
    [indexOfFirstProduct, indexOfLastProduct, products],
  );

  const handlePageChange = useCallback((pageNumber: number): void => {
    setActivePage(pageNumber);
  }, []);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    handlePageChange(1);
  }, [products]);

  return (
    <>
      <Container>
        <Row>
          <MyPagination
            pageNumbers={pageNumbers}
            activePage={activePage}
            handlePageChange={handlePageChange}
          />
          {currentProducts?.map(product => {
            return <ProductItem product={product} key={product._id} />;
          })}
          <MyPagination
            pageNumbers={pageNumbers}
            activePage={activePage}
            handlePageChange={handlePageChange}
          />
        </Row>
      </Container>
    </>
  );
};

export default memo(ProductsList);
