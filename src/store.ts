import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";
import storage from "redux-persist/lib/storage";
import { usersApi } from "./services/users";
import counterReducer from "./state/counter/counterSlice";
import dialogReduser from "./state/dialog/dialogSlice";
import themeReducer from "./state/theme/themeSlice";
import authReducer from "./state/auth/authSlice";
import mainDrawerReducer from "./state/main-drawer/mainDrawerSlice";

const rootPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["theme", "auth"],
};

const reducers = combineReducers({
  auth: authReducer,
  mainDrawer: mainDrawerReducer,
  dialog: dialogReduser,
  counter: counterReducer,
  theme: themeReducer,

  [usersApi.reducerPath]: usersApi.reducer,
});

const _persistedReducer = persistReducer(rootPersistConfig, reducers);

export const store = configureStore({
  reducer: _persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      usersApi.middleware
    ),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
