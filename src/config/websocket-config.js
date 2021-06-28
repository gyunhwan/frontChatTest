import { Client } from "@stomp/stompjs";
let client;
const WS_URL =
  process.env.NODE_ENV == "development" ? "localhost:9095/" : "localhost:9090/";

export const initWebSocket = (userToken) => {
  client = new Client({
    brokerURL: `ws://${WS_URL}messenger/websocket?token=${userToken}`,
    reconnectDelay: 5000,
    heartbeatIncoming: 6000,
    heartbeatOutgoing: 6000,
  });
  console.log(client);
  return client;
};
