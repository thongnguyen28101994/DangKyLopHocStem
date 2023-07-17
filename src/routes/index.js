import NotFound from "../component/NotFound";
import Login from "../features/Login_Page";
import Test from "../features/test";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UserLogin from "../features/Login_Page/userLogin";
import LoginSSO from "../features/Login_Page/redirect";

import AdminLogin from "../features/Login_Page/adminLogin";
import PrivateRoute from "./PrivateRoute";
import AdminMenuScreen from "../features/NavigationMenuScreen/AdminMenuScreen";
import UserMenuScreen from "../features/NavigationMenuScreen/UserMenuScreen";
import ListParticipantRegisted from "../features/dangky/component/ListParticipantRegisted";
import RegisterParticipantNotInSchool from "../features/dangky/component/RegisterParticipantNotInSchool";
function Routes() {
  return (
    <>
      <Switch>
        <PrivateRoute path="/" authPage="/login" exact>
          <UserMenuScreen />
        </PrivateRoute>
        <PrivateRoute path="/user" authPage="/login" exact>
          <UserMenuScreen />
        </PrivateRoute>
        <PrivateRoute path="/admin" authPage="/admin/login" exact>
          <AdminMenuScreen />
        </PrivateRoute>
        <Route path="/login" component={UserLogin}></Route>
        <Route path="/loginsso" component={LoginSSO}></Route>
        <Route path="/admin/login" component={AdminLogin}></Route>
        <Route path="/user" component={UserMenuScreen}></Route>
        <Route path="/admin" component={AdminMenuScreen}></Route>
        <Route
          path="/danhsachxeplop/:classid"
          component={ListParticipantRegisted}
        ></Route>
        <Route
          path="/dangky/:classid"
          component={RegisterParticipantNotInSchool}
        ></Route>

        {/* <Route path="/quanly" component={Login}></Route> */}
        {/* <Route path="/test" component={Test}></Route> */}
        <Route component={NotFound}></Route>
      </Switch>
    </>
  );
}

export default Routes;
