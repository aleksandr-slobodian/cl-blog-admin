import { API_PATH_CATEGORIES, API_PATH_CATEGORY } from "../config";
import { Category } from "../types/api";
import { prepareEndpointPath } from "../utils/prepareEndpointPath";
import { appApi } from "./api";

export const categoriesApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    addCategory: builder.mutation<Category, Partial<Category>>({
      query(body) {
        return {
          url: API_PATH_CATEGORIES,
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Categories", id: "LIST" }],
    }),
    getCategory: builder.query<Category, string>({
      query: (id) => prepareEndpointPath(API_PATH_CATEGORY, { id }),
      providesTags: (result, error, id) => [{ type: "Categories", id }],
    }),
    listCategories: builder.query<Category[], void>({
      query: () => `${API_PATH_CATEGORIES}?_limit=1000&_sort=title&_order=asc`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Categories" as const, id })),
              { type: "Categories", id: "LIST" },
            ]
          : [{ type: "Categories", id: "LIST" }],
    }),
    updateCategory: builder.mutation<Category, Partial<Category>>({
      query(body) {
        return {
          url: prepareEndpointPath(API_PATH_CATEGORY, { id: body.id }),
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Categories", id }],
    }),
    deleteCategory: builder.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: prepareEndpointPath(API_PATH_CATEGORY, { id }),
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [
        { type: "Categories", id },
        { type: "Categories", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useListCategoriesQuery,
  useDeleteCategoryMutation,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useGetCategoryQuery,
} = categoriesApi;
