import { API_PATH_AVATAR, API_PATH_AVATARS } from "../config";
import { ApiQueryParams, Avatar } from "../types/api";
import { prepareEndpointPath } from "../utils/prepareEndpointPath";
import { appApi } from "./api";

interface AvatarListQueryParams extends ApiQueryParams {
  user_id?: string;
}

export const avatarsApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    addAvatar: builder.mutation<Avatar, FormData>({
      query(body) {
        return {
          url: API_PATH_AVATARS,
          method: "POST",
          body,
        };
      },
    }),
    listAvatars: builder.query<Avatar[], AvatarListQueryParams | undefined>({
      query: (params) => ({
        url: API_PATH_AVATARS,
        params: {
          _limit: 1000,
          _sort: "date",
          _order: "desc",
          ...params,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Avatars" as const, id })),
              { type: "Avatars", id: "LIST" },
            ]
          : [{ type: "Avatars", id: "LIST" }],
    }),
    deleteAvatar: builder.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: prepareEndpointPath(API_PATH_AVATAR, { id }),
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [{ type: "Avatars", id: "LIST" }],
    }),
  }),
});

export const {
  useListAvatarsQuery,
  useDeleteAvatarMutation,
  useAddAvatarMutation,
} = avatarsApi;
