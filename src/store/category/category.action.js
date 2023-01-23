import { CATEGORY_ACTION_TYPES } from './category.types';
import { createAction } from '../../utils/reducer.utils';
import { getCategoriesAndDocuments } from '../../utils/firebase.utils';

export const setCategoriesMap = (categoriesArray) =>
  createAction(CATEGORY_ACTION_TYPES.SET_CATEGORIES, categoriesArray);

export const fetchCategoriesStart = () =>  createAction(
  CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START,

)
export const fetchCategoriesSuccess = (categoriesArray) =>  createAction(
  CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
  categoriesArray
)
export const fetchCategoriesFailed = (error) =>  createAction(
  CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
  error
)

export const fetchCategoriesAsync = () => async (dispatch) => {
  dispatch(fetchCategoriesStart());

  try {
    const categoriesArray = await getCategoriesAndDocuments('categories')
    dispatch(fetchCategoriesSuccess(categoriesArray))
  } catch (error) {
    dispatch(fetchCategoriesFailed(error))
  }
  }