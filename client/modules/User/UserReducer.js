/**
 * Created by alina on 20.10.16.
 */

import {UPDATE_USER_PROFILE} from './UserActions';
// Initial State
const initialState = { };

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };
    default:
      return state;
  }
};

/* Selectors */
export const getUserProfile = (state) => state.user.profile;

// Export Reducer
export default UserReducer;
