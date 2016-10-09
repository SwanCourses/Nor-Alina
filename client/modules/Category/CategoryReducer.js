/**
 * Created by alina on 05.10.16.
 */
import { ADD_CATEGORIES, ADD_CATEGORY } from './CategoryActions';

// Initial State
const initialState = { data: [] };

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_CATEGORIES:
      return {
        data: action.categories,
      };
    case ADD_CATEGORY:
      return {
        ...state,
        data: [action.category, ...state.data],
      };

    default:
      return state;
  }
};

export const contains = (array1, array2) => {
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      if (array1[i] === array2[j]) {
        return true;
      }
    }
  }
};

/* Selectors */

// Get categories
export const getAllCategories = state =>  {
  return state.categories.data;
};

// Get all categories
export const getCategories = (state, groupsFilter=[]) => {
  let productCategories = [];
  if(groupsFilter.length > 0){
    productCategories = state.products.data.filter(prod => contains(groupsFilter, prod.groups)).map(product => product.category);
  }
  else {
    productCategories = state.products.data.map(product => product.category);
  }
    return state.categories.data.filter(category => productCategories.indexOf(category.cuid) !== -1);
};

// Get category by cuid
export const getCategory = (state, cuid) => state.categories.data.filter(category => category.cuid === cuid)[0];

// Export Reducer
export default CategoryReducer;
