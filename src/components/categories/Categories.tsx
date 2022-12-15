import React, { FC, useEffect, useState } from 'react';
import styles from './Categores.module.scss';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

const Categories: FC = () => {
  const { categories, error, loading, currentCategory } = useTypedSelector(
    state => state.category,
  );
  const { fetchCategories, setCurrentCategory } = useActions();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return <h3>Идет загрузка...</h3>;
  }
  if (error != null) {
    return <h3>{error}</h3>;
  }

  const listClasses = (category: string | null): string =>
    category === currentCategory ? styles.liActive : '';
  const wrapperClasses = (): string => {
    return isOpen ? styles.open : '';
  };

  const handleCategoryClick = (category: string | null): void => {
    setIsOpen(false);
    setCurrentCategory(category);
  };

  return (
    <div>
      <div className={[styles.categories, wrapperClasses()].join(' ')}>
        <ul className={styles.ul}>
          <li
            className={[styles.li, listClasses(null)].join(' ')}
            onClick={() => handleCategoryClick(null)}
          >
            all categories
          </li>
          {categories?.map((category, id) => (
            <li
              className={[styles.li, listClasses(category)].join(' ')}
              key={id}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
      {!isOpen && (
        <span
          className={styles.showMore}
          onClick={() => setIsOpen(prevState => !prevState)}
        >
          Show more categories...
        </span>
      )}
    </div>
  );
};

export default Categories;
