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
    giftsList: Gifts[] | [],
    refreshList: boolean
}
const initialState: AuthState = {
    user: null,
    credentials: "",
    giftsList: [],
    refreshList: false
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
        },
        refreshGiftList: (state, action) => {
            state.refreshList = action.payload
        }
    }
})

export const { setCredentials, setGiftsList, refreshGiftList } = authSlice.actions;
export default authSlice.reducer;