import userReducer from "./slice/userSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

store.subscribe(() => {
  console.log(store.getState());
});

export default store;