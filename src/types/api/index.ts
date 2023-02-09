export * from "./users";
export * from "./categories";
export * from "./posts";
export * from "./images";
export * from "./avatars";

export interface ApiQueryParams {
  _page?: string;
  _limit?: string;
  _sort?: string;
  _order?: string;
  _expand?: string;
  _embed?: string;
}
