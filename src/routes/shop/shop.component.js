import { useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { getCategoriesAndDocuments } from '../../utils/firebase.utils';
import { fetchCategoriesAsync, setCategoriesMap } from '../../store/category/category.action';

import './shop.styles.scss'
import { useDispatch } from 'react-redux';


const Shop = () => {    
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, []) 


  return(
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  )
}

export default Shop;