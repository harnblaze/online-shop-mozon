import React, { FC } from 'react';
import { IProduct } from '../../../types/products';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { FaRegStar, FaStar } from 'react-icons/fa';

interface IProductProps {
  product: IProduct;
}

const ProductItem: FC<IProductProps> = ({ product }) => {
  const { _id, thumbnail, title, price, description, rating } = product;

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
          <Row>
            <Col>
              <Button variant="primary">Add to Cart</Button>
            </Col>
            <Col xs="auto">
              <div className="mt-2">
                {stars}
                {` ${rating}`}
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductItem;
