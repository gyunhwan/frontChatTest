const authHeader = () => {
  const user = JSON.stringify(localStorage.getItem("authorization"));
  if (user && user.token) {
    return { Autthorization: `Bearer${user.token}` };
  } else {
    return {};
  }
};

export default authHeader;
