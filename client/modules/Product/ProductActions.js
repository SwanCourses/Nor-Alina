/**
 * Created by alina on 25.09.16.
 */
import callApi, {callApiForm} from '../../util/apiCaller';

import { browserHistory } from 'react-router';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_PRODUCTS = 'ADD_PRODUCTS';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const FILTER_BY_GROUP = 'FILTER_BY_GROUP';
export const FILTER_BY_CATEGORY = 'FILTER_BY_CATEGORY';
export const REPLACE_PRODUCT = 'REPLACE_PRODUCT';

export function addProduct(product) {
  return {
    type: ADD_PRODUCT,
    product,
  };
}

export function addProducts(products) {
  return {
    type: ADD_PRODUCTS,
    products,
  };
}

export function replaceProduct(product) {
    return {
        type: REPLACE_PRODUCT,
        product,
      };
  }

export function setSearchQuery(searchQuery) {
  return {
    type: SET_SEARCH_QUERY,
    searchQuery,
  };
}

export function filterByGroup(groupsFilter) {
  return {
    type: FILTER_BY_GROUP,
    groupsFilter,
  };
}

export function filterByCategory(category) {
  return {
    type: FILTER_BY_CATEGORY,
    category,
  };
}

export function addProductRequest(form) {
  return (dispatch) => {
    return callApiForm('products', 'post', form).then(res => {
      dispatch(addProduct(res.product));
      browserHistory.push('/products/' + res.product.cuid)
    });
  }
}

export function updateProductRequest(cuid, form) {
    return (dispatch) => {
        return callApiForm('products/' + cuid, 'put', form).then(res => {
            dispatch(replaceProduct(res.product));
            browserHistory.push('/products/'+res.product.cuid)
          });
      };
  }

export function fetchProducts() {
  return (dispatch) => {
    return callApi('products').then(res => {
      dispatch(addProducts(res.products));
    });
  };
}
