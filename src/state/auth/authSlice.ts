import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { User } from "../../types/api";
import { usersApi } from "../../services/users";

interface AuthState {
  user: null | User;
}

const initialState: AuthState = { user: null };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      usersApi.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload;
      }
    );
  },
});

export const { logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
