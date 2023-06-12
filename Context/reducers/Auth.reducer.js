import { SET_CURRENT_USER, LOGOUT_USER } from '../actions/Auth.actions';
import isEmpty from '../../assets/common/isEmpty';

export default function (state, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        // isAuthenticated: true,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        userProfile: action.userProfile,
      };

    case LOGOUT_USER: {
      console.log('in loggin out user');
      return {
        ...state,
        stateUser: null,
        isAuthenticated: false,
        user: null,
        userProfile: null,
      };
    }
    default:
      return state;
  }
}
