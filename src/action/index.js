import AuthService from "../service";
import {
  LOGIN_FAILURE,
  INIT_WS_CONNECTION,
  INIT_WS_TOKEN,
  LOGIN_SUCCESS,
  USER_LOGOUT,
  HANDLE_RTC_ANSWER,
  HANDLE_RTC_ACTIONS,
  SET_RTC_OFFER,
  SET_RTC_ANSWER,
  SEND_TO_SERVER,
  FETCH_GROUP_MESSAGES,
  MARK_MESSAGE_AS_SEEN,
  HANDLE_RTC_CANDIDATE,
  WS_CHECK_CONNECTED,
  SET_WS_GROUPS,
  SEND_GROUP_MESSAGE,
  UNSUBSCRIBE_ALL,
  CURRENT_ACTIVE_GROUP,
} from "../util/redux-type";

//user
export const setWsUserToken = (token) => ({
  type: INIT_WS_TOKEN,
  payload: token,
});

export const userAuthentificated = (data) => ({
  type: LOGIN_SUCCESS,
  payload: {
    userName: data.firstName,
    userId: data.id,
  },
});

export const initUserData = () => (dispatch) => {
  AuthService.testRoute().then(
    (result) => {
      dispatch(userAuthentificated(result.data));
      dispatch(setWsUserToken(result.data.wsToken));

      return Promise.resolve();
    },
    () => {
      dispatch({ type: LOGIN_FAILURE });
      return Promise.reject();
    },
  );
};

export const userLogout = () => ({
  type: USER_LOGOUT,
});

//rtc
export const initCallWebRTC = (data) => ({
  type: HANDLE_RTC_ACTIONS,
  payload: data,
});

export const createOffer = (data) => ({
  type: HANDLE_RTC_ANSWER,
  payload: data,
});

export const handleOffer = (data) => ({
  type: SET_RTC_OFFER,
  payload: data,
});

export const handleAnswer = (data) => ({
  type: SET_RTC_ANSWER,
  payload: data,
});

export const sendToServer = (data) => ({
  type: SEND_TO_SERVER,
  payload: data,
});
export const handleRtcCandidate = (data) => ({
  type: HANDLE_RTC_CANDIDATE,
  payload: data,
});

//ws
export const initWsConnection = (client) => {
  return { type: INIT_WS_CONNECTION, payload: client };
};

export const wsHealthCheckConnected = (bool) => ({
  type: WS_CHECK_CONNECTED,
  payload: bool,
});

export const setWsUserGroups = (groupId) => ({
  type: SET_WS_GROUPS,
  payload: groupId,
});

export const sendWsMessage = (message) => ({
  type: SEND_GROUP_MESSAGE,
  payload: message,
});
export const unsubscribeAll = () => ({
  type: UNSUBSCRIBE_ALL,
});
export const markMessageAsSeen = (groupUrl) => {
  console.log("MARK_MESSAGE_AS_SEEN");
  return { type: MARK_MESSAGE_AS_SEEN, payload: groupUrl };
};
export const setCurrentActiveGroup = (groupUrl) => ({
  type: CURRENT_ACTIVE_GROUP,
  payload: groupUrl,
});
export const fetchGroupMessages = (groupUrl) => ({
  type: FETCH_GROUP_MESSAGES,
  payload: groupUrl,
});
