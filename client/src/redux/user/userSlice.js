import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,

  reducers: {
    // action: Parameter success method.
    setSignInUserSession: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setSignInUserSession } = userSlice.actions;

export default userSlice.reducer;
