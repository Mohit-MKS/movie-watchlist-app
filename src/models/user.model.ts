interface IUser {
  name: string;
  email: string
}

interface IUsersObj {
  [key: string]: IUser
}

export type { IUser, IUsersObj }