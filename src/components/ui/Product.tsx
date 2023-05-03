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
  images,
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
  const [image, setImage] = useState(thumbnail);
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
          <Image src={image} fluid />

          {images?.map((url, index) => (
            <Button variant={'link'} key={index}>
              <Image
                src={url}
                className="mt-3 mr-3 flex-shrink-0"
                style={{ width: '30%' }}
                onClick={() => setImage(url)}
              />
            </Button>
          ))}
        </Col>
        <Col md={6}>
          <h2>{title}</h2>
          <h5>{brand}</h5>
          <p>{description}</p>
          <p>Price: {price} $</p>
          {discountPercentage !== 0 && (
            <p>
              Discount: <Badge bg="success">{discountPercentage}% off</Badge>
            </p>
          )}
          <p>Rating: {rating}/5</p>
          <hr />
          <div className={'d-flex justify-content-between'}>
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
