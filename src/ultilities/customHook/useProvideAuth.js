import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoginInformation, Login } from "../../redux/CreateSlice/LoginSlice";

export default function useProvideAuth() {
  const value = useSelector((state) => state.login.value);
  const [user, setUser] = useState(value);

  const dispatch = useDispatch();
  const signin = (cb) => {
    dispatch(Login());
    console.log(value);
    setUser(value);
    cb();
    // return async () => {
    //   console.log("a");
    //   dispatch(getLoginInformation);
    //   //   dispatch(
    //   //     (() => {
    //   //       return getLoginInformation();
    //   //     })()
    //   //   );
    //   setUser(value);
    //   console.log(value1);
    //   cb();
    // };
  };
  const signout = (cb) => {
    return () => {
      setUser(null);
      cb();
    };
  };
  return { user, signin, signout };
}
