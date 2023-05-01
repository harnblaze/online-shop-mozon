import React, { FC, useState } from 'react';
import styles from './Header.module.scss';
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Header: FC = () => {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className="link">
          <h2 className={styles.logo}>MOZON</h2>
        </Link>
        <div className={styles.authorization}>
          {isAuth ? (
            <>
              <button
                className={styles.button}
                style={{ marginRight: '10px' }}
                onClick={() => setIsAuth(!isAuth)}
              >
                Зарегистрироваться
              </button>
              <button
                className={styles.button}
                onClick={() => setIsAuth(!isAuth)}
              >
                Войти
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <div className={styles.userLogo}>
                  <FaUserCircle className={styles.icon} />
                </div>
              </Link>

              <Link to="/cart">
                <div className={styles.cart}>
                  <AiOutlineShoppingCart className={styles.icon} />
                </div>
              </Link>

              <div className={styles.logout} onClick={() => setIsAuth(!isAuth)}>
                <MdLogout className={styles.icon} />
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
