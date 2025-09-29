import { createSlice } from "@reduxjs/toolkit"

type User = {
    name: string,
    email: string
}
type AuthState = {
    user: User | null,
    access_token: string | null
}
const initialState: AuthState = {
    user: null,
    access_token: ""
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.access_token = action.payload.access_token
        }
    }
})

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;