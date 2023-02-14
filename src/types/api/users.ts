export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  avatar?: string;
}

export default User;
