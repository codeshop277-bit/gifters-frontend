import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../utils/baseurl";
import { RootState } from "./store";
import { setCredentials, setGiftsList } from "../store/authSlice";


type LoginRequest = { email: string; password: string };
type RegisterRequest = { name: string; email: string; password: string };
type User = { id: string; name: string; email: string };
type AuthResponse = { user: User; access_token: string };


//createApi - creates the RTK query slice
//reducerPath - key will be used in reducer
//baseQuery - defines how every request is made.
//prepareHeaders - adds header to all request
export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers, { getState}) => {
            console.log(getState)
            // const token = (getState as any).auth.access_token
            // if (token) headers.set("Authorization", `Bearer ${token}`);
            // return headers
        }
    }),

    //endpoints - each endpoint will automatically generate hooks  and manage states
    //builder.mutation defines POST/PUT/DELETE
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (credentials) => ({
                url: "/users/login",
                method: "POST",
                body: credentials
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}){
                try{
                    const { data } = await queryFulfilled;
                    dispatch(setCredentials(data))
                }catch {}
            }
        }),
        register: builder.mutation<AuthResponse, RegisterRequest>({
            query: (credentials) => ({
                url: "users/register",
                method: "POST",
                body: credentials
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}){
                try{
                    const { data } = await queryFulfilled;
                    dispatch(setCredentials(data))
                }catch {

                }
            }
        }),

        postGifts: builder.mutation({
            query: ({payload, credentails}) => ({
                url: `gifts/add/${credentails.user.id}`,
                method: "POST",
                body: payload,
                headers: {
                    Authorization: `Bearer ${credentails.access_token}`
                }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCredentials(data))
                } catch {

                }
            }
        }),

         getGiftsList: builder.mutation({
            query: (payload) => ({
                url: "gifts/fetch",
                method: "GET",
                body: payload
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setGiftsList(data))
                } catch {

                }
            }
        })
    })
})

export const { useLoginMutation, useRegisterMutation, usePostGiftsMutation, useGetGiftsListMutation } = api;