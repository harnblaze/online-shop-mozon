import React, { FC, useState } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { getProducts, removeProduct } from '../store/actionCreators/products';
import { Button, Container, Image, Table } from 'react-bootstrap';
import ProductForm from '../components/ui/ProductForm';
import { getCategories } from '../store/actionCreators/category';
import { IProduct } from '../types/products';
import { toast } from 'react-toastify';
import MockDataButton from '../components/ui/MockDataButton';
import NoProducts from '../components/common/NoProducts';

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

  const handleDelete = async (productId: string): Promise<void> => {
    await dispatch(removeProduct(productId));
    toast.success('Товар был успешно удален');
  };

  const handleCloseProductForm = (): void => {
    setShowProductForm(false);
    setSelectedProductId(undefined);
  };
  if (products === null || products?.length === 0)
    return (
      <>
        <NoProducts />
        <MockDataButton />
      </>
    );

  return (
    <Container className={'flex-column align-items-center'}>
      <div
        className={'d-flex align-items-center justify-content-center flex-wrap'}
      >
        <Button
          className={'mb-3 mx-5'}
          style={{ maxWidth: '250px' }}
          onClick={() => {
            setSelectedProductId(undefined);
            setShowProductForm(true);
          }}
        >
          Добавить новый продукт
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className={'d-none d-sm-table-cell'}>Фото</th>
            <th>Название</th>
            <th className={'d-none d-xl-table-cell'}>Описание</th>
            <th className={'d-none d-sm-table-cell'}>Категория</th>
            <th className={'d-none d-md-table-cell'}>Бренд</th>
            <th>Цена</th>
            <th>Скидка</th>
            <th className={'d-none d-md-table-cell'}>Рейтинг</th>
            <th className={'d-none d-lg-table-cell'}>Кол-во</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td className={'d-none d-sm-table-cell'}>
                <Image
                  src={product.thumbnail}
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'center',
                    height: '5rem',
                  }}
                />
              </td>
              <td>{product.title}</td>
              <td className={'d-none d-xl-table-cell'}>
                {product.description}
              </td>
              <td className={'d-none d-sm-table-cell'}>
                {categories.find(el => el._id === product.category)?.name}
              </td>
              <td className={'d-none d-md-table-cell'}>{product.brand}</td>
              <td>{product.price}</td>
              <td>{product.discountPercentage}</td>
              <td className={'d-none d-md-table-cell'}>{product.rating}</td>
              <td className={'d-none d-lg-table-cell'}>{product.stock}</td>
              <td className={''}>
                <Button
                  variant="warning"
                  onClick={() => handleEdit(product._id)}
                  className={'mb-2'}
                >
                  Изменить
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    void handleDelete(product._id);
                  }}
                >
                  Удалить
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
