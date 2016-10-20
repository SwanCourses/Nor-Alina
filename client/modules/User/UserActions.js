/**
 * Created by alina on 20.10.16.
 */
import callApi from '../../util/apiCaller';
import { browserHistory } from 'react-router';

export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';

export function addUserRequest(user) {
  return (dispatch) => {
    return callApi('users/registration', 'post', { user }).then(res => {
      localStorage.setItem('authentication_token', res.token);
      localStorage.setItem('current_user_name', res.userName);
      localStorage.setItem('is_admin', res.admin);
      browserHistory.push('/');
    });
  };
}

export function signInRequest(creds) {
  return (dispatch) => {
    return callApi('auth', 'post', creds).then(res => {
      localStorage.setItem('authentication_token', res.token);
      localStorage.setItem('current_user_name', res.userName);
      localStorage.setItem('is_admin', res.admin);
      browserHistory.push('/');
    });
  };
}

export function signOutRequest() {
  return (dispatch) => {
    localStorage.removeItem('authentication_token');
    localStorage.removeItem('current_user_name');
    localStorage.removeItem('is_admin');
      browserHistory.push('/');
  };
}

export function fetchUserProfile() {
  return (dispatch) => {
    return callApi('users/profile').then(res => {
      dispatch(updateUserProfile(res));
    });
  };
}

export function updateUserProfileData(data) {
  return (dispatch) => {
    return callApi('users/profile', 'put', data).then(res => {
      dispatch(updateUserProfile(res));
    });
  };
}

export function updateUserProfile(profile) {
  return {
    type: UPDATE_USER_PROFILE,
    profile
  };
}

