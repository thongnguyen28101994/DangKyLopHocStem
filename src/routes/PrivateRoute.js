import React from "react";
import { Redirect, Route } from "react-router-dom";
import useProvideAuth from "../ultilities/customHook/useProvideAuth";

export default function PrivateRoute({ authPage, children, ...rest }) {
  // tạo function check điều kiện
  const auth = useProvideAuth();
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return auth.user.isLogged ? (
          children
        ) : (
          <Redirect to={{ pathname: authPage, state: { from: location } }} />
        );
      }}
    ></Route>
  );
}
