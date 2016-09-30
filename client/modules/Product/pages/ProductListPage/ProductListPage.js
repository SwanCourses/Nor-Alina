/**
 * Created by alina on 27.09.16.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductListItem from '../../components/ProductListItem/ProductListItem';

import styles from './ProductListPage.css';

// Import Selectors
import { getProducts } from '../../ProductReducer';
import { setSearchQuery, filterByGroup } from '../../ProductActions';

const groups = ['male', 'female', 'child', 'other'];

class ProductListPage extends Component {
   constructor(props) {
          super(props);
          this.state = { searchQuery: '', groupsFilter: [] }
          }

          onClick = (e) => {
            let groupArray = this.state.groupsFilter;
            if(groupArray.indexOf(e.target.name) > -1){
              groupArray.splice(groupArray.indexOf(e.target.name), 1);
            }
            else {
              groupArray.push(e.target.name);
            }
            this.setState({groupsFilter : groupArray});
            this.props.dispatch(filterByGroup(groupArray));
          };

    componentDidMount() {
          this.setState({ products: this.props.products });
          this.setState({ groupsFilter: this.props.groupsFilter });
        }

    render() {
          return (
            <div className={styles.container}>
                <div className={styles['filter-panel']}>
                  <div className={styles['filter-groups']}>
                    {groups.map(group => {
                      return <div key={"group_" + group}>
                        <button
                          className={this.state.groupsFilter.indexOf(group) > -1 ? styles["active"] : styles["inactive"]}
                          name={group} onClick={this.onClick}>{group}</button>
                      </div>;
                    })}
                    </div>
                  <input
                    type="search"
                    value={this.props.searchQuery}
                    placeholder="Type name..."
                    onChange={e=>this.props.dispatch(setSearchQuery(e.target.value))}/>
                 </div>
            <div className={styles.products}>
                  {
                    this.props.products.map(product=> (
                      <div key={product.cuid} className={styles.product}>
                          <ProductListItem key={product.cuid} {...product}/>
                        </div>
                    ))
                  }
            </div>
          </div>
          )
        }
  }

// Retrieve data from store as props
  function mapStateToProps(state) {
      return {
          searchQuery: state.products.searchQuery,
          groupsFilter: state.products.groupsFilter,
          products: getProducts(state, state.products.searchQuery, state.products.groupsFilter),
        };
    }

export default connect(mapStateToProps)(ProductListPage);
