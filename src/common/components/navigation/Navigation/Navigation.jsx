import { selectUserIsLoggedIn } from "app/selectors";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Navigation() {
  const isLoggedIn = useSelector(selectUserIsLoggedIn);

  return (
    <>
      <div style={{ display: "flex", gap: "10px" }}>
        <Link to="/">Home</Link>
        {isLoggedIn && <Link to="/contacts">Contacts</Link>}
      </div>
    </>
  );
}
