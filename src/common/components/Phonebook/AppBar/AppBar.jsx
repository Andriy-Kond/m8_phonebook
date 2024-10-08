import Navigation from "common/components/Phonebook/Navigation";
import AuthNav from "common/components/Phonebook/AuthNav";
import UserMenu from "common/components/Phonebook/UserMenu";

import { useSelector } from "react-redux";
import { selectUserIsLoggedIn } from "app/selectors";

export default function AppBar() {
  const isLoggedIn = useSelector(selectUserIsLoggedIn);

  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        justifyContent: "space-between",
      }}>
      <Navigation />

      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </nav>
  );
}
