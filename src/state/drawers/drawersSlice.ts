import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../store";

type Drawer = { drawerId: string; isOpen?: boolean };

const drawersAdapter = createEntityAdapter<Drawer>({
  selectId: (drawer) => drawer.drawerId,
});

export const drawerSlice = createSlice({
  name: "drawers",
  initialState: drawersAdapter.getInitialState(),
  reducers: {
    toggleDrawer: (state, action: PayloadAction<string>) => {
      const { selectById } = drawersAdapter.getSelectors();
      const drawer = selectById(state, action.payload);
      if (drawer) {
        drawersAdapter.updateOne(state, {
          id: drawer.drawerId,
          changes: { isOpen: !drawer.isOpen },
        });
      } else {
        drawersAdapter.addOne(state, {
          drawerId: action.payload,
          isOpen: true,
        });
      }
    },
  },
});

export const { toggleDrawer } = drawerSlice.actions;

export const selectDrawers = (state: RootState) => state.drawers;

export const { selectById: selectDrawerById } = drawersAdapter.getSelectors();

export default drawerSlice.reducer;
