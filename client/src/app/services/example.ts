import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const exampleApi = createApi({
  reducerPath: "exampleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
  }),
  endpoints: (builder) => ({
    getExample: builder.query({
      query: () => ({
        url: "/example",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetExampleQuery } = exampleApi;
