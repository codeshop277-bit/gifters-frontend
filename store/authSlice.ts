import { createSlice } from "@reduxjs/toolkit"

type User = {
    name: string,
    email: string
}
type Gifts = {
    name: string,
    link: string
}
type AuthState = {
    user: User | null,
    credentials: string | null,
    giftsList: Gifts[] | []
}
const initialState: AuthState = {
    user: null,
    credentials: "",
    giftsList: []
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.credentials = action.payload
        },
        setGiftsList: (state, action) => {
            state.giftsList = action.payload
        }
    }
})

export const { setCredentials, setGiftsList } = authSlice.actions;
export default authSlice.reducer;