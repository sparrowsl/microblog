export type User = {
  id?: number;
  username: string;
  password: string;
  email: string;
  about_me?: string;
  last_seen?: Date | string;
  avatar?: string;
  posts?: Post[];
};

export type Post = {
  id?: number;
  author?: User;
  body: string | null;
};

export type API_Response = {
  data: {
    user: User;
    posts: Post[];
    token: string;
  };
  message: string;
};
