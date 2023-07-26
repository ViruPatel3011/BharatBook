export interface IUserRequest {
  createdAt: string;
  fromAvatar: string | null;
  fromUserId: number;
  fromUserName: string;
  isFriend: boolean | null;
  isRejected: boolean;
  requestId: number;
  requestType: string;
  status: string;
  toAvatar: string | null;
  toUserId: number;
  toUserName: string;
}
