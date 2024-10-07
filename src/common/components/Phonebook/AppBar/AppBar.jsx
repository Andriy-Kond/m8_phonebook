import Navigation from "common/components/Phonebook/Navigation";
import AuthNav from "common/components/Phonebook/AuthNav";
import UserMenu from "common/components/Phonebook/UserMenu";

import { useSelector } from "react-redux";

export default function AppBar() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        justifyContent: "space-between",
      }}>
      <Navigation />

      {!isLoggedIn && <AuthNav />}
      {isLoggedIn && <UserMenu />}
    </nav>
  );
}
