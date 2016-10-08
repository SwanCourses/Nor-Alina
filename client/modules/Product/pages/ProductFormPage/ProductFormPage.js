/**
 * Created by alina on 25.09.16.
 */
import React, { Component } from 'react';
import Select from 'react-select';

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { getAllCategories } from '../../../Category/CategoryReducer';
import { addProductRequest } from '../../ProductActions';

import styles from './ProductFormPage.css';
//import 'react-select/dist/react-select.css';

const sizes = [
  { value: 'XS', label: 'XS' },
  { value: 'S', label: 'S' },
  { value: 'M', label: 'M' },
  { value: 'L', label: 'L' },
  { value: 'XL', label: 'XL' }
];

const groups = [
  { value: 'male', label: 'male' },
  { value: 'female', label: 'female' },
  { value: 'child', label: 'child' },
  { value: 'other', label: 'other' }
];

class ProductFormPage extends Component {

  constructor(props){
    super(props);
    this.state = { colors: {'color_1': {name: 'red', files: []}, 'color_2': {name: '#ffffff', files: []}},
                   categories: this.props.categories.map(category => {return {value: category.cuid, label: category.name}})};
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onCategoryChange = (obj) => {
    this.setState({ "category": obj.value });
  };

  onSizeChange = (val) => {
    let sizeArr = [];
    for(let i=0; i< val.length; i++) {
      sizeArr.push(val[i].value);
    }
    this.setState({ sizes: sizeArr });
  };

  onGroupChange = (val) => {
    let groupArr = [];
    for(let i=0; i< val.length; i++) {
      groupArr.push(val[i].value);
    }
    this.setState({ groups: groupArr });
  };

  onAddColor = () => {
    let obj = this.state.colors;
    let keyIndex = Object.keys(obj).length;
    while("color_" + keyIndex in obj) {
      keyIndex++;
    }
    obj["color_" + keyIndex] = {name: "", files: []};
    this.setState({colors: obj});
  };

  onColorChange = (e) => {
    var obj = this.state.colors;
    obj[e.target.name].name = e.target.value;
    this.setState({ colors: obj });
  };

  onColorFilesChange = (e) => {
    var obj = this.state.colors;
    obj[e.target.name].files = e.target.files;
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
    form.append('product[category]', this.state.category);
    form.append('product[code]', this.state.code);
    form.append('product[price]', this.state.price);
    form.append('product[description]', this.state.description);
    form.append('product[colors]', JSON.stringify(this.state.colors));

    for(let i = 0; i < this.state.sizes.length; i++) {
      form.append('product[sizes]', this.state.sizes[i]);
    }

    for(let i = 0; i < this.state.groups.length; i++) {
      form.append('product[groups]', this.state.groups[i]);
    }

    let colorsObj = this.state.colors;

    Object.keys(colorsObj).forEach(function(key) {
      for (let i = 0; i < colorsObj[key].files.length; i++) {
        form.append('product[photos]', colorsObj[key].files[i], colorsObj[key].files[i].name)
      }
    });

    this.props.dispatch(addProductRequest(form))
  };

  render(){

    return(
      <div className={styles.form}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}>
            <FormattedMessage id="createNewProduct"/>
          </h2>
          <Select
            placeholder="Product category"
            multi={false}
            name="category"
            value={this.state.category}
            options={this.state.categories}
            onChange={this.onCategoryChange} />
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
          <Select
            placeholder="Product sizes"
            multi={true}
            name="sizeField"
            className={styles.size}
            value={this.state.sizes}
            options={sizes}
            onChange={this.onSizeChange} />
          <Select
            placeholder="Product groups"
            multi={true}
            name="groupField"
            value={this.state.groups}
            options={groups}
            onChange={this.onGroupChange} />
          <ProductColorControl colors={this.state.colors} onColorFilesChange={this.onColorFilesChange} onColorChange={this.onColorChange} onRemoveColor={this.onRemoveColor} onAddColor={this.onAddColor} />
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
      <input type="text" onChange={props.onColorChange} name={key} value={props.colors[key].name} />
      <input type="file" onChange={props.onColorFilesChange} name={key} multiple/>
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

function mapStateToProps(store) {
  return { categories: getAllCategories(store)};
}

export default connect(mapStateToProps)(injectIntl(ProductFormPage));
