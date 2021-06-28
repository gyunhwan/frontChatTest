import { combineReducers } from "redux";
import WebSocketReducer from "./websocket-reducer";
import AuthReducer from "./auth-reducer";
import webRTCReducer from "./webRTC-rerducer";
const rootReducer = combineReducers({
  ws: WebSocketReducer,
  auth: AuthReducer,
  rtc: webRTCReducer,
});

export default rootReducer;
