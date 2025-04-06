import { apiSlice } from "../api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserOrders: builder.query({
      query: () => "orders/",
    }),
  }),
});

export const { useGetUserOrdersQuery } = orderApi;
