import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";
import storage from "redux-persist/lib/storage";
import dialogReduser from "./state/dialog/dialogSlice";
import themeReducer from "./state/theme/themeSlice";
import authReducer from "./state/auth/authSlice";
import drawersReducer from "./state/drawers/drawersSlice";
import uploadImagesReducer from "./state/upload-images/uploadImagesSlice";
import { appApi } from "./services/api";

const rootPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["theme", "auth"],
};

const reducers = combineReducers({
  auth: authReducer,
  drawers: drawersReducer,
  dialog: dialogReduser,
  theme: themeReducer,
  uploadImages: uploadImagesReducer,
  [appApi.reducerPath]: appApi.reducer,
});

const _persistedReducer = persistReducer(rootPersistConfig, reducers);

export const store = configureStore({
  reducer: _persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      appApi.middleware
    ),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
