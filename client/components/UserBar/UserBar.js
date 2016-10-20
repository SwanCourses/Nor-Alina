/**
 * Created by alina on 20.10.16.
 */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import {isLoggedIn} from '../../util/apiCaller';

import styles from './UserBar.css';

function UserBar(props) {

  var UserBarContainer;
  if (isLoggedIn()) {
    UserBarContainer = <div  className={styles.container}><div>Hello {props.CurrentUserName} !</div><Link to={`/profile`}><FormattedMessage id="profile"/></Link><div onClick={props.LogoutClick} className={styles.btn}>Logout</div></div>;
  } else {
    UserBarContainer = <div  className={styles.container}><Link to={`/sign_in`}><FormattedMessage id="signIn"/></Link><Link to={`/registration`}><FormattedMessage id="registrationForm"/></Link></div>;
  }
  return (
    <div>
    {UserBarContainer}
    </div>
  )
}

export default UserBar;
