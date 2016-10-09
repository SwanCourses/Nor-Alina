/**
 * Created by alina on 25.09.16.
 */
import {ADD_PRODUCT, ADD_PRODUCTS, SET_SEARCH_QUERY, FILTER_BY_GROUP, FILTER_BY_CATEGORY} from './ProductActions';

const initialState = { data: [], searchQuery: '', groupsFilter: [] };

const ProductReducer = ( state = initialState, action) => {
  switch (action.type) {

    case ADD_PRODUCT:
      return {
        ...state,
        data: [action.product, ...state.data]
      };

    case ADD_PRODUCTS:
            return {
              ...state,
              data: action.products,
            };

    case SET_SEARCH_QUERY:
            return {
              ...state,
              searchQuery: action.searchQuery
          };
    case FILTER_BY_GROUP:
            return {
              ...state,
              groupsFilter: action.groupsFilter,
              category: ''
            };
    case FILTER_BY_CATEGORY:
            return{
              ...state,
              category: action.category
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

export const getProducts = (state, name = '', groupsFilter = [], category = '') => {
  console.log("category");
  name = name.trim();
  let obj = state.products.data;
  if(name !== ''){
    obj = obj.filter(product =>  (`${product.name} ${product.price}`.indexOf(name) > -1));
  }
  if(groupsFilter.length > 0){
    obj = obj.filter(product => contains(groupsFilter, product.groups));
  }
  if(category !== ''){
    console.log("category1");
    obj = obj.filter(product => product.category === category);
  }
      return obj;
  };

// Get product by cuid
export const getProduct = (state, cuid) => state.products.data.filter(product => product.cuid === cuid)[0];

export default ProductReducer;
