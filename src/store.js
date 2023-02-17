import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./redux/mainSlice";

const store = configureStore({
  reducer: {
    usersSlice: usersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});


export default store;
