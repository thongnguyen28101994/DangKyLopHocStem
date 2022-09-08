import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./CreateSlice/LoginSlice";
import counterReducer from "./CreateSlice/counterSlice";
export const store = configureStore({
  reducer: {
    login: loginReducer,
    counter: counterReducer,
  },
});
