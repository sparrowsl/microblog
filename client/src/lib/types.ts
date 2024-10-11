export type User = {
  id?: string;
  username: string;
  password: string;
  email: string;
  about_me?: string;
  last_seen?: Date | string;
  avatar?: string;
  posts?: Post[];
};

export type Post = {
  id?: string;
  author?: User;
  body: string;
};

export type API_Response = {
  data: {
    user: User;
    posts: Post[];
    token: string;
  };
  message: string;
};
