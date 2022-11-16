import React, { FC, useState } from 'react';
import styles from './Header.module.scss';

const Header: FC = () => {
  const [isAuth] = useState(false);
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
        {isAuth ? (
          <button className={styles.button}>Зарегистрироваться</button>
        ) : (
          <button className={styles.button}>Войти</button>
        )}
      </div>
    </header>
  );
};

export default Header;
