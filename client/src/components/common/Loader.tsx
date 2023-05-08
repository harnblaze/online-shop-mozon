import React, { type FC } from 'react';
import { Badge, Container, Spinner } from 'react-bootstrap';

const Loader: FC = () => {
  return (
    <Container className="justify-content-center mt-3">
      <h2>
        <Badge>
          Loading...
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Badge>
      </h2>
    </Container>
  );
};

export default Loader;
