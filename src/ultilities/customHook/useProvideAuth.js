import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import { changeLoggedState, Login } from "../../redux/CreateSlice/LoginSlice";

export default function useProvideAuth() {
  const user = useSelector((state) => state.login.value);

  const history = useHistory();
  const root = useRouteMatch();
  const dispatch = useDispatch();
  const signin = (cb) => {
    dispatch(Login());
    //history.replace(`${root.url}/lophoc`);
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
    dispatch(changeLoggedState());
    history.replace("/user");
    cb();
  };
  return { user, signin, signout };
}
