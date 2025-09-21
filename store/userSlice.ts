export type UserDetails = {
    id: string,
    name: string,
    email: string,
    access_token: string
}

export type UserSlice = {
    userDetails: UserDetails | null;
    setUserDetails: (user: UserDetails) => void;
    clearUser: () => void;
}

export const createUserSlice = (set: any) : UserSlice => ({
    userDetails: null,
    setUserDetails: (user) => set({ userDetails: user}),
    clearUser: () => set({ userDetails: null    })

})