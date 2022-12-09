import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  API_BASE_URL,
  API_PATH_USERS,
  API_PATH_USER,
  APP_ITEMS_PER_PAGE,
} from "../config";
import { User } from "../types/api";
import { prepareEndpointPath } from "../utils/prepareEndpointPath";

export const usersApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    listUsers: builder.query<User[], number | void>({
      query: (page = 1) =>
        `${API_PATH_USERS}?_page=${page}&_limit=${APP_ITEMS_PER_PAGE}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Users" as const, id })),
              { type: "Users", id: "PARTIAL-LIST" },
            ]
          : [{ type: "Users", id: "PARTIAL-LIST" }],
    }),
    deleteUser: builder.mutation<{ success: boolean; id: number }, number>({
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

export const { useListUsersQuery, useDeleteUserMutation } = usersApi;
