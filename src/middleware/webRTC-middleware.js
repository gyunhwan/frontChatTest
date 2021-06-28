import { handleAnswer, handleOffer, handleRtcCandidate } from "../action";
export const handleRTCSubscribeEvents = (data, store) => {
  const userId = store.getState().auth.userId;
  console.log("TTTTTTTTTTTTTTTTTTTTTT");
  if (data.name !== userId) {
    if (data.type === "video-offer") {
      console.log("Receiving offer");
      store.dispatch(handleOffer(data.sdp));
    }
    if (data.type === "video-answer") {
      console.log("Receiving answer");
      store.dispatch(handleAnswer(data));
    }
    if (data.type === "new-ice-candidate") {
      console.log("Receiving candidate");
      store.dispatch(handleRtcCandidate(data));
    }
  }
};
export const handleRtcActions = (wsClient, store, payload) => {
  const groupUrl = localStorage.getItem("_cAG");
  const userId = store.getState().auth.userId;
  switch (payload.type) {
    case "init":
      break;
    case "offer":
      console.log("CASE OFFER");
      if (wsClient !== null) {
        wsClient.publish({
          destination: `/app/message/call/${userId}/group/${groupUrl}`,
          body: JSON.stringify(payload),
        });
      }
      break;
    case "answer":
      console.log("ANSWER");
      wsClient.publish({
        destination: `/app/message/call/${userId}/groupId/${groupUrl}`,
        body: JSON.stringify(payload),
      });
      break;
    case "candidate":
      if (wsClient !== null) {
        console.log("CANDIDATE");
        wsClient.publish({
          destination: `/app/message/call/${userId}/grop/${groupUrl}`,
          body: JSON.stringify(payload),
        });
      }
      break;
    default:
      console.log("ERROR NOTHING MATHCH SWITCH STATEMENT");
      break;
  }
};
