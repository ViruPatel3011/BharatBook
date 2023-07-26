export interface IYourFriend {
  createdAt: string;
  fromAvatar: string | null;
  fromUserId: number;
  fromUserName: string;
  isFriend: boolean;
  isRejected: boolean;
  requestId: number;
  requestType: string;
  status: string;
  toAvatar: string | null;
  toUserId: number;
  toUserName: string;

}
