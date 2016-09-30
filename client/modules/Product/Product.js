/**
 * Created by alina on 27.09.16.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from './ProductActions';

export class Product extends Component {

  constructor(props) {
       super(props);
        this.state = { isMounted: false };
      }

  componentDidMount() {
        this.props.dispatch(fetchProducts());
        this.setState({ isMounted: true });
      }

  render() {
        return this.props.children;
      }
}
Product.need = [() => {
    return fetchProducts();
  }];

  Product.propTypes = {
    children: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

    function mapStateToProps(store) {
        return {};
      }

export default connect(mapStateToProps)(Product);
