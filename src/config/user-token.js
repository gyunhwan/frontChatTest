const userInfo = JSON.parse(localStorage.getItem("authorization"));

export const getUserToken = () => {
  if (userInfo == null || undefined) {
    return "";
  } else {
    return userInfo.token;
  }
};

export const buildUserToken = () => {
  if (userInfo === null || undefined) {
    return "";
  } else {
    return JSON.stringify(userInfo);
  }
};
