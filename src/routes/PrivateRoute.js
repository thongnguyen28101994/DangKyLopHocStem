import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute({ authPage, children, ...rest }) {
  // tạo function check điều kiện
  const auth = { user: false };
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return auth.user ? (
          children
        ) : (
          <Redirect to={{ pathname: authPage, state: { from: location } }} />
        );
      }}
    ></Route>
  );
}
