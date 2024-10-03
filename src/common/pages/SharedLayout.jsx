import { Link, Outlet } from "react-router-dom";

export default function SharedLayout() {
  return (
    <>
      <main>
        <nav style={{ display: "flex", gap: "20px" }}>
          <Link to="/">Home Page</Link>
          <Link to="/login">Login Page</Link>
        </nav>

        <Outlet />
      </main>
    </>
  );
}
