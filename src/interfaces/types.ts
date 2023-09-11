export interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  authorId: number;
  comments: Comment[];
  likes: Like[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: number;
  content: string;
  postId: number;
  authorId: number;
  userName: string;
  authorPic: string;
  replies?: Reply[];
  createdAt: string;
  updatedAt: string;
}

export interface Reply {
  id: number;
  content: string;
  commentId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Like {
  id: number;
  postId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
}

export type Posts = Post[];


export interface UserProfile {
  id: number;
  username: string;
  bio: string;
  email: string;
  phoneNumber: string;
  verified: boolean;
  profilePicture: string;
}

export type User = {
  username: string;
  expiredAt: number;
  accessToken: string;
  avatar?: string;
  id: string;
};



