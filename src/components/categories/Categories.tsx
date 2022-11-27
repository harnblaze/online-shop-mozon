import React, { FC, useEffect } from 'react';
import styles from './Categores.module.scss';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

const Categories: FC = () => {
  const { categories, error, loading, currentCategory } = useTypedSelector(
    state => state.category,
  );
  const { fetchCategories, setCurrentCategory } = useActions();
  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return <h3>Идет загрузка...</h3>;
  }
  if (error != null) {
    return <h3>{error}</h3>;
  }

  const listClasses = (id: number): string =>
    id === currentCategory ? styles.liActive : '';
  return (
    <div className={styles.categories}>
      <ul className={styles.ul}>
        {categories?.map((category, id) => (
          <li
            className={[styles.li, listClasses(id)].join(' ')}
            key={id}
            onClick={() => setCurrentCategory(id)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
