export interface IStoryMedia {
  createdAt: string;
  isSeen: boolean;
  path: string;
  storyId: number;
  text: string;
}

export interface IStory {
  avatar: string;
  stories: IStoryMedia[];
  userId: number;
  userName: string;
}
