/**
 * Created by alina on 13.10.16.
 */
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { getCart, getOrdersAmount } from '../../CartReducer';
import { getCategory } from '../../../Category/CategoryReducer';
import { removeFromCart, changeCartAmount } from '../../CartActions';
import { getProduct } from '../../../Product/ProductReducer'
import CartAmount from '../../../../components/CartAmount/CartAmount';
import styles from './CartWidget.css';

class CartWidget extends Component {

  removeProductFromCart = (cuid)=> {
    this.props.dispatch(removeFromCart(cuid));
  }

  onAmountMinus = (cartId, amount)=> {
    if(amount > 1) {
      this.props.dispatch(changeCartAmount(cartId, +amount - 1));
    }
  }

  onAmountPlus = (cartId, amount)=> {
    this.props.dispatch(changeCartAmount(cartId, +amount +1));
  }

  onAmountChange = (cartId, e)=> {
    this.props.dispatch(changeCartAmount(cartId, e.target.value));
  }

  render() {
    return (
      <div className={styles["cart-body"]}>
        {
          this.props.products.map(product => (
            <div key={product.cartId}>
              <div>{`${product.code} ${product.selectedColor} ${product.selectedSize} : ${this.props.cart[product.cartId].count} x ${product.price} = ${this.props.cart[product.cartId].count * product.price}`}
                <CartAmount amount={this.props.cart[product.cartId].count} onAmountMinusClick={this.onAmountMinus.bind(null, product.cartId, this.props.cart[product.cartId].count)} onAmountNumberChange={this.onAmountChange.bind(null, product.cartId)} onAmountPlusClick={this.onAmountPlus.bind(null, product.cartId, this.props.cart[product.cartId].count)} />
                <span
                  onClick={this.removeProductFromCart.bind(null, product.cartId)}>Remove</span></div>
            </div>
          ))
        }
        <div>Сумма заказа: {this.props.ordersAmount}</div>
      </div>
    )
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  let cart = getCart(state);
  let ordersAmount = getOrdersAmount(state);
  let products = Object.keys(cart).map(productId => {
    let productOptions = productId.split(";");
    let product = getProduct(state, productOptions[0]);
    return {code: product.code, price: product.price, cartId: productId, selectedColor: productOptions[1], selectedSize: productOptions[2]};
  });
  return {
    cart,
    products,
    ordersAmount
  };
}

export default connect(mapStateToProps)(CartWidget);
