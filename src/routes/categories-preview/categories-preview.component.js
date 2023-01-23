import { Fragment } from 'react';

import CategoryPreview from '../../components/category-preview/category-preview.component';
import { categoryReducer } from '../../store/category/category.reducer';
import { selectCategoriesMap } from '../../store/category/category.selector';
import { useSelector } from 'react-redux';

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview 
            key={title} 
            title={title} 
            products={products} />
        );
      })}
    </Fragment>
  );
};

export default CategoriesPreview;