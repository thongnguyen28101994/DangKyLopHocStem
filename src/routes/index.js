import NotFound from "../component/NotFound";
import Login from "../features/Login_Page";
import Test from "../features/test";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UserLogin from "../features/Login_Page/userLogin";
import AdminLogin from "../features/Login_Page/adminLogin";
import PrivateRoute from "./PrivateRoute";
//import AdminMenuScreen from "../features/NavigationMenuScreen/AdminMenuScreen";
import UserMenuScreen from "../features/NavigationMenuScreen/UserMenuScreen";
function Routes() {
  return (
    <>
      <Switch>
        <PrivateRoute path="/" authPage="/login" exact>
          <UserMenuScreen />
        </PrivateRoute>
        {/* <PrivateRoute path="/quanly" authPage="/adminLogin" exact>
          <AdminMenuScreen />
        </PrivateRoute> */}
        <Route path="/login" component={UserLogin}></Route>
        <Route path="/adminLogin" component={AdminLogin}></Route>
        <Route path="/quanly" component={Login}></Route>
        <Route path="/test" component={Test}></Route>
        <Route component={NotFound}></Route>
      </Switch>
    </>
  );
}

export default Routes;
