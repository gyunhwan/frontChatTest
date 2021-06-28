import axios from "axios";
import JwtModel from "../model/jwt-model";

const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:9095/api/"
    : "http://192.168.1.2:9090/api/";

const instance = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

class AuthService {
  authenticate(username, password) {
    const toSend = new JwtModel(username, password);
    return instance.post("auth", toSend);
  }

  testRoute() {
    return instance.get("fetch");
  }

  logout() {
    return instance.get("logout");
  }

  createGroup(groupName) {
    return instance.post("create", { name: groupName });
  }

  fetchMessages(id) {
    return instance.post(API_URL + "fetchMessages", { id: id });
  }

  addUserToGroup(userId, groupUrl) {
    return instance.get(API_URL + "user/add/" + userId + "/" + groupUrl);
  }

  fetchAllUsers() {
    return instance.get(API_URL + "users/all");
  }

  fetchAllUsersInConversation(groupId) {
    return instance.post(API_URL + "users/group/all", { groupUrl: groupId });
  }

  createUser(firstname, lastname, email, password) {
    return instance.post(API_URL + "user/register", {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    });
  }

  leaveConversation(userIdToRemove, groupId) {
    return instance.get(
      API_URL + "user/leave/" + userIdToRemove + "/group/" + groupId,
    );
  }

  removeUserFromConversation(userIdToRemove, groupId) {
    return instance.get(
      API_URL + "user/remove/" + userIdToRemove + "/group/" + groupId,
    );
  }

  removeAdminUserInConversation(userIdToRemove, groupId) {
    return instance.get(
      API_URL + "user/remove/admin/" + userIdToRemove + "/group/" + groupId,
    );
  }

  grantUserAdminInConversation(userIdToRemove, groupId) {
    return instance.get(
      API_URL + "user/grant/" + userIdToRemove + "/group/" + groupId,
    );
  }

  uploadFile(data) {
    return instance.post(API_URL + "upload", data);
  }
}

export default new AuthService();
