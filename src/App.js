import React from "react";

import "./App.css";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LoginContainer from "./page/Login";
import WebSocketChatContainer from "./page/WebSocketChat";
const App = (props) => {
  const state = useSelector((state) => state.auth);
  console.log(state);
  return (
    <div className="app">
      <Router>
        <Route
          exact
          path="/"
          render={(props) => {
            return (
              <div>
                {JSON.stringify(props)}
                <Link to={{ pathname: "/chat" }}>gogogo</Link>
              </div>
            );
          }}
        ></Route>
        <Route
          exact
          path="/login"
          render={(props) => {
            return <LoginContainer {...props}></LoginContainer>;
          }}
        ></Route>
        <Route
          path="/chat"
          render={(props) => {
            return <WebSocketChatContainer {...props}></WebSocketChatContainer>;
          }}
        ></Route>
      </Router>
    </div>
  );
};
export default App;
