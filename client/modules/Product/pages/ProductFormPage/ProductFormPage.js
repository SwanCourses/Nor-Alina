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
    this.state = { colors: {'color_1': 'red', 'color_2': '#ffffff'}};
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onAddColor = () => {
    let obj = this.state.colors;
    let keyIndex = Object.keys(obj).length;
    while("color_" + keyIndex in obj) {
      keyIndex++;
    }
    obj["color_" + keyIndex] = "";
    this.setState({colors: obj});
  };

  onColorChange = (e) => {
    var obj = this.state.colors;
    obj[e.target.name] = e.target.value;
    this.setState({ colors: obj });
  };

  onRemoveColor = (e) =>
  {
    var obj = this.state.colors;
    delete obj[e.target.value];
    this.setState({colors: obj});
  };

  addProduct = () => {
    let form = new FormData();
    form.append('product[name]', this.state.name);
    form.append('product[code]', this.state.code);
    form.append('product[price]', this.state.price);
    form.append('product[description]', this.state.description);
    form.append('product[size]', this.state.size);
    form.append('product[colors]', JSON.stringify(this.state.colors));

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
                className={styles.size}
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
  let colorContainer =[];
  Object.keys(props.colors).forEach(function(key) {
    colorContainer.push(<div key={key + "_product_color_item"}>
        <input type="text" onChange={props.onColorChange} name={key} value={props.colors[key]} />
        <button onClick={props.onRemoveColor} value={key}>Remove</button>
      </div>);
  });
  return (
    <div className={styles.colors}>
      <p>Product Colors:</p>
      { colorContainer }
      <button onClick={props.onAddColor}>Add color</button>
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
