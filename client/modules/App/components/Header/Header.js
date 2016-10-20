import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { getCurrentUserName } from '../../../../util/apiCaller';

import CartWidget from '../../../Cart/components/CartWidget/CartWidget'
import UserBar from '../../../../components/UserBar/UserBar'
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import { signOutRequest } from '../../../User/UserActions'

// Import Style
import styles from './Header.css';

export class Header extends Component {
  constructor(props) {
    super(props)
    this.state = { isShowingModal: false }
  }

  handleClick = () => this.setState({ isShowingModal: true });

  handleClose = () => this.setState({ isShowingModal: false });

  logoutClick = () => {
    this.props.dispatch(signOutRequest());
  };

  render() {
    const languageNodes = this.props.intl.enabledLanguages.map(
      lang => <li key={lang} onClick={() => this.props.switchLanguage(lang)}
                  className={lang === this.props.intl.locale ? styles.selected : ''}>{lang}</li>
    );

    return (
      <div className={styles.header}>
        <Link to="/products">Products</Link>
        <UserBar CurrentUserName={getCurrentUserName()} LogoutClick={this.logoutClick} />
        <div className={styles['language-switcher']}>
          <ul>
            <li><FormattedMessage id="switchLanguage"/></li>
            {languageNodes}
          </ul>
        </div>
        <div onClick={this.handleClick}><FormattedMessage id="cart"/> {this.props.cartProductsCount}</div>
        <div className={styles.content}>
          <h1 className={styles['site-title']}>
            <Link to="/"><FormattedMessage id="siteTitle"/></Link>
          </h1>
          {
            this.context.router.isActive('/', true)
              ? <a className={styles['add-post-button']} href="#" onClick={this.props.toggleAddPost}><FormattedMessage
              id="addPost"/></a>
              : null
          }
        </div>
        {
          this.state.isShowingModal &&
          <ModalContainer onClose={this.handleClose}>
            <ModalDialog onClose={this.handleClose}>
              <CartWidget/>
            </ModalDialog>
          </ModalContainer>
        }
      </div>
    );
  }
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  toggleAddPost: PropTypes.func.isRequired,
  switchLanguage: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

function mapStateToProps(state, props) {
  return {};
}

export default connect(mapStateToProps)(Header);
