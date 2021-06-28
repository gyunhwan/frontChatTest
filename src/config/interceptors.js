import axios from "axios";

const jwtToken = localStorage.getItem("authorization");

export default axios.interceptors.request.use(
  function (config) {
    console.log("Interceptors");
    if (jwtToken) {
      config.headers["authorization"] = "Bearer " + jwtToken;
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  },
);
