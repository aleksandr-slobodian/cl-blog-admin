import { API_PATH_POSTS, API_PATH_POST, APP_ITEMS_PER_PAGE } from "../config";
import { Post } from "../types/api";
import { prepareEndpointPath } from "../utils/prepareEndpointPath";
import { appApi } from "./api";

export const postsApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    addPost: builder.mutation<Post, Partial<Post>>({
      query(body) {
        return {
          url: API_PATH_POSTS,
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Posts", id: "PARTIAL-LIST" }],
    }),
    getPost: builder.query<Post, string>({
      query: (id) => prepareEndpointPath(API_PATH_POST, { id }),
      providesTags: (result, error, id) => [{ type: "Posts", id }],
    }),
    listPosts: builder.query<Post[], number | void>({
      query: (page = 1) =>
        `${API_PATH_POSTS}?_page=${page}&_limit=${APP_ITEMS_PER_PAGE}&_sort=name&_order=asc`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Posts" as const, id })),
              { type: "Posts", id: "PARTIAL-LIST" },
            ]
          : [{ type: "Posts", id: "PARTIAL-LIST" }],
    }),
    updatePost: builder.mutation<Post, Partial<Post>>({
      query(body) {
        return {
          url: prepareEndpointPath(API_PATH_POST, { id: body.id }),
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Posts", id }],
    }),
    deletePost: builder.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: prepareEndpointPath(API_PATH_POST, { id }),
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [
        { type: "Posts", id },
        { type: "Posts", id: "PARTIAL-LIST" },
      ],
    }),
  }),
});

export const {
  useListPostsQuery,
  useGetPostQuery,
  useDeletePostMutation,
  useAddPostMutation,
  useUpdatePostMutation,
} = postsApi;
