import { configureStore, combineReducers } from "@reduxjs/toolkit";
import todoSliceReducer from "./todo/todoSlice";
import userSliceReducer from "./todo/userSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage: storage.default || storage,
  whitelist: ["todo"],
  blacklist: ["user"],
};

const rootReducer = combineReducers({
  todo: todoSliceReducer,
  user: userSliceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
