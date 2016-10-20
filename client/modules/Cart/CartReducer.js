/**
 * Created by alina on 13.10.16.
 */
import { ADD_TO_CART, REPLACE_CART, CACHE_KEY, REMOVE_FROM_CART, CHANGE_CART_AMOUNT } from './CartActions';
import { getProduct } from '../Product/ProductReducer';

// Initial State
const initialState = {};

const CartReducer = (state = initialState, action) => {
  let newCart;
  switch (action.type) {

    case ADD_TO_CART:
      newCart = state;
      let productId = action.productCuid + ";" + action.color + ";" + action.size;
      if (state[productId]) {
        let product = state[productId];
        newCart = {
          ...state,
          [productId]: { ...product,  count: +product.count + +action.amount }
        };
      } else {
        newCart = {
          ...state,
          [productId]: { count: action.amount }
        }
      }

      localStorage.setItem(CACHE_KEY, JSON.stringify(newCart));
      return newCart;

    case CHANGE_CART_AMOUNT:
      newCart = state;
      if (state[action.productId]) {
        let product = state[action.productId];
        newCart = {
          ...state,
          [action.productId]: {...product, count: action.amount}
        };
      }

      localStorage.setItem(CACHE_KEY, JSON.stringify(newCart));
      return newCart;

    case REMOVE_FROM_CART:
      newCart = state;
      if (state[action.productId]) {
        delete state[action.productId];
      }
      newCart = {...state};
      localStorage.setItem(CACHE_KEY, JSON.stringify(newCart));
      return newCart;

    case REPLACE_CART:
      return action.cart || state;

    default:
      return state;
  }
};

/* Selectors */

// Get all products
export const getCart = state => state.cart;

export const getProductsCount = (state) => {
  return Object.keys(state.cart).reduce((sum, key) => {
    return sum + parseFloat(state.cart[key].count);
  }, 0);
};

export const getOrdersAmount = (state) => {
  return Object.keys(state.cart).reduce((sum, key) => {
    let product = getProduct(state, key.split(";")[0]);
    if (!product) return sum;
    return sum + parseFloat(state.cart[key].count) * product.price;
  }, 0);
};

// Export Reducer
export default CartReducer;
