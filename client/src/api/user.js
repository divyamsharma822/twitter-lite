import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const staggeredBaseQuery = async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
        baseUrl: "http://localhost:4000/api",
    })(args, api, extraOptions);

    return result;
};

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: staggeredBaseQuery,
    keepUnusedDataFor: 360,
    tagTypes: [],
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (body) => {
                return {
                    url: `/register`,
                    method: "POST",
                    body: body,
                };
            },
        }),
        login: builder.mutation({
            query: (body) => {
                return {
                    url: `/login`,
                    method: "POST",
                    body: body,
                };
            },
        }),
        logout: builder.mutation({
            query: () => {
                return {
                    url: `/logout`,
                    method: "POST",
                };
            },
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } = userApi;
