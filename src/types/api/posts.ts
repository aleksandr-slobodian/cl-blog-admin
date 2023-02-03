import User from "./users";

export interface Post {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  image: string;
  alias: string;
  datePublished: number;
  isPublished: boolean;
  categoriesIds?: string[];
  userId: string;
  user?: User;
}

export default Post;
