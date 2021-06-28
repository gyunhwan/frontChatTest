import React, { useState, useEffect } from "react";
import {
  sendWsMessage,
  markMessageAsSeen,
  fetchGroupMessages,
  setCurrentActiveGroup,
  wsHealthCheckConnected,
  unsubscribeAll,
  initWsConnection,
} from "../../../action";
import { useDispatch, useSelector } from "react-redux";
import MessageModel from "../../../model/message-model";
import AuthService from "../../../service";
import { initWebSocket } from "../../../config/websocket-config";
const WebSocketChatPresenter = (props) => {
  useEffect(() => {
    localStorage.setItem("_cAG", "4c9db72e-93c1-428b-9cc6-6e10b1926086");
  }, []);
  const auth = useSelector((state) => {
    return state.auth;
  });
  const ws = useSelector((state) => {
    return state.ws;
  });
  const { userId } = auth;
  const { chatHistory, wsUserTokenValue } = ws;
  const dispatch = useDispatch();
  const [isPreviewImageOpen, setPreviewImageOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [message, setMessage] = useState("");
  const groupUrl = localStorage.getItem("_cAG");
  const currentUrl = localStorage.getItem("_cAG");

  useEffect(() => {
    dispatch(fetchGroupMessages(currentUrl));
  }, [currentUrl]);
  useEffect(() => {
    scrollToEnd();
  }, [chatHistory]);
  let messageEnd;
  const scrollToEnd = () => {
    messageEnd.scrollIntoView({ behavior: "auto" });
  };
  const generateImageRender = (message) => {
    const data = JSON.parse(message);
    if (data.url === undefined) {
      return null;
    }
    return (
      <div>
        <img
          src={data.url}
          height={"200px"}
          alt={data.name}
          onClick={(event) => handleImagePreview(event, "OPEN", data.url)}
          style={{ border: "1px solid #c8c8c8", borderRadius: "7%" }}
        ></img>
      </div>
    );
  };
  const resetImageBuffer = () => {
    setFile(null);
    setImagePreviewUrl("");
    setImageLoaded(false);
  };
  const previewFile = (e) => {
    console.log(e.target);
    resetImageBuffer(e);
    let reader = new FileReader();

    // let file = e.target.file;
    // reader.readAsDataURL(file);
    // reader.onload = (e) => {
    //   if (e.target.readyState === FileReader.DONE) {
    //     setFile(file);
    //     setImagePreviewUrl(reader.result);
    //     setImageLoaded(true);
    //   }
    // };
  };
  const submitMessage = (e) => {
    if (message !== "") {
      if (e.key === undefined || escape.key === "Enter") {
        sendMessage();
        setMessage("");
      }
    }
  };
  const handleChange = async (e) => {
    setMessage(e.target.value);
  };
  const sendMessage = () => {
    if (userId === null || undefined) {
      console.log("userId is null!");
    }
    if (message !== "") {
      const toSend = new MessageModel(userId, groupUrl, message);
      sendWsMessage(toSend);
      setMessage("");
    }
    if (file !== null) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", userId);
      formData.append("groupUrl", groupUrl);
      AuthService.uploadFile(formData);

      setMessage("");
      setImageLoaded(false);
      setFile("");
      setImagePreviewUrl("");
    }
  };
  const handleImagePreview = (e, action, src) => {
    switch (action) {
      case "OPEN":
        setImgSrc(src);
        setPreviewImageOpen(true);
      case "CLOSE":
        setPreviewImageOpen(false);
        break;
      default:
        throw new Error("hadnle Image Preview Failed");
    }
  };
  const markMessageSeen = () => {
    dispatch(markMessageAsSeen(currentUrl));
  };
  return (
    <div>
      <img src={imgSrc} style={{ visibility: isPreviewImageOpen }}></img>
      <div>{JSON.stringify(chatHistory)}</div>
      <div
        style={{ float: "left", clear: "both" }}
        ref={(el) => {
          messageEnd = el;
        }}
      ></div>
      <div>
        <input type="file" onChange={(e) => previewFile(e)}></input>
      </div>
      <div>
        <input
          // onClick={markMessageSeen}
          type="text"
          value={message}
          onKeyUp={submitMessage}
          onChange={(e) => {
            handleChange(e);
          }}
        ></input>
        <button disabled={!imageLoaded && message === ""} onClick={sendMessage}>
          전송
        </button>
      </div>
    </div>
  );
};
export default WebSocketChatPresenter;
