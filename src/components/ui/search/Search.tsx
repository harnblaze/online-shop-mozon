import React, { FC, useState } from 'react';
import styles from './Search.module.scss';
import { MdClose } from 'react-icons/md';

const Search: FC = () => {
  const [value, setValue] = useState('');

  return (
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
        value={value}
        onChange={e => {
          setValue(e.target.value);
        }}
      />
      {value !== '' && (
        <MdClose onClick={() => setValue('')} className={styles.clearIcon} />
      )}
      <button className={styles.buttonSearch}>Найти</button>
    </div>
  );
};

export default Search;
