import { Dayjs } from "dayjs";
export interface Post {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  alias: string;
  datePublished: Dayjs;
  isPublished: boolean;
}

export default Post;
