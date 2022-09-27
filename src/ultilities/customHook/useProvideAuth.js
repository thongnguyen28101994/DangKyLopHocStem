import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { changeLoggedState, Login } from "../../redux/CreateSlice/LoginSlice";

export default function useProvideAuth() {
  const user = useSelector((state) => state.login.value);

  const history = useHistory();
  const dispatch = useDispatch();
  const signin = (cb) => {
    dispatch(Login());
    history.replace("/");
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
    history.replace("/");
    cb();
  };
  return { user, signin, signout };
}
