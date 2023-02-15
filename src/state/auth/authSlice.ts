import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { User, UserInfo } from "../../types/api";
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
    patchUserInfo: (state, action: PayloadAction<UserInfo>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
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

export const { logout, patchUserInfo } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
