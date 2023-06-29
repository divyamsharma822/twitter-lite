import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { userApi } from "../api/user";
import { tweetApi } from "../api/tweet";

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [tweetApi.reducerPath]: tweetApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware).concat(tweetApi.middleware),
});

setupListeners(store.dispatch);
