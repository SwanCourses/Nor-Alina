/**
 * Created by alina on 25.09.16.
 */
import React, { Component } from 'react';

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { addProductRequest } from '../../ProductActions';

import styles from './ProductFormPage.css';

const sizes = ['XS','S','M','L','XL'];

class ProductFormPage extends Component {

  constructor(props){
    super(props);
    this.state = { colors: ['red', '#ffffff']};
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onAddColor = () => {
    var arr = this.state.colors;
    arr.push("");
    this.setState({colors: arr});
  };

  onColorChange = (e) => {
    let arr = this.state.colors;
    arr[e.target.name.charAt(0)] = e.target.value;
    this.setState({colors: arr});
  };

  onRemoveColor = (e) =>
  {
    var arr = this.state.colors;
    arr.splice(e.target.name.charAt(0), 1);
    this.setState({colors: arr});
  };

  addProduct = () => {
    let form = new FormData();
    form.append('product[name]', this.state.name);
    form.append('product[code]', this.state.code);
    form.append('product[price]', this.state.price);
    form.append('product[description]', this.state.description);
    form.append('product[size]', this.state.size);

    for(let i = 0; i < this.state.colors.length; i++) {
      form.append('product[colors]', this.state.colors[i]);
    }

    for(let i = 0; i < this.refs.photos.files.length; i++) {
      form.append('product[photos]', this.refs.photos.files[i], this.refs.photos.files[i].name)
    }

    this.props.dispatch(addProductRequest(form))
  };

  render(){

    return(
      <div className={styles.form}>
            <div className={styles['form-content']}>
               <h2 className={styles['form-title']}>
                 <FormattedMessage id="createNewProduct"/>
               </h2>
               <input
                 placeholder={this.props.intl.messages.productName}
                 value={this.state.name}
                 onChange={this.onChange}
                 className={styles['form-field']}
                 name="name"/>
               <input
                 placeholder={this.props.intl.messages.productCode}
                 value={this.state.code}
                 onChange={this.onChange}
                 className={styles['form-field']}
                 name="code"/>
               <input
                 placeholder={this.props.intl.messages.productPrice}
                 value={this.state.price}
                 onChange={this.onChange}
                 className={styles['form-field']}
                 name="price"
                 type="number"/>
            <textarea
                placeholder={this.props.intl.messages.productDescription}
                value={this.state.description}
                onChange={this.onChange}
                className={styles['form-field']}
                name="description"/>
              <select
                name="size"
                value={this.state.size}
                onChange={this.onChange}>
                <option disabled>{this.props.intl.messages.productSize}</option>
                {
                  sizes.map(function(size) {
                    return <option key={"product_size_" + size} value={size}>{size}</option>;
                  })
                }
              </select>
              <ProductColorControl colors={this.state.colors} onColorChange={this.onColorChange} onRemoveColor={this.onRemoveColor} onAddColor={this.onAddColor} />
            <div className={styles.photos}>
                  <input
                    ref="photos"
                    type="file"
                    onChange={this.onChange}
                    multiple/>
            </div>
            <a className={styles['post-submit-button']} href="#" onClick={this.addProduct}><FormattedMessage id="submit"/></a>
          </div>
        </div>
    )
  }
}

function ProductColorControl(props) {
  return (
    <div>
      {props.colors.map((item, i) => {
        return (
          <div key={i + "_product_color_item"}>
              <input type="text" onChange={props.onColorChange} name={i + "_product_color"} value={item} />
              <input type="button" onClick={props.onRemoveColor} name={i + "_remove_pcolor"} value="remove" />
          </div>);
      })}
      <input type="button" className={styles['product-color-add-button']} onClick={props.onAddColor} value="add" />
    </div>
  );
}

ProductFormPage.propTypes = {
    intl: intlShape.isRequired,
};

function mapStateToProps(state, props) {
  return {};
}

export default connect(mapStateToProps)(injectIntl(ProductFormPage));
