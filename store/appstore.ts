import {create} from 'zustand';
import { devtools } from 'zustand/middleware';
import { createUserSlice, UserSlice } from './userSlice';

// Use a generic with UserSlice for type safety
const useUserStore = create<UserSlice>()(
  devtools(
    (set) => ({
      ...createUserSlice(set)
    }),
    { name: 'UserStore' } // optional name for DevTools
  )
);

export default useUserStore;
