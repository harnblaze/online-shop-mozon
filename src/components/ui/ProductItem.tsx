import React, { FC, memo } from 'react';
import { IProduct } from '../../types/products';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addItem } from '../../store/actionCreators/cart';

interface IProductProps {
  product: IProduct;
}

const ProductItem: FC<IProductProps> = ({ product }) => {
  const { _id, thumbnail, title, price, description, rating } = product;
  const dispatch = useAppDispatch();

  const addToCart = (): void => {
    dispatch(addItem({ _id, title, price, quantity: 1 }));
  };

  const stars = Array.from({ length: 5 }, (_, i) => {
    const isFilled = i < rating;
    return isFilled ? (
      <FaStar key={i} className="text-warning mb-1" />
    ) : (
      <FaRegStar key={i} className="text-warning mb-1" />
    );
  });

  return (
    <Col sm={6} md={4} lg={4} xl={3} className={'mb-5 d-flex'}>
      <Card className="shadow flex-grow-1">
        <Link to={`/product/${_id}`}>
          <Card.Img
            variant="top"
            src={thumbnail}
            loading="lazy"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              height: '10rem',
            }}
          />
        </Link>
        <Card.Body className={'d-flex flex-column justify-content-around'}>
          <Row className="mb-2">
            <Col>
              <Link to={`/product/${_id}`}>
                <Card.Title className="text-decoration-none">
                  {title}
                </Card.Title>
              </Link>
            </Col>
            <Col xs="auto">
              <Card.Text className="font-weight-bold">
                ${price.toFixed(2)}
              </Card.Text>
            </Col>
          </Row>
          <Card.Text style={{ textOverflow: 'ellipsis' }}>
            {description}
          </Card.Text>
          <Row className={'text-center'}>
            <Col xs={100}>
              <Button
                variant="primary"
                onClick={addToCart}
                className={'justify-content-center'}
              >
                Добавить в корзину
              </Button>
            </Col>
            <Col>
              <div className="mt-2">
                {stars}
                {` ${rating.toFixed(2)}`}
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default memo(ProductItem);
