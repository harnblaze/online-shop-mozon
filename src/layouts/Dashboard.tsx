import React, { FC, useState } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { getProducts, removeProduct } from '../store/actionCreators/products';
import { Button, Container, Image, Table } from 'react-bootstrap';
import ProductForm from '../components/ui/ProductForm';
import { getCategories } from '../store/actionCreators/category';
import { IProduct } from '../types/products';

const Dashboard: FC = () => {
  const dispatch = useAppDispatch();
  const products = useTypedSelector(getProducts());
  const categories = useTypedSelector(getCategories());

  const [showProductForm, setShowProductForm] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<
    IProduct | undefined
  >(undefined);

  const handleEdit = (productId: string): void => {
    const product = products.find(el => el._id === productId);
    setSelectedProductId(product);
    setShowProductForm(true);
  };

  const handleDelete = (productId: string): void => {
    void dispatch(removeProduct(productId));
  };

  const handleCloseProductForm = (): void => {
    setShowProductForm(false);
    setSelectedProductId(undefined);
  };

  return (
    <Container className={'d-block text-center'}>
      <Button
        className={'mb-3'}
        onClick={() => {
          setSelectedProductId(undefined);
          setShowProductForm(true);
        }}
      >
        Добавить новый продукт
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Фото</th>
            <th>Название</th>
            <th>Описание</th>
            <th>Категория</th>
            <th>Бренд</th>
            <th>Цена</th>
            <th>Скидка</th>
            <th>Рейтинг</th>
            <th>Кол-во</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>
                <Image
                  src={product.thumbnail}
                  className="mt-3 mr-3 flex-shrink-0"
                />
              </td>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>
                {categories.find(el => el._id === product.category)?.name}
              </td>
              <td>{product.brand}</td>
              <td>{product.price}</td>
              <td>{product.discountPercentage}</td>
              <td>{product.rating}</td>
              <td>{product.stock}</td>
              <td className={'d-block'}>
                <Button
                  variant="warning"
                  onClick={() => handleEdit(product._id)}
                >
                  Edit
                </Button>{' '}
                <Button
                  variant="danger"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ProductForm
        product={selectedProductId}
        onClose={handleCloseProductForm}
        show={showProductForm}
      />
    </Container>
  );
};

export default Dashboard;
