/**
 * Created by alina on 13.10.16.
 */
import React from 'react';
import { FormattedMessage } from 'react-intl';

import styles from './CartAmount.css';

function CartAmount(props) {
  return (
    <div className={styles["cart-amount"]}>
      <div className={styles[ "cart-amount-button"]} onClick={props.onAmountMinusClick} >-</div>
      <div className={styles["cart-amount-input"]}>
        <input value={props.amount} type="number" min="1" onChange={props.onAmountNumberChange} />
      </div>
      <div className={styles["cart-amount-button"]} onClick={props.onAmountPlusClick}>+</div>
    </div>
  )
}

export default CartAmount;
