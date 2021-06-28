import * as React from "react";
import { setWsUserToken, userAuthentificated } from "../../../action";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AuthService from "../../../service/index";

const LoginPresenter = (props) => {
  const dispatch = useDispatch();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();
  const handleChange = (e) => {
    switch (e.target.name) {
      case "username":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        throw Error("fuck");
    }
  };
  const submitLogin = (e) => {
    if (e.key === undefined || e.key === "Enter") {
      if (!username || !password) {
        return;
      }
      login(username, password);
    }
  };
  const login = async () => {
    const res = await AuthService.authenticate(username, password);
    if (res.status === 200) {
      console.log(res.data);
      dispatch(userAuthentificated(res.data));
      dispatch(setWsUserToken(res.data.wsToken));
      history.push("/");
    } else {
      alert("login fail");
      setUsername("");
      setPassword("");
    }
  };
  return (
    <div>
      <input
        name="username"
        value={username}
        onChange={(e) => {
          handleChange(e);
        }}
      ></input>
      <input
        type="password"
        name="password"
        value={password}
        onKeyUp={(e) => submitLogin(e)}
        onChange={(e) => {
          handleChange(e);
        }}
      ></input>
      <button
        onClick={(e) => {
          submitLogin(e);
        }}
      >
        로구인시도 ㄲ
      </button>
    </div>
  );
};
export default LoginPresenter;
