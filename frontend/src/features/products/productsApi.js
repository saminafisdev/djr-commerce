import { apiSlice } from "../api/apiSlice";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (page) => `products/?page=${page}`,
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
