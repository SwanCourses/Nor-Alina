/**
 * Created by alina on 25.09.16.
 */
import {ADD_PRODUCT} from './ProductActions';

const initialState = { data: [] };

const ProductReducer = ( state = initialState, action) => {
  switch (action.type) {

    case ADD_PRODUCT:
      return {
        ...state,
        data: [action.product, ...state.data]
      };

    default:
      return state;
  }
};

export const getProducts = state => state.products.data;

export const getProduct = (state, cuid) => state.products.data.filter(product => product.cuid === cuid)[0];

export default ProductReducer;
