import { apiSlice } from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/token/login/",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "auth/token/logout/",
        method: "POST",
      }),
      invalidatesTags: ["User", "Cart", "Wishlist"],
    }),
    getUserInfo: builder.query({
      query: () => "auth/users/me/",
      providesTags: ["User"],
    }),
    registerUser: builder.mutation({
      query: (body) => ({
        url: "auth/users/",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetUserInfoQuery,
  useRegisterUserMutation,
} = authApi;
