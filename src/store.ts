import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import counterReducer from "./state/counter/counterSlice";
import themeReducer from "./state/theme/themeSlice";

const rootPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["theme"],
};

const reducers = combineReducers({
  counter: counterReducer,
  theme: themeReducer,
});

const _persistedReducer = persistReducer(rootPersistConfig, reducers);

export const store = configureStore({
  reducer: _persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
