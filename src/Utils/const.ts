export enum NotificationType {
  ADD_NEWPOST = 1,
  ADD_NEWSTORY = 2,
  POST_LIKE = 3,
  COMMENT = 4,
  SEND_REQUEST = 5,
  ACCEPT_REQUEST = 6,
  REJECT_REQUEST = 7,
}

export enum FilterStatus {
  ACCEPTED = 1,
  REJECTED = 2,
  PENDING = 3,
}

export enum RequestType {
  SENT = 1,
  RECEIVED = 2,
  ALL=0
}

export enum RequestTypeString {
  SENT = "Request Sent",
  RECEIVED = "Request Received",
}

