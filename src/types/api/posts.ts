import { Dayjs } from "dayjs";
export interface Post {
  id: string;
  title: string;
  alias: string;
  datePublished: Dayjs;
  isPublished: boolean;
}

export default Post;
