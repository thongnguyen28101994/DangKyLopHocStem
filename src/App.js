import "./App.css";
import NguoiDung from "./features/nguoidung";
import NotFound from "./component/NotFound";
import Login from "./features/dangnhap";
import Test from "./features/test";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store } from "./redux/configStore";
function App() {
  return (
    <>
      <Provider store={store}>
        <Switch>
          <Route path="/" component={NguoiDung} exact></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/test" component={Test}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </Provider>
    </>
  );
}

export default App;
