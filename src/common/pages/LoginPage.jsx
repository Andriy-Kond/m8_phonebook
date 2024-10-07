import { useDispatch, useSelector } from "react-redux";
import {
  setIsLoggedIn,
  setUserToken,
  useGetUserByTokenQuery,
  useLoginUserMutation,
} from "features/Users/UsersSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const userToken = useSelector(state => state.auth.userToken);
  const [loginUser] = useLoginUserMutation();

  const { data, isSuccess, isFetching, refetch, error } =
    useGetUserByTokenQuery({
      skip: !userToken, // Пропускає запит, якщо токен відсутній
    });

  const submitCredentials = async e => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const userCredentials = Object.fromEntries(formData);

    try {
      const result = await loginUser(userCredentials);
      dispatch(setUserToken(result?.data.token));
      dispatch(setIsLoggedIn(true));
      refetch(); // Змушує RTK Query, а саме - getUserByToken зі стану RTK Query робити повторний запит до серверу після логіна
    } catch (err) {
      dispatch(setIsLoggedIn(false));
      console.log("submitCredentials >> err:::", err);
    }
  };

  return (
    <>
      <h2>Login Page</h2>

      {!isLoggedIn && !isFetching && (
        <form onSubmit={submitCredentials}>
          <input type="text" name="email" />
          <input type="text" name="password" />

          <button type="submit">Login</button>
        </form>
      )}

      {isLoggedIn && !isFetching && <div>User: {data?.name}</div>}
    </>
  );
}
