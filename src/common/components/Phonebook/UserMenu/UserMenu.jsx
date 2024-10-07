import {
  setIsLoggedIn,
  useGetUserByTokenQuery,
  useLogoutUserMutation,
} from "features/Users/UsersSlice";

import avatar from "imgs/pending-cat.jpg";
import { useDispatch } from "react-redux";

export default function UserMenu() {
  const { data: userCredentials = [], refetch } = useGetUserByTokenQuery();

  const [logoutUser] = useLogoutUserMutation();

  const dispatch = useDispatch();

  const handleLogout = async () => {
    await logoutUser();
    dispatch(setIsLoggedIn(false));
    refetch();
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <img src={avatar} alt="user avatar" width={32} />
      <span>Wellcome, {userCredentials.name}</span>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
