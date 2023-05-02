import React, { FC } from 'react';

import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineShoppingCart } from 'react-icons/ai';

import { Link } from 'react-router-dom';
import { Badge, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import {
  getCurrentUserEmail,
  getIsLoggedIn,
} from '../../store/actionCreators/auth';
import { selectCartItemsCount } from '../../store/actionCreators/cart';

const Header: FC = () => {
  const isAuth = useTypedSelector(getIsLoggedIn());
  const email = useTypedSelector(getCurrentUserEmail());
  const cartItemCount = useTypedSelector(selectCartItemsCount());
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={'div'}>
          <Link
            to="/"
            className={'text-decoration-none'}
            style={{ color: 'rgb(13,110,253)' }}
          >
            MOZON
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className={'flex-grow-0'}>
          <Nav className="ml-auto">
            <Nav.Link as={'div'} className={'position-relative'}>
              <Link to="/cart">
                <AiOutlineShoppingCart
                  size={30}
                  className={'position-relative'}
                />
                {cartItemCount > 0 && (
                  <Badge
                    bg="primary"
                    className={'position-absolute top-50 start-50'}
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Link>
            </Nav.Link>
            {isAuth ? (
              <NavDropdown
                title={
                  <FaUserCircle
                    size={30}
                    style={{ color: 'rgb(13,110,253)' }}
                  />
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item as={'div'}>{email}</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={'div'}>
                  <Link to="/logout" className={'text-decoration-none'}>
                    Logout
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={'div'}>
                <Link
                  to="/auth/register"
                  className={'text-decoration-none'}
                  style={{ color: 'rgb(13,110,253)' }}
                >
                  Вход/Регистрация
                </Link>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
