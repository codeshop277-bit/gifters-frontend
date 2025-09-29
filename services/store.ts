import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/authSlice"
import { api } from "./api";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefault) => getDefault().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// getdefault() handles the following 
//     redux-thunk → allows async logic (like thunks).
//     serializableStateInvariantMiddleware → warns if you put non-serializable values in state/actions (in dev).
//     immutableStateInvariantMiddleware → warns if you accidentally mutate state (in dev).

// api.middleware is generated automatically by RTK Query when you create your API slice (createApi).
// It handles:
//     Caching
//     Deduping requests
//     Auto re-fetching on focus/reconnect
//     Keeping track of loading states
//     Updating cached data when mutations succeed
