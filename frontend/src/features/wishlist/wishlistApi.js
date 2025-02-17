import { apiSlice } from "../api/apiSlice";

export const wishlistApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => "wishlist/",
      providesTags: ["Wishlist"],
    }),
    addToWishlist: builder.mutation({
      query: (body) => ({
        url: "wishlist/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Wishlist"],
    }),
    removeWishlistItem: builder.mutation({
      query: (body) => ({
        url: "wishlist/",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveWishlistItemMutation,
} = wishlistApi;
