export interface UserInfo {
  name: string;
  avatar?: string;
}
export interface User extends UserInfo {
  id: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export default User;
