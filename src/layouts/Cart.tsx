import React, { FC } from 'react';

import { Button, Container, Table } from 'react-bootstrap';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useTypedSelector } from '../hooks/useTypedSelector';
import {
  addItem,
  clearCart,
  getCartItems,
  removeItem,
  selectCartTotal,
} from '../store/actionCreators/cart';
import { ICartItem } from '../store/reducers/cartReducer';
import { toast } from 'react-toastify';

const Cart: FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useTypedSelector(getCartItems());
  const cartTotal = useTypedSelector(selectCartTotal());

  const handleRemoveItem = (id: string): void => {
    dispatch(removeItem(id));
  };

  const handleAddItem = (item: ICartItem): void => {
    dispatch(addItem(item));
  };

  const handleClearCart = (): void => {
    dispatch(clearCart());
  };

  const handleCheckout = (): void => {
    toast.success(`Ваш заказ на сумму ${cartTotal}$ был успешно оформлен`);
    dispatch(clearCart());
  };

  const cartRows = cartItems.map(item => (
    <tr key={item._id}>
      <td>{item.title}</td>
      <td>{item.price}$</td>
      <td>{item.quantity}</td>
      <td>
        <Button variant="danger" onClick={() => handleRemoveItem(item._id)}>
          Убрать
        </Button>{' '}
        <Button variant="success" onClick={() => handleAddItem(item)}>
          Добавить
        </Button>
      </td>
    </tr>
  ));

  return (
    <Container className={'d-block text-center'}>
      <h2 className={'mb-4'}>Корзина</h2>
      {cartItems.length > 0 ? (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Название</th>
                <th>Цена</th>
                <th>Количество</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>{cartRows}</tbody>
          </Table>
          <p>Итого: {cartTotal}$</p>
          <Button
            variant="danger"
            onClick={handleClearCart}
            className={'flex-shrink-0'}
          >
            Очистить корзину
          </Button>{' '}
          <Button variant="primary" onClick={handleCheckout}>
            Оформить заказ
          </Button>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </Container>
  );
};

export default Cart;
