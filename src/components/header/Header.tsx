import React, { FC, useState } from 'react';
import styles from './Header.module.scss';
import { FaUserCircle } from 'react-icons/fa';

const Header: FC = () => {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h2 className={styles.logo}>MOZON</h2>
        <div className={styles.wrapper}>
          <input
            className={styles.search}
            placeholder="Искать на Mozon"
            type="text"
            name="text"
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
          />
          <button className={styles.buttonSearch}>Найти</button>
        </div>
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
              <FaUserCircle className={styles.userLogo} />
              <button
                className={styles.button}
                onClick={() => setIsAuth(!isAuth)}
              >
                Выйти
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
