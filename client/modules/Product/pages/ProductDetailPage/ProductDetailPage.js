/**
 * Created by alina on 01.10.16.
 */
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import styles from './ProductDetailPage.css';

// Import Selectors
import { getProduct } from '../../ProductReducer';

export class ProductDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedColor: Object.keys(this.props.product.colors)[0] }
  }

  salesPrice = ()=>{
    return this.props.product.price * 0.95
  };

  onColorChanged = (e) => {
    this.setState({selectedColor: e.target.value});
  };

  render() {
    let filesContainer = [];
    let colorsContainer = [];
    for(let key in this.props.product.colors[this.state.selectedColor].files) {
      filesContainer.push(<div key={"color_photo_" + key} className={styles.picture}><img src={`/uploads/products/art_${this.props.product.code}/${this.props.product.colors[this.state.selectedColor].files[key].filename}`}/></div>);
    }
    Object.keys(this.props.product.colors).forEach((key) => {
      colorsContainer.push(<div key={key}>
        <button onClick={this.onColorChanged} value={key}>{this.props.product.colors[key].name}</button>
      </div>);
    });
    return (
      <div className={styles.container}>
        <Helmet title={this.props.product.name}/>
        <div className={styles['filter-panel']}></div>
        <div className={styles['product']}>
          <div className={styles.photos}>{filesContainer}</div>
          <div className={styles.info}>
            <div className={styles.name}>{this.props.product.name}</div>
            <div className={styles.code}>{this.props.product.code}</div>
            <div className={styles.price}>{this.props.product.price + ' грн'}</div>
            <div className={styles.price}>{this.salesPrice() + ' грн'}</div>
            <div className={styles.description}>{this.props.product.description}</div>
            <div className={styles.description}>
              { colorsContainer }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    product: getProduct(state, props.params.cuid)
  };
}

export default connect(mapStateToProps)(ProductDetailPage);
