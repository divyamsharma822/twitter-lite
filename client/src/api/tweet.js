import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const StaggeredBaseQuery = async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
        baseUrl: "http://localhost:4000/api",
        prepareHeaders: () => {
            const token = window.sessionStorage.getItem("token");
            const myHeaders = new Headers();

            if (token) {
                myHeaders.append("Authorization", `Bearer ` + token);
                myHeaders.append("Application", "application/json");
            }

            return myHeaders;
        },
    })(args, api, extraOptions);

    return result;
};

export const tweetApi = createApi({
    reducerPath: "tweetApi",
    baseQuery: StaggeredBaseQuery,
    keepUnusedDataFor: 0,
    tagTypes: ["tweets"],
    endpoints: (builder) => ({
        getTweets: builder.query({
            query: ({ page, size }) => {
                return {
                    url: `/tweet/feed?page=${page}&pageSize=${size}`,
                };
            },
            providesTags: ["tweets"],
        }),
        createTweet: builder.mutation({
            query: (body) => {
                return {
                    url: `/tweet/create`,
                    method: "POST",
                    body: body,
                };
            },
            invalidatesTags: ["tweets"],
        }),
        editTweet: builder.mutation({
            query: ({ body, tweetId }) => {
                return {
                    url: `/tweet/edit/${tweetId}`,
                    method: "PATCH",
                    body: body,
                };
            },
            invalidatesTags: ["tweets"],
        }),
        deleteTweet: builder.mutation({
            query: ({ tweetId }) => {
                return {
                    url: `/tweet/delete/${tweetId}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["tweets"],
        }),
        getDetails: builder.query({
            query: () => {
                return {
                    url: `/tweet/details`,
                };
            },
        }),
    }),
});

export const { useGetTweetsQuery, useCreateTweetMutation, useEditTweetMutation, useDeleteTweetMutation, useGetDetailsQuery } = tweetApi;
