import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types";
type SliceState =  { user:User|null }

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null },
  reducers: {
    setCredentials: (state:SliceState, action:PayloadAction<User>) => {

      const  user = action.payload;
      state.user = user;
      console.log('currentUser',state.user)

    },
  
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state:any) => state.auth.user;
