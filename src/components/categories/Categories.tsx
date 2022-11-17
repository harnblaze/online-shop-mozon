import React, { FC, useState } from 'react';
import styles from './Categores.module.scss';

const Categories: FC = () => {
  const categories = [
    'Автотовары',
    'Электроника',
    'Бытовая техника',
    'Одежда',
    'Детские товары',
    'Дом и сад',
    'Спорт и отдых',
    'Строительство и ремонт',
  ];
  const [activeItem, setActiveItem] = useState(0);

  const listClasses = (id: number): string =>
    id === activeItem ? styles.liActive : '';
  return (
    <div className={styles.categories}>
      <ul className={styles.ul}>
        {categories.map((category, id) => (
          <li
            className={[styles.li, listClasses(id)].join(' ')}
            key={id}
            onClick={() => setActiveItem(id)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
