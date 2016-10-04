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
    console.log(e.target);
    this.setState({selectedColor: e.target.value});
  };

  render() {
    return (
      <div className={styles.container}>
        <Helmet title={this.props.product.name}/>
        <div className={styles['filter-panel']}></div>
        <div className={styles['product']}>
          <PhotoControl colors={this.props.product.colors} productCode={this.props.product.code} selectedColor={this.state.selectedColor} />
          <div className={styles.info}>
            <div className={styles.name}>{this.props.product.name}</div>
            <div className={styles.code}>{this.props.product.code}</div>
            <div className={styles.price}>{this.props.product.price + ' грн'}</div>
            <div className={styles.price}>{this.salesPrice() + ' грн'}</div>
            <div className={styles.description}>{this.props.product.description}</div>
            <ColorButtonsControl colors={this.props.product.colors} onColorChanged={this.onColorChanged} />
          </div>
        </div>
      </div>
    );
  }
}

function PhotoControl(props) {
  let filesContainer = [];
  for(let key in props.colors[props.selectedColor].files) {
    filesContainer.push(<div key={"color_photo_" + key} className={styles.picture}><img src={`/uploads/products/art_${props.productCode}/${props.colors[props.selectedColor].files[key].filename}`}/></div>);
  }
  return (
    <div className={styles.photos}>{filesContainer}</div>
  );
}

function ColorButtonsControl(props) {
  let colorsContainer = [];
  Object.keys(props.colors).forEach((key) => {
    colorsContainer.push(<div key={key}>
      <button onClick={props.onColorChanged} value={key}>{props.colors[key].name}</button>
    </div>);
  });
  return (
    <div className={styles.description}>
      { colorsContainer }
    </div>
  );
}

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    product: getProduct(state, props.params.cuid)
  };
}

export default connect(mapStateToProps)(ProductDetailPage);
