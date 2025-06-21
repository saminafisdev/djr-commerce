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
    removeItem: builder.mutation({
      query: (body) => ({
        url: "cart/",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),
    updateItem: builder.mutation({
      query: ({ id, body }) => ({
        url: `cart-items/${id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),
    stripeCheckout: builder.mutation({
      query: () => ({
        url: "create-checkout-session/",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddItemMutation,
  useRemoveItemMutation,
  useUpdateItemMutation,
  useStripeCheckoutMutation,
} = cartApi;
