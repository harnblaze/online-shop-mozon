import React, { FC, useState } from 'react';
import styles from './Categores.module.scss';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import {
  getCategories,
  getCurrentCategory,
  setCurrentCategory,
} from '../../../store/actionCreators/category';

const Categories: FC = () => {
  const categories = useTypedSelector(getCategories());
  const currentCategory = useTypedSelector(getCurrentCategory());

  const [isOpen, setIsOpen] = useState(false);

  const listClasses = (category: string | undefined): string =>
    category === currentCategory ? styles.liActive : '';
  const wrapperClasses = (): string => {
    return isOpen ? styles.open : '';
  };

  const handleCategoryClick = (category: string | undefined): void => {
    setIsOpen(false);
    setCurrentCategory(category);
  };

  return (
    <div>
      <div className={[styles.categories, wrapperClasses()].join(' ')}>
        <ul className={styles.ul}>
          <li
            className={[styles.li, listClasses(undefined)].join(' ')}
            onClick={() => handleCategoryClick(undefined)}
          >
            all categories
          </li>
          {categories?.map((category, id) => (
            <li
              className={[styles.li, listClasses(category._id)].join(' ')}
              key={id}
              onClick={() => handleCategoryClick(category._id)}
            >
              {category.name}
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
