import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface MainDrawerState {
  isOpen: boolean;
}

const initialState: MainDrawerState = { isOpen: false };

export const mainDrawerSlice = createSlice({
  name: "mainDrawer",
  initialState,
  reducers: {
    toggleMainDrawer: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleMainDrawer } = mainDrawerSlice.actions;

export const selectMainDrawer = (state: RootState) => state.mainDrawer;

export default mainDrawerSlice.reducer;
