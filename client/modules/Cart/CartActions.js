/**
 * Created by alina on 13.10.16.
 */
export const ADD_TO_CART = 'ADD_TO_CART';
export const REPLACE_CART = 'REPLACE_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CHANGE_CART_AMOUNT = 'CHANGE_CART_AMOUNT';


export const CACHE_KEY = 'CART';

export function addToCart(productCuid, color, size, amount) {
  return {
    type: ADD_TO_CART,
    productCuid,
    color,
    size,
    amount
  };
}
export function changeCartAmount(productId, amount) {
  return {
    type: CHANGE_CART_AMOUNT,
    productId,
    amount
  };
}
export function removeFromCart(productId) {
  return {
    type: REMOVE_FROM_CART,
    productId,
  };
}

export function restoreCartFromCache() {
  let cartRaw = localStorage.getItem(CACHE_KEY);
  let cart;
  if (cartRaw !== null) {
    cart = JSON.parse(cartRaw);
  }
  return {
    type: REPLACE_CART,
    cart
  };
}
