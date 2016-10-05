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
  let categories = [];
  for(let category of state.categories.data){
    categories.push({value: category.cuid, label: category.name});
  }
  return categories;
};

// Get all categories
export const getCategories = (state, groupsFilter=[]) => {
  let products = state.products.data.filter(prod => prod.category != null && (groupsFilter.length > 0 ? contains(groupsFilter, prod.groups) : true));
    return state.categories.data.filter(category => {
      for (let product of products) {
        console.log(product.name);
        if (product.category === category.cuid) {
          return true;
        }
      }
    })
};

// Get category by cuid
export const getCategory = (state, cuid) => state.categories.data.filter(category => category.cuid === cuid)[0];

// Export Reducer
export default CategoryReducer;
