import { apiSlice } from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/token/login/",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "auth/token/logout/",
        method: "POST",
      }),
    }),
    getUserInfo: builder.query({
      query: () => "auth/users/me/",
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useGetUserInfoQuery } =
  authApi;
