import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_PATH_IMAGE, API_PATH_IMAGES } from "../config";
import { Image } from "../types/api";
import { prepareEndpointPath } from "../utils/prepareEndpointPath";
import { appApi } from "./api";

export const imagessApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    listImages: builder.query<Image[], number | void>({
      query: (limit = 1000) =>
        `${API_PATH_IMAGES}?_limit=${limit}&_sort=date&_order=desc`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Images" as const, id })),
              { type: "Images", id: "LIST" },
            ]
          : [{ type: "Images", id: "LIST" }],
    }),
    deleteImage: builder.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: prepareEndpointPath(API_PATH_IMAGE, { id }),
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [{ type: "Images", id: "LIST" }],
    }),
  }),
});

export const asyncPatchImages = createAsyncThunk(
  "images/asyncPatchImages",
  async (img: Image, { dispatch }) => {
    dispatch(
      appApi.util.updateQueryData(
        "listImages" as never,
        undefined as never,
        (draft: Image[]) => {
          if (img?.id) {
            draft.unshift(img);
          }
        }
      ) as never
    );
  }
);

export const { useListImagesQuery, useDeleteImageMutation } = imagessApi;
