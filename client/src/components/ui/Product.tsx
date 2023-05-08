import React, { FC, useState } from 'react';
import { IProduct } from '../../types/products';
import { Badge, Button, Col, Container, Image, Row } from 'react-bootstrap';
import BackButton from '../common/BackButton';
import SettingsButton from '../common/SettingsButton';
import { addItem } from '../../store/actionCreators/cart';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import ProductForm from './ProductForm';
import { getProducts } from '../../store/actionCreators/products';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { getCurrentUserData } from '../../store/actionCreators/auth';

const Product: FC<IProduct> = ({
  _id,
  title,
  thumbnail,
  description,
  price,
  rating,
  brand,
  discountPercentage,
}) => {
  const dispatch = useAppDispatch();
  const userData = useTypedSelector(getCurrentUserData());
  const products = useTypedSelector(getProducts());
  const [showProductForm, setShowProductForm] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<
    IProduct | undefined
  >(undefined);

  const handleAddToCart = (): void => {
    dispatch(addItem({ _id, title, price, quantity: 1 }));
  };

  const handleEdit = (): void => {
    const product = products.find(el => el._id === _id);
    setSelectedProductId(product);
    setShowProductForm(true);
  };

  const handleCloseProductForm = (): void => {
    setShowProductForm(false);
    setSelectedProductId(undefined);
  };

  return (
    <Container>
      <Row>
        <Col md={6} className={'d-flex flex-wrap'}>
          <Image src={thumbnail} fluid />
        </Col>
        <Col md={6}>
          <h2>{title}</h2>
          <h5>
            <Badge bg={'info'}>{brand}</Badge>
          </h5>
          <p>{description}</p>
          <p>Цена: {price} $</p>
          {discountPercentage !== 0 && (
            <p>
              Скидка: <Badge bg="success">{discountPercentage}%</Badge>
            </p>
          )}
          <p>Рейтинг: {rating}/5</p>
          <hr />
          <div className={'d-flex justify-content-center flex-wrap gap-2'}>
            <BackButton />
            {userData?.isAdmin === true && (
              <SettingsButton onClick={handleEdit} />
            )}
            <Button variant="primary" onClick={handleAddToCart}>
              Добавить в корзину
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
      <ProductForm
        product={selectedProductId}
        onClose={handleCloseProductForm}
        show={showProductForm}
      />
    </Container>
  );
};

export default Product;
