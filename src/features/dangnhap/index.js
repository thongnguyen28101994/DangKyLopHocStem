import React from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import AdminLogin from "./adminLogin";
import UserLogin from "./userLogin";
export default function Login() {
  const match = useRouteMatch();
  return (
    <>
      <Switch>
        <Route path={`${match.path}/admin`} component={AdminLogin}></Route>
        <Route path={`${match.path}/user`} component={UserLogin}></Route>
      </Switch>
    </>
  );
}
