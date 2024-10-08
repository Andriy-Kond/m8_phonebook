import { selectUserToken } from "app/selectors";
import {
  setIsLoggedIn,
  setUserToken,
  useGetUserByTokenQuery,
  useLogoutUserMutation,
  usersApi,
} from "features/Users/UsersSlice";

import avatar from "imgs/pending-cat.jpg";
import { useDispatch, useSelector } from "react-redux";

export default function UserMenu() {
  const authUserToken = useSelector(selectUserToken);
  const { data: userCredentials = [] } = useGetUserByTokenQuery(undefined, {
    skip: !authUserToken,
  });

  const [logoutUser] = useLogoutUserMutation();

  const dispatch = useDispatch();

  const handleLogout = async () => {
    await logoutUser();
    dispatch(setIsLoggedIn(false));
    dispatch(setUserToken(null));

    dispatch(usersApi.util.resetApiState()); // очистити стан Redux від старих даних (user, email)
  };

  return (
    <>
      {/* Умова userCredentials.name необхідно, щоб span не блимав при завантаженні користувача */}
      {userCredentials.name && (
        <div style={{ display: "flex", gap: "10px" }}>
          <img src={avatar} alt="user avatar" width={32} />
          <span>Wellcome, {userCredentials.name}</span>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </>
  );
}
