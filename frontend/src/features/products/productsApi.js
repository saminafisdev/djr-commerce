import { apiSlice } from "../api/apiSlice";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (page) => `products/?page=${page}`,
    }),
    getProduct: builder.query({
      query: (slug) => `products/${slug}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productsApi;
