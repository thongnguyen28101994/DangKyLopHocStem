import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    getUserInfomation: () => {},
  },
});

export const { getUserInfomation } = LoginSlice.actions;

export default LoginSlice.reducer;
