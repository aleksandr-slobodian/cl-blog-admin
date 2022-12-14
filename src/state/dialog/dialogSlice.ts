import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type DialogOptions = {
  key?: string;
  title?: string;
  id?: string;
  text: string;
};

interface DialogState {
  isOpen: boolean;
  options?: DialogOptions;
}

const initialState: DialogState = { isOpen: false };

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    openDialog: (state, action: PayloadAction<DialogOptions>) => {
      state.isOpen = true;
      state.options = action.payload;
    },
    closeDialog: (state) => {
      state.isOpen = false;
      state.options = undefined;
    },
  },
});

export const { openDialog, closeDialog } = dialogSlice.actions;

export const selectDialog = (state: RootState) => state.dialog;

export default dialogSlice.reducer;
