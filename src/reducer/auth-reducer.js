import { LOGIN_SUCCESS, LOGIN_FAILURE, USER_LOGOUT } from "../util/redux-type";
const initState = {
  loggedIn: null,
  userName: null,
  userId: null,
};

const AuthReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        loggedIn: true,
        userName: action.payload.userName,
        userId: action.payload.userId,
      };
    case LOGIN_FAILURE:
    case USER_LOGOUT:
      return { loggedIn: false, userName: null };
    default:
      return state;
  }
};
export default AuthReducer;
