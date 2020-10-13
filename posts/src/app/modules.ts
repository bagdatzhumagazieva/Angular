export type IUser = {
  username: string;
  password: string;
};

export type IUserReg = {
  name: string;
  username: string;
  email: string;
  password: string;
  phone: string;
};

export type IUserFilter = {
  id: number;
  name: string;
};

export type IPost = {
  body: string;
  id?: number;
  title: string;
  userId: number;
};

export type IComment = {
  body: string;
  email?: string;
  id?: number;
  name?: string;
  postId?: number;
};

export type IAlbum = {
  userI: number;
  id: number;
  title: string;
};
