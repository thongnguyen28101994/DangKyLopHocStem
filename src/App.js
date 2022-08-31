import "./App.css";
import NguoiDung from "./features/nguoidung";
import NotFound from "./component/NotFound";
import Login from "./features/dangnhap";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={NguoiDung} exact></Route>
        <Route path="/login" component={Login}></Route>
        <Route component={NotFound}></Route>
      </Switch>
    </>
  );
}

export default App;
