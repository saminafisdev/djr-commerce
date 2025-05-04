import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { removeUser } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api/",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set("Authorization", `Token ${token}`);
    }

    return headers;
  },
});

const baseQueryWithAuth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    api.dispatch(removeUser());
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Cart", "Wishlist", "User"],
  baseQuery: baseQueryWithAuth,
  endpoints: () => ({}),
});
