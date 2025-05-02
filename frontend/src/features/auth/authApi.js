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
    registerUser: builder.mutation({
      query: (body) => ({
        url: "auth/users/",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetUserInfoQuery,
  useRegisterUserMutation,
} = authApi;
