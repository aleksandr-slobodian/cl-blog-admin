import {
  createEntityAdapter,
  createSlice,
  EntityState,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { KeyValue } from "../../types";

type Drawer = { drawerId: string; isOpen?: boolean; data?: KeyValue };

const drawersAdapter = createEntityAdapter<Drawer>({
  selectId: (drawer) => drawer.drawerId,
});

const getDrawerById = (state: EntityState<Drawer>, id: string) => {
  const { selectById } = drawersAdapter.getSelectors();
  return selectById(state, id);
};

export const drawerSlice = createSlice({
  name: "drawers",
  initialState: drawersAdapter.getInitialState(),
  reducers: {
    toggleDrawer: (state, action: PayloadAction<string>) => {
      const drawer = getDrawerById(state, action.payload);
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
    openDrawer: (
      state,
      action: PayloadAction<{ name: string; data?: KeyValue }>
    ) => {
      const drawer = getDrawerById(state, action.payload.name);
      if (drawer) {
        drawersAdapter.updateOne(state, {
          id: drawer.drawerId,
          changes: { isOpen: true, data: action.payload?.data },
        });
      } else {
        drawersAdapter.addOne(state, {
          drawerId: action.payload.name,
          isOpen: true,
          data: action.payload?.data,
        });
      }
    },
    closeDrawer: (state, action: PayloadAction<{ name: string }>) => {
      const drawer = getDrawerById(state, action.payload.name);
      if (drawer) {
        drawersAdapter.updateOne(state, {
          id: drawer.drawerId,
          changes: { isOpen: false },
        });
      }
    },
  },
});

export const { toggleDrawer, openDrawer, closeDrawer } = drawerSlice.actions;

export const selectDrawers = (state: RootState) => state.drawers;

export const { selectById: selectDrawerById } = drawersAdapter.getSelectors();

export default drawerSlice.reducer;
