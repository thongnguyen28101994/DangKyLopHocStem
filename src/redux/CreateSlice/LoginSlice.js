import { createSlice } from "@reduxjs/toolkit";
import { RegisterApi } from "../../apis/RegisterApi";
const initialState = {
  value: {
    userName: "thongnguyen",
    password: 123456,
    isLogged: false,
  },
  test: {},
};

export const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    getUserInfomation: (state, action) => {
      state.test = action.payload;
    },
    changeLoggedState: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { getUserInfomation, changeLoggedState } = LoginSlice.actions;

export default LoginSlice.reducer;

export async function getLoginInformation(dispatch, getState) {}

export function Login() {
  return async function ChangeToLoginState(dispatch, getState) {
    const newValue = getState().login.value;
    dispatch(changeLoggedState({ ...newValue, isLogged: true }));
    // const result = await RegisterApi.getUserData();
    // console.log(result);
    //dispatch(getUserInfomation(result.response));
    // console.log(getState().test);
  };
}
