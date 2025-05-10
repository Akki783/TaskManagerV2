import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  userList: []
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      // Update the token if it exists
      if (action.payload.token) {
        state.token = action.payload.token;
      }

      // You can also handle updating the user data if needed
      if (action.payload.user) {
        state.user = action.payload.user;
      }
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
    },
    setUserList: (state,action) => {
      state.userList = action.payload;
    },
  },
});

export const { setUser, clearUser, setUserList } = userSlice.actions;

export default userSlice.reducer;
