export interface IPost {
  avatar: string;
  createdAt: string;
  path: string[];
  postId: number;
  text: string;
  userId: number;
  userName: string;
}

export class PostClass implements IPost {
  avatar: string;
  createdAt: string;
  path: string[];
  postId: number;
  text: string;
  userId: number;
  userName: string;

  constructor(init?: IPost) {
    this.avatar = init?.avatar ?? "";
    this.createdAt = init?.createdAt ?? "";
    this.path = init?.path ?? [""];
    this.postId = init?.postId ?? 0;
    this.text = init?.text ?? "";
    this.userId = init?.userId ?? 0;
    this.userName = init?.userName ?? "";
  }
}
