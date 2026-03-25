export type User = {
  id: string;
  email: string;
  firstName: string;
};

export type AuthResponse = {
  accessToken: string;
  user: User;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};