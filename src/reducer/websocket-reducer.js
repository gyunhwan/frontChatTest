import {
  INIT_WS_TOKEN,
  INIT_WS_CONNECTION,
  WS_CHECK_CONNECTED,
  SET_CHAT_HISTORY,
  ADD_CHAT_HISTORY,
  SET_WS_GROUPS,
} from "../util/redux-type";
const initState = {
  isWsConnected: true,
  wsObject: null,
  wsUserTokenValue: null,
  userInConversationList: [],
  chatHistory: [],
  groupId: "",
};
const WebSocketReducer = (state = initState, action) => {
  switch (action.type) {
    case INIT_WS_TOKEN:
      return { ...state, wsUserTokenValue: action.payload };
    case INIT_WS_CONNECTION:
      console.log("websocket - reducer");
      if (action != null) return { ...state, wsObject: action.payload };
      else return { ...state };
    case WS_CHECK_CONNECTED:
      return { ...state, isWsConnected: action.payload };
    case SET_WS_GROUPS:
      return { ...state, groupId: action.payload };
    case SET_CHAT_HISTORY:
      return { ...state, chatHistory: action.payload };
    case ADD_CHAT_HISTORY:
      return { ...state, chatHistory: [...state.chatHistory, action.payload] };
    default:
      return state;
  }
};
export default WebSocketReducer;
