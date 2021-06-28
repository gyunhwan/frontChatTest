import { INIT_WS_CONNECTION, SET_WS_GROUPS } from "../util/redux-type";

const retriveUserData = (store) => (data) => {
  store.dispatch({
    type: SET_WS_GROUPS,
    payload: data.groupSet,
  });
};

export const WebSocketMiddleWare =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    switch (action.type) {
      case INIT_WS_CONNECTION:
        console.log("websocket-middleware");
        const wsClient = action.payload.wsClient;
        const wsUserTokenValue = action.payload.wsToken;
        wsClient.onConnect = () => {
          wsClient.subscribe("/user/queue/reply", (result) => {
            const data = JSON.parse(result.body);
            retriveUserData(data);
          });
        };
        wsClient.publish({
          destination: "/app/message",
          body: wsUserTokenValue,
        });
        wsClient.activate();
        break;
      default:
        break;
    }
    return neext(action);
  };
