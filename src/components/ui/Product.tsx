import React, { FC, useState } from 'react';
import { IProduct } from '../../types/products';
import { Badge, Button, Col, Container, Image, Row } from 'react-bootstrap';
import BackButton from '../common/BackButton';
import SettingsButton from '../common/SettingsButton';

const Product: FC<IProduct> = ({
  title,
  images,
  thumbnail,
  description,
  price,
  rating,
  brand,
  discountPercentage,
}) => {
  const handleAddToCart = (): void => {
    // TODO: add the product and the selected quantity to the cart
  };
  const [image, setImage] = useState(thumbnail);
  return (
    <Container>
      <Row>
        <Col md={6} className={'d-flex flex-wrap'}>
          <Image src={image} fluid />

          {images.map((url, index) => (
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
            <SettingsButton />
            <Button variant="primary" onClick={handleAddToCart}>
              Добавить в корзину
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default Product;
