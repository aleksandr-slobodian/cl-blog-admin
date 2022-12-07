import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type DarkMode = boolean | undefined;
interface ThemeState {
  darkMode: DarkMode;
}

const initialState: ThemeState = {
  darkMode: undefined,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<DarkMode>) => {
      state.darkMode = action.payload;
    },
  },
});

export const { setMode } = themeSlice.actions;

export const selectDarkMode = (state: RootState) => state.theme.darkMode;

export default themeSlice.reducer;
