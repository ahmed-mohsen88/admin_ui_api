import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import usersSlice from "./redux/mainSlice";

const persistConfig = {
  key: "root",
  storage,
};
// const persistedReducer = persistReducer(persistConfig, usersSlice);

const store = configureStore({
  reducer: {
    usersSlice: usersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// export let persistor = persistStore(store);

export default store;
