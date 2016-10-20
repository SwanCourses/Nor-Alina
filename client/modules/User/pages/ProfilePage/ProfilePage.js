/**
 * Created by alina on 20.10.16.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './ProfilePage.css';

import { fetchUserProfile, updateUserProfileData } from '../../UserActions'
import { getUserProfile } from '../../UserReducer';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = props.user || {};
  }

  componentDidMount() {
    this.props.dispatch(fetchUserProfile());
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  updateUserProfile = ()=> {
    let user = { email: this.state.email, name: this.state.name };
    this.props.dispatch(updateUserProfileData(user))
  };

  render() {
    return (
      <div className={styles.form}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="profile"/></h2>
          <input placeholder={this.props.intl.messages.userLogin} disabled="true" value={this.state.email} onChange={this.onChange}
                 className={styles['form-field']} name="email"/>
          <input placeholder={this.props.intl.messages.userName} value={this.state.name} onChange={this.onChange}
                 className={styles['form-field']} name="name"/>
          <a className={styles['post-submit-button']} href="#" onClick={this.updateUserProfile}><FormattedMessage
            id="update"/></a>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    user: getUserProfile(state)
  };
}

export default connect(mapStateToProps)(injectIntl(ProfilePage));
