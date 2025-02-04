import { apiSlice } from "../api/apiSlice";

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => "cart/",
      providesTags: ["Cart"],
    }),
    addItem: builder.mutation({
      query: (body) => ({
        url: "cart/",
        body: body,
        method: "POST",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const { useGetCartQuery, useAddItemMutation } = cartApi;
