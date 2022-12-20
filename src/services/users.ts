import {
  API_PATH_USERS,
  API_PATH_USER,
  APP_ITEMS_PER_PAGE,
  API_PATH_LOGIN,
} from "../config";
import { User } from "../types/api";
import { prepareEndpointPath } from "../utils/prepareEndpointPath";
import { appApi } from "./api";

export const usersApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<User, { email: string; password: string }>({
      query(body) {
        return {
          url: API_PATH_LOGIN,
          method: "POST",
          body,
        };
      },
    }),
    addUser: builder.mutation<User, Partial<User>>({
      query(body) {
        return {
          url: API_PATH_USERS,
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Users", id: "PARTIAL-LIST" }],
    }),
    getUser: builder.query<User, string>({
      query: (id) => prepareEndpointPath(API_PATH_USER, { id }),
      providesTags: (result, error, id) => [{ type: "Users", id }],
    }),
    listUsers: builder.query<User[], number | void>({
      query: (page = 1) =>
        `${API_PATH_USERS}?_page=${page}&_limit=${APP_ITEMS_PER_PAGE}&_sort=name&_order=asc`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Users" as const, id })),
              { type: "Users", id: "PARTIAL-LIST" },
            ]
          : [{ type: "Users", id: "PARTIAL-LIST" }],
    }),
    updateUser: builder.mutation<User, Partial<User>>({
      query(body) {
        return {
          url: prepareEndpointPath(API_PATH_USER, { id: body.id }),
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Users", id }],
    }),
    deleteUser: builder.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: prepareEndpointPath(API_PATH_USER, { id }),
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [
        { type: "Users", id },
        { type: "Users", id: "PARTIAL-LIST" },
      ],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useListUsersQuery,
  useGetUserQuery,
  useDeleteUserMutation,
  useAddUserMutation,
  useUpdateUserMutation,
} = usersApi;
