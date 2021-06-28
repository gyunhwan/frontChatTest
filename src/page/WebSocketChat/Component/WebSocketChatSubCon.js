import * as React from "react";
import {
  initWsConnection,
  unsubscribeAll,
  wsHealthCheckConnected,
} from "../../../action";
import { useSelector, useDispatch } from "react-redux";
import { initWebSocket } from "../../../config/websocket-config";
import WebSocketChatPresenter from "./WebSocketChatPresenter";
const WebSocketChatSubCon = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => {
    return state.auth;
  });
  const ws = useSelector((state) => {
    return state.ws;
  });
  const { wsUserTokenValue } = ws;
  React.useEffect(() => {
    console.log("hhh");
  }, []);
  React.useEffect(() => {
    if (wsUserTokenValue !== null) {
      initWs();
    }
    return () => {
      dispatch(initWsConnection(null));
      dispatch(wsHealthCheckConnected(false));
      dispatch(unsubscribeAll());
      console.log("DisConnected");
    };
  }, [wsUserTokenValue]);
  const initWs = async () => {
    const wsClient = await initWebSocket(wsUserTokenValue);
    const toSend = { stomp: wsClient, token: wsUserTokenValue };
    dispatch(initWsConnection(toSend));
  };
  return <WebSocketChatPresenter {...props}></WebSocketChatPresenter>;
};
export default WebSocketChatSubCon;

/* <div
      className={generateColorMode(isDarkModeToggled)}
      style={{
        height: "calc(100% - 64px)",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {"chttingon"}
    </div> */
