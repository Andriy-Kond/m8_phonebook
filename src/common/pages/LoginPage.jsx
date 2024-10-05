import { selectUserIsLoggedIn, selectUserName } from "app/selectors";
import {
  setIsLoggedIn,
  setUserCredentials,
  setUserToken,
  useLoginUserMutation,
} from "features/Users/UsersSlice";
import { useDispatch, useSelector } from "react-redux";

export default function LoginPage() {
  const [loginUser, { data }] = useLoginUserMutation();
  console.log("LoginPage >> data:::", data);
  const isLoggedIn = useSelector(selectUserIsLoggedIn);
  const userName = useSelector(selectUserName);

  const dispatch = useDispatch();

  const submitCredentials = async e => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const userCredentials = Object.fromEntries(formData);
    try {
      const result = loginUser(userCredentials);
      dispatch(setIsLoggedIn());
      // dispatch(setUserCredentials(result.data.user));
      // dispatch(setUserToken(result.data.token));
    } catch (error) {}
  };

  return (
    <>
      <h2>Login Page</h2>

      {!isLoggedIn ? (
        <form onSubmit={submitCredentials}>
          <input type="text" name="email" />
          <input type="text" name="password" />

          <button type="submit">Login</button>
        </form>
      ) : (
        <div>User: {data?.user.name}</div>
      )}
    </>
  );
}
