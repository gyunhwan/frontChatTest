export default class MessageModel {
  userId;
  groupUrl;
  message;
  constructor(userId, groupUrl, message) {
    this.userId = userId;
    this.groupUrl = groupUrl;
    this.message = message;
  }
}
