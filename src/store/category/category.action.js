import { CATEGORY_ACTION_TYPES } from './category.types';
import { createAction } from '../../utils/reducer.utils';

export const setCategoriesMap = (categoriesArray) =>
  createAction(CATEGORY_ACTION_TYPES.SET_CATEGORIES, categoriesArray);