import React, { FC, useState } from 'react';

import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineShoppingCart } from 'react-icons/ai';

import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

const Header: FC = () => {
  const [isAuth] = useState(false);
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
            <Nav.Link as={'div'}>
              <Link to="/cart">
                <AiOutlineShoppingCart size={30} />
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
                <NavDropdown.Item>
                  <Link to="/profile" className={'text-decoration-auto'}>
                    Profile
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
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
